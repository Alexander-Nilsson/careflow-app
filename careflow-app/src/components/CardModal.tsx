import { Modal, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import { BarChart, Lightbulb, Bullseye } from "react-bootstrap-icons";
import Nav from 'react-bootstrap/Nav';

const TitleStyle = {
  fontFamily: "Avenir",
  fontSize: "17px",
  marginTop: "5px",
  marginLeft: "0px",
};

const DescriptiveText = {
  fontFamily: "Avenir",
  fontSize: "12px",
  color: "#848484",
  marginTop: "-3px",
  marginBottom: "7px",
  marginLeft: "0px",
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

const ButtonStyle1 = {
  backgroundColor: "#051F6F",
  border: "none",
  cursor: "pointer",
  borderRadius: "1000px",
};

const ButtonStyle2 = {
    backgroundColor: "White",
    border: "none",
    cursor: "pointer",
    color: "Black",
    borderRadius: "1000px",
    ':hover': {
        backgroundColor: "#0000000" // darker blue when hovered
    }
  };

const IconCircleStyle = {
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  border: "0.5px solid #AEAEAE",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const HelpPopover = (
  <Popover id="popover-positioned-right" title="Popover right">
    Här kommer det finnas en beskrivande text
  </Popover>
);

interface CardModalProps {
  show: boolean;
  onHide: () => void;
}

function CardModal({ show, onHide }: CardModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
      <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#planera">Planera</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#genomföra">Genomföra</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#studera">Studera</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#agera">Agera</Nav.Link>
          </Nav.Item>

        </Nav>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mb-3">
            <Bullseye
              style={{
                marginRight: "10px",
                marginBottom: "3px",
                color: "red",
                borderRadius: "50%",
                borderColor: "gray",
                background: "white",
              }}
            ></Bullseye>
            <label style={TitleStyle}>Mål och syfte</label>
            <div className="form-text" style={DescriptiveText}>
              Vad vill vi åstadkomma med förändringen?
            </div>
            <textarea className="form-control"></textarea>
          </div>
          <div className="mb-3">
            <BarChart
              style={{
                marginRight: "10px",
                marginBottom: "3px",
                color: "purple",
              }}
            ></BarChart>
            <label style={TitleStyle}>Mäta och följa upp</label>
            <div className="form-text" style={DescriptiveText}>
              Hur vet vi om förändringen är en förbättring?
            </div>
            <textarea className="form-control"></textarea>
          </div>
          <div className="mb-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={IconCircleStyle}>
                <Lightbulb
                  style={{
                    color: "#FFE500",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <div>
                <label style={TitleStyle}>Samla idéer</label>
                <div className="form-text" style={DescriptiveText}>
                  Vilka förändringar kan vi göra som leder till en förbättring?
                </div>
              </div>
            </div>
            <textarea className="form-control"></textarea>
          </div>
          <div className="mb-3 text-center">
            <Button
              id="Spara"
              onClick={onHide}
              style={ButtonStyle}
            >
              Spara
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CardModal;
