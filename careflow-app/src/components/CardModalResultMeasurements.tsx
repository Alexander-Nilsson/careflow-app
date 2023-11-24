
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
  updatedResultMeasurements: string;
  setUpdatedResultMeasurements: React.Dispatch<React.SetStateAction<string>>;
  projectId: string;
}

function CardModalResultMeasurements({
  updatedResultMeasurements,
  setUpdatedResultMeasurements,
  projectId,
}: cardModalResultMeasurementsProps) {
  const handleResultInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedResultMeasurements(event.target.value);
  };

  return (
    <>
      <Form.Label>
        <b>Uppmätt resultat</b>
      </Form.Label>
      <textarea
        className="form-control"
        rows={5}
        value={updatedResultMeasurements}
        onChange={handleResultInputChange}
      ></textarea>
    </>
  );
}

export default CardModalResultMeasurements;
