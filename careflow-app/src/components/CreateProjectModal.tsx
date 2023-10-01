import { Modal, Button, Form } from "react-bootstrap";

const TitleStyle = { fontFamily: "Avenir", fontSize: "17px", marginTop: "5px" };

const DescriptiveText = {
  fontFamily: "Avenir",
  fontSize: "12px",
  color: "#848484",
  marginTop: "-3px",
  marginBottom: "7px",
};

const ButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "17px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "50px",
};

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
}

function CreateProjectModal({ show, onHide }: CreateProjectModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mb-3">
            <label style={TitleStyle}>Mål och syfte</label>
            <div className="form-text" style={DescriptiveText}>
              Vad vill vi åstadkomma med förändringen?
            </div>
            <textarea className="form-control"></textarea>
          </div>
          <div className="mb-3">
            <label style={TitleStyle}>Mäta och följa upp</label>
            <div className="form-text" style={DescriptiveText}>
              Hur vet vi om förändringen är en förbättring?
            </div>
            <textarea className="form-control"></textarea>
          </div>
          <div className="mb-3">
            <label style={TitleStyle}>Samla idéer</label>
            <div className="form-text" style={DescriptiveText}>
              Vilka förändringar kan vi göra som leder till en förändring?
            </div>
            <textarea className="form-control"></textarea>
          </div>
          <div className="mb-3 text-center">
            <Button
              id="SkapaFörbättringsarbete"
              onClick={onHide}
              style={ButtonStyle}
            >
              Skicka in förbättringsarbete
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateProjectModal;
