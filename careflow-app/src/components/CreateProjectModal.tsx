import React, { useState } from "react"; //Nytt
import { Modal, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import {
  BarChart,
  Lightbulb,
  Bullseye,
  QuestionCircleFill,
} from "react-bootstrap-icons";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Dropdown from "react-bootstrap/Dropdown";

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
  marginBottom: "8px",
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

function handleSubmit(e: any) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());

  let allFieldsFilled = true;
  let emptyFields = []; // Keep track of empty fields

  for (const [key, value] of Object.entries(formJson)) {
    if (value === "") {
      allFieldsFilled = false;
      emptyFields.push(key); // Add the key of the empty field to the array
    }
  }

  // If all fields are filled, or the user confirms they want to submit with empty fields
  if (
    allFieldsFilled ||
    (emptyFields.length > 0 &&
      window.confirm(
        `Some fields are empty: ${emptyFields.join(
          ", "
        )}. Are you sure you want to submit the form?`
      ))
  ) {
    sendToDataBase(formJson);
  } else {
    // If not all fields are filled and the user does not confirm, handle it here
    console.log("Form submission cancelled.");
  }
}

// Writes the formdata to database
async function sendToDataBase(formJson: any) {
  await setDoc(doc(db, "projects", "test" + formJson.title), formJson);
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
        <Form method="post" onSubmit={handleSubmit} style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input
              name="title"
              type="text"
              className="form-control"
              onKeyPress={(
                e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                e.key === "Enter" && e.preventDefault();
              }}
            ></input>
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
                  left: "0",
                  right: "0",
                  marginBottom: "0",
                  fontFamily: "Avenir",
                }}
              >
                <span
                  className="input-group-text"
                  style={{ border: "none", background: "white" }}
                >
                  +
                </span>
                <input
                  title="purpose"
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
                  style={{ border: "none" }}
                  onKeyPress={(
                    e: React.KeyboardEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
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
                  left: "0",
                  right: "0",
                  marginBottom: "0",
                  fontFamily: "Avenir",
                }}
              >
                <span
                  className="input-group-text"
                  style={{ border: "none", background: "white" }}
                >
                  +
                </span>
                <input
                  name="description"
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
                  style={{ border: "none" }}
                  onKeyPress={(
                    e: React.KeyboardEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
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
                  left: "0",
                  right: "0",
                  marginBottom: "0",
                  fontFamily: "Avenir",
                }}
              >
                <span
                  className="input-group-text"
                  style={{ border: "none", background: "white" }}
                >
                  +
                </span>
                <input
                  name="samlaideer"
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
                  style={{ border: "none" }}
                  onKeyPress={(
                    e: React.KeyboardEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Lägg till en beskrivning</label>
            <input
              title="description"
              name="title"
              type="text"
              className="form-control"
              onKeyPress={(
                e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                e.key === "Enter" && e.preventDefault();
              }}
            ></input>
          </div>

          <div className="mb-3 text">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{ width: "100%" }}>
                Lägg till avdelning
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mb-3 text-center">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{ width: "100%" }}>
                Lägg till kollegor
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mb-3 text-center">
            <Dropdown>
              <Dropdown.Toggle id="-basic" style={{ width: "100%" }}>
                Lägg till beskrivande nyckelord
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mb-3 text-center">
            <Button
              type="submit"
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
