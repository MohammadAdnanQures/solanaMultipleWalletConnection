// import "./Home.css";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import {
//   clusterApiUrl,
//   Connection,
//   PublicKey,
//   Transaction,
// } from "@solana/web3.js";
// import { AccountLayout, u64 } from "@solana/spl-token";
// import {Buffer} from 'buffer'
// declare let window: any;

// type DisplayEncoding = "utf8" | "hex";
// type PhantomEvent = "disconnect" | "connect";
// type PhantomRequestMethod =
//   | "connect"
//   | "disconnect"
//   | "signTransaction"
//   | "signAllTransactions"
//   | "signMessage";

// interface ConnectOpts {
//   onlyIfTrusted: boolean;
// }

// interface PhantomProvider {
//   publicKey: PublicKey | null;
//   isConnected: boolean | null;
//   signTransaction: (transaction: Transaction) => Promise<Transaction>;
//   signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
//   signMessage: (
//     message: Uint8Array | string,
//     display?: DisplayEncoding
//   ) => Promise<any>;
//   connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
//   disconnect: () => Promise<void>;
//   on: (event: PhantomEvent, handler: (args: any) => void) => void;
//   request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
// }

// const getProvider = (): PhantomProvider | undefined => {
//   if ("solana" in window) {
//     const anyWindow: any = window;
//     const provider = anyWindow.solana;
//     if (provider.isPhantom) {
//       return provider;
//     }
//   }
//   // window.open("https://phantom.app/", "_blank");
// };

// function Home() {
//   const history = useNavigate();
//   const provider = getProvider();
//   const [connected, setConnected] = useState(false);
//   const [connectedAccount, setConnectedAccount] = useState<any>(null);
//   // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//   const [totalMinted, setTotalMinted] = useState(0);
//   const [message, setMessage] = useState("");
//   let payerAccount: any;

//   useEffect(() => {
//     setInterval(() => {
//       // setTimeLeft(calculateTimeLeft());
//     }, 60000);
//     // getMinitedCounter();
//     if (provider) {
//       provider.on("connect", () => {
//         setConnected(true);
//         setConnectedAccount(provider);
//         console.log("connection  established");
//       });
//       provider.on("disconnect", () => {
//         setConnected(false);
//         console.log("disconnected Alhumdulliallah");
//         // history("/");
//       });
//       // try to eagerly connect
//       provider.connect({ onlyIfTrusted: true });
//       return () => {
//         provider.disconnect();
//       };
//     }
//   }, [provider]);
//   payerAccount = getProvider();
//   async function connect() {
//     const resp = await window.solana.connect();
//     return resp;
//   }
//   // let network = new Connection(clusterApiUrl("devnet"), "confirmed");
//   async function HandleClick() {

//     // payerAccount=await getProvider();
    
//     // let userTokens = await network.getTokenAccountsByOwner(payerAccount.publicKey, {
//     //   programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
//     // });
//     // for (let i = 0; i < userTokens.value.length; i++) {
//     //   // isDatas ko rename kr k nechy b rename kr lyna jhn jhn use hu rha
//     //   const datas = Buffer.from(userTokens.value[i].account.data);
//     //   const accountInfo = AccountLayout.decode(datas);
//     //   accountInfo.address = userTokens.value[i].pubkey.toBase58();
//     //   accountInfo.mint = new PublicKey(accountInfo.mint);
//     //   accountInfo.owner = new PublicKey(accountInfo.owner);
//     //   accountInfo.amount = u64.fromBuffer(accountInfo.amount);
//     //   console.log('address: ',accountInfo.address);
//     //   // mint ky sathdatabase ki values check hooon gi
//     //   if (accountInfo.amount === 1 && accountInfo.mint === "GV8h4EDEsiqbsn3GFr2NGoM3Yb6YnBn6HgQoKPg9bf1w") {
//     //     console.log("he")
//     //   }
//     // }

//     const connection = await connect();
//     console.log("Provider:::::",connection);
//     if (connection) {
//       history("/Refund");
//     } else {
//       history("/");
//       console.log("Connect your Wallet First");
//     }
//   }
//   return (
//     <>
//       <div className="textCenter">
//         <div className="col-12">
//           <p className="colorHomePage">SOLANA REFUND</p>
//           <button className="btn btnSettingWallet px-5" onClick={HandleClick}>
//             Connect Wallet
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Home;












//////////////////////////////////


// {
//     "name": "refundpage",
//     "version": "0.1.0",
//     "private": true,
//     "dependencies": {
//       "@solana/web3.js": "^1.31.0",
//       "@testing-library/jest-dom": "^5.16.1",
//       "@testing-library/react": "^12.1.2",
//       "@testing-library/user-event": "^13.5.0",
//       "@types/jest": "^27.4.0",
//       "@types/node": "^17.0.9",
//       "@types/react": "^17.0.38",
//       "@types/react-dom": "^17.0.11",
//       "axios": "^0.25.0",
//       "bootstrap": "^5.1.3",
//       "react": "^17.0.2",
//       "react-dom": "^17.0.2",
//       "react-scripts": "5.0.0",
//       "typescript": "^4.5.4",
//       "web-vitals": "^2.1.3"
//     },
//     "scripts": {
//       "start": "react-scripts start",
//       "build": "react-scripts build",
//       "test": "react-scripts test",
//       "eject": "react-scripts eject"
//     },
//     "eslintConfig": {
//       "extends": [
//         "react-app",
//         "react-app/jest"
//       ]
//     },
//     "browserslist": {
//       "production": [
//         ">0.2%",
//         "not dead",
//         "not op_mini all"
//       ],
//       "development": [
//         "last 1 chrome version",
//         "last 1 firefox version",
//         "last 1 safari version"
//       ]
//     },
//     "devDependencies": {
//       "@solana/spl-token": "^0.1.8",
//       "react-router-dom": "^6.2.1"
//     }
//   }
  