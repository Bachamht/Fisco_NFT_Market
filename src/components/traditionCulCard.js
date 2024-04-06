import React, { useEffect, useState } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ColorExtractor } from 'react-color-extractor'
import Card from "./base/Card";
import Button from "./base/Button";
import { Colors } from "../constants/Colors";

import { ModelViewerElement } from "@google/model-viewer";
import { useARStatus } from "../hooks/isARStatus";

const TraditionCulCard = ({ username,name, nftName, price, nftSrc, likeCount, gradient, onClick }) => {
  const [isLike, setIsLike] = useState(false);
  const [colors, setColors] = useState([]);

  const isARSupport = useARStatus(nftSrc);

  useEffect(() => {
    console.log(isARSupport);
  }, [])

  const like = () => setIsLike(!isLike);

  const getColors = colors => {
    setColors(c => [...c, ...colors]);
    //console.log(colors);
  }

  return (
    <Card
      blurColor={colors[0]}

      child={<>
        {isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="reveal" loading="eager" camera-controls auto-rotate src={nftSrc} > </model-viewer> : <><ColorExtractor getColors={getColors}>
          <img className="nft-image" src={nftSrc} />
        </ColorExtractor></>}
        <div className="wrapper">
          <div className="info-container">
            <p className="owner"> LEJOURN.DARK.NFT</p>
            <p className="name">{name}</p>
          </div>

          
        </div>
        <div className="buttons">
          {/* <button className="buy-now">Buy Now</button> */}
          <Button color={Colors.buttons.primary} textContent="加入" onClick={onClick} />
          
          <div className="price-container">
            <p className="price-label">社区人数</p>
            <p className="price">
            {" "}4.5k</p>
          </div>

        </div>
      </>}>

    </Card>
   


  );
};

export default TraditionCulCard;