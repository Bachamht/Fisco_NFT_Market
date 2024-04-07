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

  const like = () => setIsLike(!isLike);
  const getColors = (extractedColors) => {
    setColors((c) => [...c, ...extractedColors]);
  };

  const handlePurchaseClick = async () => {
    try {
      const result = 1; // Replace with await buyNFT(state.item.tokenId);
      if (result) {
        setPaymentResult("购买成功");
        setIsPurchaseSuccessModalVisible(true);
      } else {
        setPaymentResult("购买失败，余额不足或其他原因");
      }
    } catch (error) {
      setPaymentResult("购买失败，发生错误");
    }
  };

  const modalStyle = {
    display: isPurchaseSuccessModalVisible ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px", // 设置弹窗的宽度
    height: "150px", // 设置弹窗的高度
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    zIndex: "10000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // 添加阴影效果
    opacity: 0.7, // 设置弹窗的透明度
    transition: "opacity 0.3s ease", // 添加透明度变化的过渡效果
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
                        <FaEthereum size="28px" />
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
                    <p className="like-count">123</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        {isPurchaseSuccessModalVisible && (
          <div style={modalStyle}>
            <p>购买成功，可在个人账户中查看</p>
            <button onClick={handleCloseModal}>关闭</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetail;