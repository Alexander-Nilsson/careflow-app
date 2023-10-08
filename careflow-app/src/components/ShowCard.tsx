import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";

interface ShowCardProps {
  title: string;
  content: string;
}

function ShowCard({ title, content }: ShowCardProps) {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  return (
    <div>
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
