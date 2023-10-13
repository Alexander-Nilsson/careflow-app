import React, { useState } from "react";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";

import {
  Calendar,
  Folder2Open,
  GeoAltFill,
  Circle,
  CheckCircle,
} from "react-bootstrap-icons";

const ButtonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "17px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "50px",
};

const IconStyle = {
  width: "15px",
  height: "15px",
  marginRight: "7px",
  marginTop: "0px",
};

const FlexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const FormGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
};

const DescriptionStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
};

const TagStyle = {
  marginTop: "5px",
  marginBottom: "10px",
};

const ProjectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
};

// Innehållet längst upp i modalen (som är gemensamt för alla faser)
function SharedContentTop() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "63%" }}>
          <Modal.Title style={{ marginTop: "30px" }}>Projekttitel</Modal.Title>
          <div style={TagStyle}>Här ska det ligga taggar sen</div>
          <div style={{ marginBottom: "50px" }}>
            <div style={FlexAndCenter}>
              <Calendar style={IconStyle} />
              <div>
                <label>Startdatum</label>
              </div>
            </div>
            <div style={FlexAndCenter}>
              <Folder2Open style={IconStyle} />
              <div>
                <label>Avdelning</label>
              </div>
            </div>
            <div style={FlexAndCenter}>
              <GeoAltFill style={IconStyle} />
              <div>
                <label>Sjukhus</label>
              </div>
            </div>
          </div>

          <Form.Group controlId="planeraDescription" style={DescriptionStyle}>
            <Form.Label>
              <b>Beskrivning</b>
            </Form.Label>
            <div>Här ska det finnas en beskrivning</div>
          </Form.Group>
        </div>

        <div style={ProjectMembersContainer}>
          <Form.Group controlId="projectMembersForm">
            <Form.Label>
              <div>
                <b>Medlemmar</b>
              </div>
            </Form.Label>
          </Form.Group>
        </div>
      </div>
    </>
  );
}

// Innehållet längst ner i modalen (som också är gemensamt för alla faser)
function SharedContentBottom() {
  return (
    <>
      <Form.Group controlId="planeraChecklist" style={FormGroupStyle}>
        <Form.Label>
          <b>Liknande förbättringsarbeten</b>
        </Form.Label>
        <div>Här ska det finnas förslag på liknande förbättringsarbeten</div>
      </Form.Group>
    </>
  );
}

//Det innehållet som är specifikt för varje tab
function SpecificContent() {
  return (
    <>
      <Form>
        <Form.Group controlId="planeraChecklist" style={FormGroupStyle}>
          <Form.Label>
            <b>Checklista</b>
          </Form.Label>
          <div>Här ska det finnas en checklista</div>
        </Form.Group>

        <Form.Group controlId="planeraNotes" style={FormGroupStyle}>
          <Form.Label>
            <b>Anteckningar</b>
          </Form.Label>
          <textarea className="form-control" rows={3}></textarea>
        </Form.Group>

        <Form.Group controlId="planeraFile" style={FormGroupStyle}>
          <Form.Label>
            <b>Bilagor</b>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>
    </>
  );
}

interface CardModalTestProps {
  show: boolean;
  onHide: () => void;
  title: string;
  content: string;
}

function CardModal({ show, onHide, title, content }: CardModalTestProps) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          fontFamily: "Avenir",
        }}
      >
        <Tabs defaultActiveKey="tab1" justify>
          {/*------ PLANERA ------*/}

          {/* Planera-tabens utseende */}
          <Tab
            eventKey="tab1"
            title={
              <span style={FlexAndCenter}>
                <CheckCircle
                  style={{
                    marginLeft: "35px",
                    marginRight: "10px",
                  }}
                />
                Planera
              </span>
            }
          >
            {/* Innehållet i planera-taben */}
            <SharedContentTop />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>

          {/*------ GENOMFÖRA ------*/}

          {/* Genomföra-tabens utseende */}
          <Tab
            eventKey="tab2"
            title={
              <span style={FlexAndCenter}>
                <CheckCircle
                  style={{
                    marginLeft: "20px",
                    marginRight: "10px",
                  }}
                />
                Genomföra
              </span>
            }
          >
            {/* Innehållet i genomföra-taben */}
            <SharedContentTop />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>

          {/*------STUDERA ------*/}

          <Tab
            eventKey="tab3"
            title={
              <span style={FlexAndCenter}>
                <Circle
                  style={{
                    marginLeft: "30px",
                    marginRight: "10px",
                  }}
                />
                Studera
              </span>
            }
          >
            {/* Innehållet i studera-taben */}
            <SharedContentTop />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>

          {/*------- AGERA ------*/}

          <Tab
            eventKey="tab4"
            title={
              <span style={FlexAndCenter}>
                <Circle
                  style={{
                    marginLeft: "40px",
                    marginRight: "10px",
                  }}
                />
                Agera
              </span>
            }
          >
            {/* Innehållet i agera-taben */}
            <SharedContentTop />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} style={ButtonStyle}>
          Spara
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;
