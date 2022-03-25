import React from "react";

const Sidebar = () => {
  const handleClick = () => {


  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        zIndex: 1000,
        backgroundColor: "#ffc905b0",
        width: "200px",
        height: "100%",
      }}
    >
      <div onClick={handleClick}>BBB</div>
      SIDEBAR
    </div>
  );
};

export default Sidebar;
