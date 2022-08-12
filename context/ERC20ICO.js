import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import {
  funTokenAddress,
  funTokenABI,
  funTokenSaleAddress,
  funTokenSaleABI,
} from "./constant";

const fetchFunTokenContract = (signerOrProvider) =>
  new ethers.Contract(funTokenAddress, funTokenABI, signerOrProvider);

const fetchFunTokenSaleContract = (signerOrProvider) =>
  new ethers.Contract(funTokenSaleAddress, funTokenSaleABI, signerOrProvider);

export const ICOContext = React.createContext();

export const ERC20ICONProvider = ({ children }) => {
  //----USER ACCOUNT
  const [holderArray, setHolderArray] = useState([]);
  const [account, setAccount] = useState("");
  const [accountBallanc, setAccountBallanc] = useState("");
  const [userId, setUserId] = useState("");

  const [NoOfToken, setNoOfToken] = useState("");
  const [TokenName, setTokenName] = useState("");
  const [TokenStandard, setTokenStandard] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [TokenOwner, setTokenOwner] = useState("");
  const [TokenOwnerBal, setTokenOwnerBal] = useState("");
  const funToken = "ICO Name: FunToken";

  //-----SETTIONEOUT
  const [completed, setCompleted] = useState(false);

  //---------CONECTING WALLT
  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return console.log("Install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0]);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchFunTokenContract(signer);

    const allTokenHolder = await contract.balanceOf(accounts[0]);
    setAccountBallanc(allTokenHolder.toNumber());

    const totalHolder = await contract._userId();
    setUserId(totalHolder.toNumber());
  };

  //-------CONNCTING WITH TOKEN CONTRACT

  const EROFunToken = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner(
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
      );
      const contract = fetchFunTokenContract(signer);

      //TOKEN SUPPLY
      const supply = await contract.totalSupply();
      const totalSupply = supply.toNumber();
      setNoOfToken(totalSupply);
      //TOKEN NAME
      const name = await contract.name();
      setTokenName(name);
      //TOKEN SYMBOL
      const symbol = await contract.symbol();
      setTokenSymbol(symbol);
      //TOKEN SYMBOL
      const standard = await contract.standard();
      setTokenStandard(standard);
      //TOKEN OWNERCONTRACT
      const ownerOfContract = await contract.ownerOfContract();
      setTokenOwner(ownerOfContract);

      //OWNER TOKEN BALANC
      const balanceToken = await contract.balanceOf(
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
      );
      setTokenOwnerBal(balanceToken.toNumber());
    } catch (error) {
      console.log("Something wrong in the Token Function");
    }
  };

  const transferToken = async (address, value) => {
    try {
      if (!address || !value) return console.log("No Data");
      console.log(address, value * 1);
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchFunTokenContract(signer);

      const transfer = await contract.transfer(address, BigInt(value * 1));

      transfer.wait();

      // myLoader();
      window.location.reload();
    } catch (error) {
      console.log("something wrong while transfering token");
    }
  };

  const tokenHolderData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchFunTokenContract(signer);

      const allTokenHolder = await contract.getTokenHolder();

      allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);
        holderArray.push(singleHolderData);
        console.log(holderArray);
      });
    } catch (error) {
      console.log("Worng getting data");
    }
  };

  return (
    <ICOContext.Provider
      value={{
        EROFunToken,
        transferToken,
        tokenHolderData,
        checkIfWalletConnected,
        funToken,
        NoOfToken,
        TokenName,
        TokenStandard,
        TokenSymbol,
        TokenOwner,
        holderArray,
        account,
        accountBallanc,
        TokenOwnerBal,
        userId,
        completed,
      }}
    >
      {children}
    </ICOContext.Provider>
  );
};
