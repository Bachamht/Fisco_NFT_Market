import React from "react";
import TraditionCulCard from "./traditionCulCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

const CardList_c = ({ list }) => {
  let navigate = useNavigate();
  return (
    <div id="card-list">
      {list.map((item, index) => (

        <TraditionCulCard
          nftSrc={item.src}
          key={index}
          name={item.name}
          onClick={() => navigate("/TCdetail", { state: { item: item } })}
          style={{ width: "100%", height: "100%" }}
        />
      ))}
    </div>
  );
};
export default CardList_c;
