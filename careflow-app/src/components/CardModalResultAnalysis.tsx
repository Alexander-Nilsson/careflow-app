import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 60px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface cardModalResultAnalysisProps {
  result_analysis: string;
  projectId: string;
}

function CardModalResultAnalysis({
  result_analysis,
  projectId,
}: cardModalResultAnalysisProps) {
  //Handles changes made in the text field "Analys av resultat"
  const [resultDataSaved, setResultDataSaved] = useState(false);
  const [updatedResult, setUpdatedResult] = useState(result_analysis);

  const handleResultInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedResult(event.target.value);
    setResultDataSaved(false);
  };

  //Updated the database with the new text in "Analys av resultat" when the save button is clicked
  async function updateResultInDb() {
    /*try {
      const projectDocRef = doc(db, "projects", projectId);
      await updateDoc(projectDocRef, {
        result_analysis: updatedResult,
      });
      setResultDataSaved(true);

      console.log("Document updated!", updatedResult);
    } catch (e) {
      console.error("Error updating document: ", e);
    }*/
  }

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Analys av resultat</b>
        </Form.Label>
        <textarea
          className="form-control"
          rows={3}
          value={updatedResult}
          onChange={handleResultInputChange}
        ></textarea>
        <Button
          style={buttonStyle}
          onClick={() => updateResultInDb()}
          disabled={result_analysis === updatedResult || resultDataSaved}
        >
          Spara
        </Button>
      </Form.Group>
    </>
  );
}

export default CardModalResultAnalysis;
