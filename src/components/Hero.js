import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";



const Hero = () => {

  let navigate = useNavigate();

  const goExplore = () => {
    navigate("/explore");
  };
  const goCreate = () => {
    navigate("/create");
  };
  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}
      <Header />
      <h1 id="header-text-first">爱心数藏坊 </h1>
      <h1 id="header-text-second"> 致力于教育公益和非遗保护的数字藏品交易平台</h1>
      <h5 id="header-subtext">激发创意，传承文化，支持未来</h5>
      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>开始探索</button>
        <button id="create" onClick={goCreate}>开始创作</button>
      </div>
    </div>
  );
};

export default Hero;
