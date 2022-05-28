import "./Home.css";
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
import { useEffect, useMemo, useState, useCallback } from "react";
import * as anchor from "@project-serum/anchor";

import styled from "styled-components";
import { Button, Container, Snackbar } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { AlertState } from "./utils";
import { GatewayProvider } from "@civic/solana-gateway-react";
import RefundPage from "./RefundPage";

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background-color: red
  color: orange;
  font-size: 16px;
  font-weight: bold;
`;

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  txTimeout: number;
  rpcHost: string;
}

const Home = (props: HomeProps) => {
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const rpcUrl = props.rpcHost;
  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }
  }, [anchorWallet, props.candyMachineId, props.connection]);

  const onMint = async () => {
    try {
      document.getElementById("#identity")?.click();
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
    }
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    refreshCandyMachineState,
  ]);

  return (
    // <Container style={{ marginTop: 100 }}>
    //   <Container maxWidth="xs" style={{ position: "relative" }}>
    //     <Paper
    //       style={{ padding: 24, backgroundColor: "#151A1F", borderRadius: 6 }}
    //     >
    //       {!wallet.connected ? (
    //         <ConnectButton>Connect Wallet</ConnectButton>
    //       ) : (
    //         <>
    //           <RefundPage wallet={wallet} />
    //         </>
    //       )}
    //     </Paper>
    //   </Container>

    //   <Snackbar
    //     open={alertState.open}
    //     autoHideDuration={6000}
    //     onClose={() => setAlertState({ ...alertState, open: false })}
    //   >
    //     <Alert
    //       onClose={() => setAlertState({ ...alertState, open: false })}
    //       severity={alertState.severity}
    //     >
    //       {alertState.message}
    //     </Alert>
    //   </Snackbar>
    // </Container>
    <>
      <div className="textCenter col-12">
        <div className="">
          {!wallet.connected ? (
            <>
              <p className="colorHomePage">SOLANA REFUND</p>
              <div className="settingBtn">
                <div className="wdtControl mx-auto">
                  <ConnectButton>Connect Wallet</ConnectButton>
                </div>
              </div>
            </>
          ) : (
            <RefundPage wallet={wallet}></RefundPage>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
