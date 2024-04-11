import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { useARStatus } from "../hooks/isARStatus";
import { useNavigate } from "react-router-dom";

const NFTDetail = () => {
  const [paymentResult, setPaymentResult] = useState(null);
  const [isPurchaseSuccessModalVisible, setIsPurchaseSuccessModalVisible] = useState(false);
  const isMobile = useMobile();
  const [colors, setColors] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [likeCount, setLikeCount] = useState(state.item.likeCount);
  //const like = () => setIsLike(!isLike);
  const like = () => {
    setIsLike(!isLike); // 
    setLikeCount(likeCount + 1); // 
  };

  const getColors = (extractedColors) => {
    setColors((c) => [...c, ...extractedColors]);
  };

  const handlePurchaseClick = async () => {
    try {
      // 假设API端点是 'https://api.yourdomain.com/buyNFT'
      const response =1;
      /* await fetch('https://api.yourdomain.com/buyNFT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 如果API需要认证，可能还需要添加如下面的headers
          // 'Authorization': 'Bearer your_token'
        },
        body: JSON.stringify({
          tokenId: state.item.tokenId, // 假设你有一个tokenId字段
          // 可能还需要其他购买所需的信息，如用户地址等
        }),
      }   */;
  
      if (response) {  //response.ok
        // 如果响应状态码在200-299之间，认为是成功的
        //const data = await response.json();

        // 假设服务器返回的对象中有一个success属性来表示购买是否成功
        if (response) {
          setPaymentResult("购买成功");
          setIsPurchaseSuccessModalVisible(true);
        } else {
          // 如果服务器返回的数据表明购买未成功
          setPaymentResult("购买失败，余额不足或其他原因");
        }
      } 
      else {
        // 如果响应状态码不在200-299之间，认为是失败的
        setPaymentResult("购买失败，发生错误");
      }
    } catch (error) {
      // 如果请求失败（例如网络问题），捕获错误
      setPaymentResult("购买失败，发生错误");
      console.error('Error during purchase:', error);
    }
  };

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px", // 弹窗的宽度
    maxWidth: "100%", // 确保在小屏幕上也能完全显示
    height: "auto", // 弹窗的高度，根据内容自适应
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    zIndex: "10000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // 阴影效果
    textAlign: "center", // 文字居中
  };
  
  const headerStyle = {
    margin: "-20px -20px 10px", // 与其他内容的间距
    padding: "10px 20px",
    backgroundColor: "#f0f0f0", // 标题栏背景色
    borderBottom: "1px solid #ccc", // 底部边框
    fontSize: "18px", // 标题字号
    fontWeight: "bold", // 字体加粗
    color: "#333", // 标题颜色
    textAlign: "left", // 文字居中
  };
  
  const bodyStyle = {
    margin: "0", // 内容区域不需要额外外边距
    padding: "10px 20px", // 内边距
    color: "#333", // 文字颜色
    fontSize: "16px", // 字号
    display: 'block',
    textAlign: "left", // 文字居中
  };
  
  const buttonStyle = {
    position: "absolute", 
    right: "20px", // 按钮距离弹窗右边缘的距离
    bottom: "20px", // 按钮距离弹窗下边缘的距离
    padding: "10px", // 按钮内边距
    margin: "10px 0 0", // 按钮与其他内容的间距
    border: "none", // 无边框
    backgroundColor: "#007bff", // 按钮背景色
    color: "white", // 文字颜色
    cursor: "pointer",
    borderRadius: "5px", // 圆角
    width: "100%", // 按钮宽度
    maxWidth: "100px", // 最大宽度
    textAlign: "center", // 文字居中
    display: 'block', // 使<button>成为一个块级元素
  };
  
  const handleCloseModal = () => {
    setIsPurchaseSuccessModalVisible(false);
    setPaymentResult(null);
  };

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            <div id="detail-content">
              {isARSupport ? (
                <model-viewer
                  ar-scale="auto"
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  id="arDetail"
                  loading="eager"
                  camera-controls
                  auto-rotate
                  src={state.item.src}
                />
              ) : (
                <ColorExtractor getColors={getColors}>
                  <img id="detail-image" src={state.item.src} />
                </ColorExtractor>
              )}
              <div id="detail-info">
                <div id="detail-info-container">
                  <p id="collection">{state.item.name}</p>
                  <p id="name">{state.item.name}</p>
                  <p id="description">{state.item.description}</p>
                </div>
                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height="50px"
                    onClick={handlePurchaseClick}
                    child={
                      <div id="button-child">
                        
                        <p id="price">1254</p>
                      </div>
                    }
                  />
                  <div className="like-container">
                    <button className="like" onClick={like}>
                      {!isLike ? (
                        <AiOutlineHeart size="45" color="white" />
                      ) : (
                        <AiFillHeart
                          size="45"
                          style={{
                            stroke: "linear-gradient(to bottom, #38ef7d, #11998e)",
                          }}
                          color="#00f5c966"
                        />
                      )}
                    </button>
                    <p className="like-count">{state.item.likeCount}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        {isPurchaseSuccessModalVisible && (
         <div style={modalStyle}>
         <div style={headerStyle}>
           提示
         </div>
         <div style={bodyStyle}>
           <p>购买成功，可在个人账户中查看</p>
         </div>
         <br/>
         <br/>
         <button style={buttonStyle} onClick={handleCloseModal}>
           确定
         </button>
       </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetail;