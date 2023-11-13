import { Form } from "react-bootstrap";

const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

function CardModalSimilarProjects() {
  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Liknande förbättringsarbeten</b>
        </Form.Label>
        <div style={whiteContainerStyle}>
          Här ska det finnas förslag på liknande förbättringsarbeten
        </div>
      </Form.Group>
    </>
  );
}

export default CardModalSimilarProjects;
