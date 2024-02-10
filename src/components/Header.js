import React from "react";

function Header() {
  return (
    <div className="header-container">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="nav">
        <div className="item">
          <div className="name">Find More</div>
          <div className="icon">
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>
        <div className="item">
          <div className="name">Contact</div>
          <div className="icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>
        </div>
        <div className="item">
          <div className="name">Tutorial</div>
          <div className="icon">
            <span className="material-symbols-outlined">favorite</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
