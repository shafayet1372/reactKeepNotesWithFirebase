import React from "react";

export default function SingleColors({ id, color, getColorsAndId, setBorder }) {
  let styles1 = {
    backgroundColor: color,
    height: "15px",
    width: "15px",
    borderRadius: "50%",
    cursor: "pointer",
    marginLeft: "2px",
  };
  let styles2 = {
    backgroundColor: color,
    height: "15px",
    width: "15px",
    borderRadius: "50%",
    cursor: "pointer",
    marginLeft: "2px",
    border: "2px solid white",
  };
  return (
    <div
      onClick={() => getColorsAndId(id, color)}
      style={setBorder ? styles2 : styles1}
    ></div>
  );
}
