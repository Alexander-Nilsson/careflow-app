import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 60px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface cardModalResultMeasurementsProps {
  result_measurements: string;
  projectId: string;
}

function CardModalResultMeasurements({
  result_measurements,
  projectId,
}: cardModalResultMeasurementsProps) {
  //Handles changes made in the text field "Uppmätt resultat"
  const [resultDataSaved, setResultDataSaved] = useState(false);
  const [updatedResult, setUpdatedResult] = useState(result_measurements);

  const handleResultInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedResult(event.target.value);
    setResultDataSaved(false);
  };

  //Updated the database with the new text in "Uppmätt resultat" when the save button is clicked
  async function updateResultInDb() {
    try {
      const projectDocRef = doc(db, "projects", projectId);
      await updateDoc(projectDocRef, {
        result_measurements: updatedResult,
      });
      setResultDataSaved(true);

      console.log("Document updated!", updatedResult);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  return (
    <>
      <Form.Label>
        <b>Uppmätt resultat</b>
      </Form.Label>
      <textarea
        className="form-control"
        rows={5}
        value={updatedResult}
        onChange={handleResultInputChange}
      ></textarea>
      <Button
        style={buttonStyle}
        onClick={() => updateResultInDb()}
        disabled={result_measurements === updatedResult || resultDataSaved}
      >
        Spara
      </Button>
    </>
  );
}

export default CardModalResultMeasurements;
