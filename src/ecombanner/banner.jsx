import React from 'react';
import "./banner.css";
import bannerimg from "../assets/chakras-mystical-concept.png";

const Banner = () => {
  return (
    <div className='hero-banner'>
      <div className='content'>
        <div className='text-content'>
          <h1>Sales</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi illo magnam impedit optio eius sunt!
          </p>
          <div className="ctas">
            <div className='banner-cta'>Read more</div>
            <div className='banner-cta'>Shop now</div>
          </div>
        </div>
      </div>
      <img src={bannerimg} alt="banner" className="banner-image"/>
    </div>  
  );
}

export default Banner;
