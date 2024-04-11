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

          <a>作品广场</a>
          <a onClick={goCommunity}>非遗社区</a> 
          <a>我的创作</a>

          <button id="connect-wallet" onClick={handleWallet} >{!account ? '登录/注册' : account}</button>
        </div>
      </div>
    );
}

export default Header;