import server from "./server";

function Wallet({ balance, setBalance, signature, setSignature }) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    const {
      data: { balance },
    } = await server.get(`balance/${signature}`);
    setBalance(balance);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Encoded Signature
        <input placeholder="Type a signature" value={signature} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
