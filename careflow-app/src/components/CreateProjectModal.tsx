import React, { useState } from "react"; //Nytt
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

const DescriptiveTextStyle = {
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

const QuestionmarkStyle = {
  marginRight: "10px",
  marginBottom: "3px",
  color: "#051F6F",
  width: "25px",
  height: "25px",
};

const FlexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const HelpPopover = (
  <Popover
    id="popover-positioned-right"
    title="Popover right"
    style={{ padding: "10px" }}
  >
    Här kommer det att finnas en beskrivande text sen
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
          <QuestionCircleFill style={QuestionmarkStyle}></QuestionCircleFill>
        </OverlayTrigger>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input type="text" className="form-control"></input>
          </div>

          <div className="mb-3">
            <div style={FlexAndCenter}>
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
                <div className="form-text" style={DescriptiveTextStyle}>
                  Vad vill vi åstadkomma med förändringen?
                </div>
              </div>
            </div>
            <div className="card" style={{ height: "100px" }}>
              <div
                className="input-group input-group-sm"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  marginBottom: "0",
                  fontFamily: "Avenir",
                }}
              >
                <span className="input-group-text">+</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
                ></input>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div style={FlexAndCenter}>
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
                <div className="form-text" style={DescriptiveTextStyle}>
                  Hur vet vi om förändringen är en förbättring?
                </div>
              </div>
            </div>
            <div className="card" style={{ height: "100px" }}>
              <div
                className="input-group input-group-sm"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  marginBottom: "0",
                  fontFamily: "Avenir",
                }}
              >
                <span className="input-group-text">+</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
                ></input>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div style={FlexAndCenter}>
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
                <div className="form-text" style={DescriptiveTextStyle}>
                  Vilka förändringar kan vi göra som leder till en förbättring?
                </div>
              </div>
            </div>
            <div className="card" style={{ height: "100px" }}>
              <div
                className="input-group input-group-sm"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  marginBottom: "0",
                  fontFamily: "Avenir",
                }}
              >
                <span className="input-group-text">+</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
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
