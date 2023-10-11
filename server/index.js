const express = require("express");
const { recoverPublicKey } = require('./modules/sign');
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {    //public-key: balance   // signature
  "038ed8c454497edd70b311e6ec7e06177c21d326a0f3149066016922258fadb3eb": 100,  //1bc1d3b0e5019000fc5cc42a19b4f5de245b69643c89a9a2b1f4310306e6cb5bb08aacef73ddd9f4ae548f9dc8b25dd938e2110bd381dab450d3eab949043ab88
  "02193f2602de93e67ff905754f925b81ec5141981d1c84cf6507d3d5fd2940e6cf": 50,   //051dbd41b1dbeeb68ea2ed94906e6d1b156d5802638655858ecbfc6c523f5ce7462d7fbd42cc5653145ae74458262ba12d5b06f1a91be8e7d647a96240862b8b5
  "03001f22fbd13d67e2b3435b74e139b8198613f1e23dd6ce78cdef1c6209e04bbc": 75,   //05c13764b4a67141de8ac0ed7b488e2f0d56cbf3562000db2568626c6af4428173285eff95e4bc154cb78a32c2f58942859ca5e6a54a10a5004da68e670f866c8
};

app.get("/balance/:signature", (req, res) => {
  const { signature } = req.params;
  publicKey = recoverPublicKey(signature);
  const balance = balances[publicKey] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { senderSignature, recipient, amount } = req.body;

  sender = recoverPublicKey(senderSignature);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
