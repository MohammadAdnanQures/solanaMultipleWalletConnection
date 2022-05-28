import "./RefundPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";
import { AccountLayout, u64 } from "@solana/spl-token";
import { Buffer } from "buffer";

import { useState,useEffect } from "react";


function RefundPage(wallet) {
  async function DBDataGetter() {
    const dbDataTemp = await axios.get(`http://localhost:2200/data/getTokens`);
    setDBData(dbDataTemp);
    console.log("getter From Database :::", dbDataTemp);
    setTokenObject(dbDataTemp);
  }
  useEffect(() => {
        DBDataGetter();
        setInterval(() => {}, 60000);
      }, []);
  const history = useNavigate();
  const [DBData, setDBData] = useState(null);
  const [discordId, setdiscordid] = useState("");
  const [EthAddress, setethAddress] = useState("");
  const [errorEth, setErrorsEth] = useState(null);
  const [errorDiscord, setErrorDiscord] = useState(null);
  const [errorDis, setErrorDis] = useState(null);
  const [TokenObject, setTokenObject] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState<any>(null);
  const [totalMinted, setTotalMinted] = useState(0);
  const [message, setMessage] = useState("");
  const network = new Connection(clusterApiUrl("devnet"));
  let count = 0;

  function CheckTokenIfExist(Val) {
    let flag = 0;
    for (let i = 0; i < TokenObject.data.length; i++) {
      if (Val == TokenObject.data[i].Tokens) {
        count = count + 1;
        flag = 1;
      }
      if (i == TokenObject.data.length - 1 && flag == 1) {
        return true;
      }
    }
    return false;
  }

  async function handleClick(event) {
    event.preventDefault();
    console.log(
      "Public Key :jjkbjkjkhkjk::::",
      wallet.wallet.publicKey.toBase58()
    );
    let userTokens = await network.getTokenAccountsByOwner(
      wallet.wallet.publicKey,
      {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      }
    );
    console.log(":::::++++++++++++++", userTokens);
    if (userTokens.value.length == 0) {
      return;
    }
    for (let i = 0; i < userTokens.value.length; i++) {
      // isDatas ko rename kr k nechy b rename kr lyna jhn jhn use hu rha
      const datas = Buffer.from(userTokens.value[i].account.data);
      const accountInfo = AccountLayout.decode(datas);
      accountInfo.address = userTokens.value[i].pubkey.toBase58();
      accountInfo.mint = new PublicKey(accountInfo.mint);
      accountInfo.owner = new PublicKey(accountInfo.owner);
      accountInfo.amount = u64.fromBuffer(accountInfo.amount);
      // console.log("address: ", accountInfo.mint.toBase58());
      const tokenStatus = CheckTokenIfExist(accountInfo.mint.toBase58());
      // mint ky sathdatabase ki values check hooon gi
      if (
        accountInfo.amount == 1 &&
         tokenStatus
        // accountInfo.mint.toBase58() == "5gxuYk4Xa1AVZ6QXGv7fwxYuqczuA1Zr9kXhi1FGKkuQ"
      ) {
        console.log("if status pass check");
        const validateDiscordStatus = validateDiscordID(discordId);
        const validateEthStatus = validateInputAddresses(EthAddress);
        if (validateDiscordStatus && validateEthStatus && count > 0) {
          setdiscordid("");
          console.log(discordId, EthAddress, count);
          await axios.post("http://localhost:2200/data/setData", {
            discordid: discordId,
            ethAddress: EthAddress,
            totalTokens: count,
          });
          window.alert("ok bhai ");
          history("/Refund");
          setethAddress("");
          setErrorDiscord("");
          setErrorsEth("");
        } else {
          window.alert("Invalid Data");
        }
      } else {
        console.log("IN ELSE");
      }
    }
  }
  function validateInputAddresses(address) {
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
  }
  function validateDiscordID(address) {
    return /^.{3,32}#[0-9]{4}$/i.test(address);
  }
  async function handleChangeOfDis(Val) {
    const tempDataOfDis = Val.target.value;
    console.log("values of discord", tempDataOfDis);
    if (!validateDiscordID(tempDataOfDis)) {
      setErrorDiscord("Your Id seems Invalid");
    } else if (validateDiscordID(tempDataOfDis)) {
      setErrorDiscord("");
      setdiscordid(tempDataOfDis);
      console.log("discord id value....", tempDataOfDis);
    }
  }

  async function HandleChangeOfEth(event) {
    var lastFive = null;
    console.log("handle of eth:", event.target.value);
    console.log(
      "Status of validation : ",
      validateInputAddresses(event.target.value)
    );
    const validation = "/^(0x){1}[0-9a-fA-F]{42}$/i";
    if (!event.target.value) {
      setErrorsEth("Input field is Empty");
    } else if (event.target.value.length < 42) {
      setErrorsEth("Your Address Length Is Not Valid");
      lastFive = event.target.value.substr(event.target.value.length - 5);
      console.log(lastFive, "last Five values ");
    } else if (await !validateInputAddresses(event.target.value)) {
      setErrorsEth("Your Address Seems Invalid");
    } else if (await validateInputAddresses(event.target.value)) {
      setErrorsEth("");
      console.log("inside last check ...", EthAddress);
      setethAddress(event.target.value);
    }
  }

  return (
    <>
      <div className="aligncenterTopContainer col-12">
        <div className="titleRefundSetng bg-transparent">
          <h2>SOLANA REFUND</h2>
        </div>
        <div className="card settingBg mx-auto my-auto">
          <div className="card-body mx-auto">
            <form className="form-horizontal">
              <fieldset className="">
                <div className="form-group alignCenter12 py-4">
                  <label className="control-label setErrorsColor">
                    Discord Id
                  </label>
                  <div className="">
                    <input
                      required
                      id="textinput"
                      name="discordid"
                      type="text"
                      defaultValue={discordId}
                      // value={discordId}
                      placeholder=""
                      className="form-control input-md"
                      onChange={handleChangeOfDis}
                    />
                    <div>
                      <p className="setErrorsColor">{errorDiscord}</p>
                    </div>
                  </div>
                </div>

                <div className="form-group alignCenter123 py-4">
                  <label className="control-label setErrorsColor">
                    Etherium Address
                  </label>
                  <div className="">
                    <input
                      minLength={42}
                      required
                      id="textinput"
                      name="ethAddress"
                      type="text"
                      defaultValue={EthAddress}
                      // value={EthAddress}
                      placeholder=""
                      className="form-control input-md"
                      onChange={HandleChangeOfEth}
                    />
                    <div>
                      <p className="setErrorsColor">{errorEth}</p>
                    </div>
                  </div>
                </div>
                <div className="form-group alignCenter123 mx-5 py-3">
                  <button
                    className="btn btnSubmitSetting"
                    onClick={handleClick}
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RefundPage;
