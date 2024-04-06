import react, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const {activateBrowserWallet, account} = useEthers();
    
    const etherBalance = useEtherBalance(account);

    const handleWallet = () => {
      activateBrowserWallet();
    }
  let navigate = useNavigate();

  const goCommunity = () => {
    navigate("/community");
  };

    return (
        <div id="header">
        <Link to='/' id='logo'>主页</Link>

        <div id="link-containers">

          <a>Start Hunting</a>
          <a>Dark NFTs</a>
          <a onClick={goCommunity}>Community</a> 
          <a>Craft NFT</a>

          <button id="connect-wallet" onClick={handleWallet} >{!account ? 'Connect Wallet' : account}</button>
        </div>
      </div>
    );
}

export default Header;