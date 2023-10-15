import { Timestamp } from "firebase/firestore";
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
  color: "#FFFFFF",
  fontSize: "14px",
};

const TagContainerStyle = {
  backgroundColor: "#051F6E",
  padding: "2px 10px",
  marginRight: "5px",
  borderRadius: "10px",
};

const ProjectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
};

interface CardModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  column: string;
  content: string;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
}

interface SharedContentTopProps {
  title: string;
  tags: Array<string>;
  date_created: Timestamp;
  place: string;
  centrum: string;
  content: string;
}

// The content at the top of the modal (that all phases have in common)
function SharedContentTop({
  title,
  tags,
  date_created,
  place,
  centrum,
  content,
}: SharedContentTopProps) {
  const formattedDate = date_created.toDate().toLocaleString(); //Format the date into a string

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "63%" }}>
          <Modal.Title style={{ marginTop: "30px" }}>{title}</Modal.Title>
          <div style={TagStyle}>
            {tags.map((tag, index) => (
              <React.Fragment key={index}>
                <span style={TagContainerStyle}>{tag}</span>
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginBottom: "50px" }}>
            <div style={FlexAndCenter}>
              <Calendar style={IconStyle} />
              <div>
                <label>{formattedDate}</label>
              </div>
            </div>
            <div style={FlexAndCenter}>
              <Folder2Open style={IconStyle} />
              <div>
                <label>{centrum}</label>
              </div>
            </div>
            <div style={FlexAndCenter}>
              <GeoAltFill style={IconStyle} />
              <div>
                <label>{place}</label>
              </div>
            </div>
          </div>

          <Form.Group controlId="planeraDescription" style={DescriptionStyle}>
            <Form.Label>
              <b>Beskrivning</b>
            </Form.Label>
            <div>{content}</div>
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

// The content att the bottom of the modal (that all phases have in common)
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

// The content that is specific for each phase
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

function CardModal({
  show,
  onHide,
  title,
  column,
  content,
  place,
  centrum,
  tags,
  date_created,
}: CardModalProps) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          fontFamily: "Avenir",
        }}
      >
        <Tabs defaultActiveKey={"phase" + column} justify>
          {/*------ PLANERA ------*/}

          {/* Planera-tabens utseende */}
          <Tab
            eventKey="phase2"
            title={
              <span style={FlexAndCenter}>
                {parseInt(column) > 2 ? (
                  <CheckCircle
                    style={{
                      marginLeft: "35px",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <Circle
                    style={{
                      marginLeft: "35px",
                      marginRight: "10px",
                    }}
                  />
                )}
                Planera
              </span>
            }
          >
            {/* Innehållet i planera-taben */}
            <SharedContentTop
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
            />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>

          {/*------ GENOMFÖRA ------*/}

          {/* Genomföra-tabens utseende */}
          <Tab
            eventKey="phase3"
            title={
              <span style={FlexAndCenter}>
                {parseInt(column) > 3 ? (
                  <CheckCircle
                    style={{
                      marginLeft: "20px",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <Circle
                    style={{
                      marginLeft: "20px",
                      marginRight: "10px",
                    }}
                  />
                )}
                Genomföra
              </span>
            }
          >
            {/* Innehållet i genomföra-taben */}
            <SharedContentTop
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
            />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>

          {/*------STUDERA ------*/}

          <Tab
            eventKey="phase4"
            title={
              <span style={FlexAndCenter}>
                {parseInt(column) > 4 ? (
                  <CheckCircle
                    style={{
                      marginLeft: "30px",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <Circle
                    style={{
                      marginLeft: "30px",
                      marginRight: "10px",
                    }}
                  />
                )}
                Studera
              </span>
            }
          >
            {/* Innehållet i studera-taben */}
            <SharedContentTop
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
            />
            <SpecificContent />
            <SharedContentBottom />
          </Tab>

          {/*------- AGERA ------*/}

          <Tab
            eventKey="phase5"
            title={
              <span style={FlexAndCenter}>
                {parseInt(column) > 5 ? (
                  <CheckCircle
                    style={{
                      marginLeft: "40px",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <Circle
                    style={{
                      marginLeft: "40px",
                      marginRight: "10px",
                    }}
                  />
                )}
                Agera
              </span>
            }
          >
            {/* Innehållet i agera-taben */}
            <SharedContentTop
              title={title}
              tags={tags}
              date_created={date_created}
              place={place}
              centrum={centrum}
              content={content}
            />
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
