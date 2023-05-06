import "./Sticker.css";

import React from "react";

function Sticker(props) {
  return (
    <div className="sticker" onClick={props.onClick}>
      <img src={props.pic} alt="sticker" />
    </div>
  );
}

export default Sticker;
