// import server from "./server";

// function Wallet({ address, setAddress, balance, setBalance }) {
//   async function onChange(evt) {
//     const address = evt.target.value;
//     setAddress(address);
//     if (address) {
//       const {
//         data: { balance },
//       } = await server.get(`balance/${address}`);
//       setBalance(balance);
//     } else {
//       setBalance(0);
//     }
//   }

//   return (
//     <div className="container wallet">
//       <h1>Your Wallet</h1>

//       <label>
//         Wallet Address
//         <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
//       </label>

//       <div className="balance">Balance: {balance}</div>
//     </div>
//   );
// }

// export default Wallet;

import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp256k1.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in private key" value={privateKey} onChange={onChange}></input>
      </label>

      <label>
        Public Key: {`0x${address}`}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

