import React from 'react';
import './TiktokShopBanner.scss';

const TiktokShopBanner = () => {
  return (
    <div className="banner-container">
      <div className="text-content">
        <h1>
          How to Sell
          <br />
          Digital Products
          <br />
          on <span className="tiktok-text">TikTok</span> Shop
        </h1>
        <div className="dollar-icon-container">
          <div className="dollar-icon">$</div>
        </div>
      </div>
      <div className="phone-mockup">
        <div className="phone-screen">
            <div className="tiktok-shop-logo">
                <div className="bag-handle"></div>
                <div className="bag-body"></div>
                <div className="tiktok-logo"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TiktokShopBanner;
