import React from "react";
import Icon from "../assets/images/icon.png"; 

function Logo({ size = 120, alt = "Logo Exbook Change", className = "" }) {
  return (
    <img
      src={Icon}
      alt={alt}
      className={className}
      style={{ width: size, height: "auto" }}
    />
  );
}

export default Logo;
