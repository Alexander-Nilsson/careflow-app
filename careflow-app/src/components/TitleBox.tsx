import React, { FC } from "react";
import HelpPopover from "./HelpPopover";

interface TitleBoxProps {
  title: string;
  description: string;
}

const TitleBox: FC<TitleBoxProps> = ({ title, description }) => {
  const titleBoxStyle: React.CSSProperties = {
    display: "inline-block",
    borderRadius: "7px",
    backgroundColor: "#0a206a",
    padding: "2vh 2vw",
    margin: "2vh 2vw",
    color: "white", // You may want to change the text color for better visibility
    fontFamily: "Avenir",
    fontWeight: "bold",
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={titleBoxStyle}>
          <h2>{title}</h2>
        </div>
        <HelpPopover content={description} />
      </div>
    </>
  );
};

export default TitleBox;
