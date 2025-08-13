import React from "react";
import Logo from "../assets/images/icon.png";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import "./styles/DashBoard.css";

function DashBoard() {
  return (
    <div className="main">
    <header className="header">
      <FaBars className="icon" />
      <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
      <div className="right-icons">
        <FaBell className="icon" />
        <FaUser className="icon" />
      </div>
    </header>

    <div className="test">
        
    </div>
    </div>
  );
}

export default DashBoard;
