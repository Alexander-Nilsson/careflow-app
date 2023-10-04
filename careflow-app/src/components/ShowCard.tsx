import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";

function ShowCard() {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  return (
    <div>
      <CardButton onClick={modalShow} />
      <CardModal show={show} onHide={modalClose} />
    </div>
  );
}

export default ShowCard;
