import { Modal, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import {
  BarChart,
  Lightbulb,
  Bullseye,
  QuestionCircleFill,
} from "react-bootstrap-icons";

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
  backgroundColor: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "1000px",
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
    Här kommer det finnas en bskrivande text
  </Popover>
);

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
}

function CreateProjectModal({ show, onHide }: CreateProjectModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <OverlayTrigger trigger="hover" placement="right" overlay={HelpPopover}>
          <Button style={ButtonStyle1}>
            <QuestionCircleFill
              style={{
                marginRight: "10px",
                marginBottom: "3px",
                color: "#051F6F",
                width: "25px",
                height: "25px",
              }}
            ></QuestionCircleFill>
          </Button>
        </OverlayTrigger>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mb-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={IconCircleStyle}>
                <Bullseye
                  style={{
                    color: "#FD0B0B",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <div>
                <label style={TitleStyle}>Mål och syfte</label>
                <div className="form-text" style={DescriptiveText}>
                  Vad vill vi åstadkomma med förändringen?
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ height: "100px" }}>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                +
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Lägg till mål"
                style={{}}
              ></input>
            </div>
          </div>
          <div className="mb-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={IconCircleStyle}>
                <BarChart
                  style={{
                    color: "#495BFF",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <div>
                <label style={TitleStyle}>Mäta och följa upp</label>
                <div className="form-text" style={DescriptiveText}>
                  Hur vet vi om förändringen är en förbättring?
                </div>
              </div>
            </div>
            <div className="card" style={{ height: "100px" }}>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  +
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Lägg till "
                  style={{}}
                ></input>
              </div>
            </div>
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
            <div className="card" style={{ height: "100px" }}>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  +
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Lägg till idé"
                  style={{}}
                ></input>
              </div>
            </div>
          </div>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Lägg till avdelning</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Lägg till kollegor</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Lägg till beskrivande nyckelord</label>
            <input type="text" className="form-control"></input>
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
