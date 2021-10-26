import React, { Component, useState, useEffect, useRef } from "react";
import { useFileUpload } from "use-file-upload";

import "./../CSS/App.css";

export function Home() {
  return (
    <div>
      <div className="home-title">Home</div>

      <div className="autoplay-slider">
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image2.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>

        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
        <div className="slide"><img src={`${process.env.PUBLIC_URL}/img/image1.jpg`} /></div>
      </div>

      
    </div>
  );
}
