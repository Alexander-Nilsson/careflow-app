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
  projectId: string;
  notesAttributeInDb: string;
}

function CardModalNotes({
  notes,
  projectId,
  notesAttributeInDb,
}: cardModalNotesProps) {
  //Handles changes made in the text field "Övriga anteckningar"
  const [notesDataSaved, setNotesDataSaved] = useState(false);
  const [updatedNotes, setUpdatedNotes] = useState(notes);

  const handleNotesInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedNotes(event.target.value);
    setNotesDataSaved(false);
  };

  //Updated the database with the new text in "Övriga anteckningar" when the save button is clicked
  async function updateNotesInDb() {
    /*try {
      const projectDocRef = doc(db, "projects", projectId);
      const updateData = {
        [notesAttributeInDb]: updatedNotes, // phaseNotes will either be notes_plan, notes_do, notes_study or notes_act depending on what phase CardModalNotes is used
      };
      await updateDoc(projectDocRef, updateData);
      setNotesDataSaved(true);

      console.log("Document updated!", updatedNotes);
    } catch (e) {
      console.error("Error updating document: ", e);
    }*/
  }

  return (
    <>
      <Form.Label>
        <b>Övriga anteckningar</b>
      </Form.Label>
      <textarea
        className="form-control"
        rows={3}
        value={updatedNotes}
        onChange={handleNotesInputChange}
      ></textarea>
      <Button
        style={buttonStyle}
        onClick={() => updateNotesInDb()}
        disabled={notes === updatedNotes || notesDataSaved}
      >
        Spara
      </Button>
    </>
  );
}

export default CardModalNotes;
