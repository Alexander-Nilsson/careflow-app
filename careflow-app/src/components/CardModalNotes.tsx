import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { FileX } from "react-bootstrap-icons";

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 60px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface cardModalNotesProps {
  notes: string;
  setUpdatedNotes: React.Dispatch<React.SetStateAction<string>>;
}

function CardModalNotes({ notes, setUpdatedNotes }: cardModalNotesProps) {
  const handleNotesInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedNotes(event.target.value);
  };

  return (
    <>
      <Form.Label>
        <b>Övriga anteckningar</b>
      </Form.Label>
      <textarea
        className="form-control"
        rows={3}
        value={notes}
        onChange={handleNotesInputChange}
      ></textarea>
    </>
  );
}

export default CardModalNotes;
