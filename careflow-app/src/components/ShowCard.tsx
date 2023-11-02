import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardButton from "./CardButton";
import CardModal from "./CardModal";
import "./ShowCard.css";
import { Timestamp } from "firebase/firestore";

interface ShowCardProps {
  title: string;
  content: string;
  column: number;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
  checklist_plan: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_do: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_study: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_act: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
}

function ShowCard({
  title,
  content,
  column,
  place,
  centrum,
  tags,
  date_created,
  checklist_plan,
  checklist_do,
  checklist_study,
  checklist_act,
}: ShowCardProps) {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  return (
    <div className={`column-${column}`}>
      <CardButton title={title} tags={tags} onClick={modalShow} />
      <CardModal
        show={show}
        onHide={modalClose}
        title={title}
        column={column.toString()}
        content={content}
        place={place}
        centrum={centrum}
        tags={tags}
        date_created={date_created}
        checklist_plan={checklist_plan}
        checklist_do={checklist_do}
        checklist_study={checklist_study}
        checklist_act={checklist_act}
      />
    </div>
  );
}

export default ShowCard;
