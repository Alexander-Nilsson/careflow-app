import React, { FC } from "react";
import HelpPopover from "./HelpPopover";

interface TitleBoxProps {
  title: string;
  description: string;
}

const TitleBox: FC<TitleBoxProps> = ({ title, description }) => {
  const titleBoxStyle: React.CSSProperties = {
    marginLeft: "2rem",
    borderRadius: "8px",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.7rem",
    fontFamily: "avenir",
    marginBottom: "0px",
    marginTop: "20px",
    alignItems: "baseline",
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div style={titleBoxStyle}>
          <h2>{title}</h2>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <HelpPopover content={description} />
        </div>
      </div>
    </>
  );
};

export default TitleBox;
