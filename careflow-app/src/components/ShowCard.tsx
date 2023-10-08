import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import './ShowCard.css';

interface ShowCardProps {
  title: string;
  content: string;
  column: number;
}

function ShowCard({ title, content, column }: ShowCardProps) {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  return (
    <div className={`column-${column}`}>
      <CardButton title={title} content={content} onClick={modalShow} />
      <CardModal
        show={show}
        onHide={modalClose}
        title={title}
        content={content}
      />
    </div>
  );
}

export default ShowCard;
