import React, { useState, useEffect } from "react"; //Nytt
import { Modal, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import {
  BarChart,
  Lightbulb,
  Bullseye,
  QuestionCircleFill,
} from "react-bootstrap-icons";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HelpPopover from "./HelpPopover";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";

export type UserInfoType = {
  hsaID: string | undefined;
  admin: any;
  centrum: any;
  clinic: any;
  email: any;
  first_name: any;
  phone_number: any;
  place: any;
  profession: any;
  sur_name: any;
};

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

const FlexAndCenter = {
  display: "flex",
  alignItems: "center",
};

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
}

function transformBulletPoints(value: string) {
  // Split the value by newline characters to get an array of lines
  let lines = value.split("\n");

  // Remove the bullet points from each line
  lines = lines.map((line) => line.replace("+ ", ""));

  // Remove any empty lines
  lines = lines.filter((line) => line !== "");

  return lines;
}

// Writes the formdata to database
async function sendToDataBase(projectData: object) {
  await setDoc(doc(db, "improvementWorks", "Sample Project"), projectData);

  //await setDoc(doc(db, "projects", formJson.title), formJson);
}

function CreateProjectModal({ show, onHide }: CreateProjectModalProps) {
  // States for saving text entered by user
  const [ideas, setIdeas] = useState(""); // State for saving the ideas entered by user
  const [measure, setMeasure] = useState(""); // State for saving the ideas entered by user
  const [goals, setGoals] = useState(""); // State for saving the ideas entered by user

  //User specific data
  const [name, setName] = useState<String>("Namn ej funnet");
  const [department, setDepartment] = useState<String>("Avdelning ej funnen");
  const [role, setRole] = useState<String>("Roll ej funnen");
  const [place, setPlace] = useState<String>("Plats ej funnen");
  const [centrum, setCentrum] = useState<String>("Centrum ej funnen");
  const [userID, setUserID] = useState<string>("UserID");

  const { isAuthenticated, isLoading, user } = useAuth0();

  async function getUser2(username: string) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //  console.log("Document data:", docSnap.data());
      setName(docSnap.data().first_name);
      setDepartment(docSnap.data().clinic);
      setRole(docSnap.data().profession);
      setPlace(docSnap.data().place);
      setCentrum(docSnap.data().centrum);
      setUserID(username);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  }
  async function setItems() {
    if (user?.name) {
      getUser2(user.name);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await setItems(); //async function ensures that goal has been fetched before fetching projects
    }
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleKeyPressBulletPoint = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIdeas(ideas + "\n+ ");
    }
  };

  const handleKeyPressBulletPointMeasure = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMeasure(measure + "\n+ ");
    }
  };

  const handleKeyPressBulletPointGoals = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setGoals(goals + "\n+ ");
    }
  };

  const handleFocusBulletPoint = () => {
    if (ideas === "") {
      setIdeas("+ ");
    }
  };

  const handleFocusBulletPointMeasure = () => {
    if (measure === "") {
      setMeasure("+ ");
    }
  };

  const handleFocusBulletPointGoals = () => {
    if (goals === "") {
      setGoals("+ ");
    }
  };

  // is executed when submit button is pressed
  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Gather info from textfields
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const projectData = {
      title: formJson.title,
      centrum: centrum,
      place: place,
      clinic: department,
      closed: false,
      phase: 1,
      date_created: new Timestamp(0, 0),
      project_leader: userID,
      goals: transformBulletPoints(goals),
      ideas: transformBulletPoints(ideas),
      measure: transformBulletPoints(measure),
    };
    // Clear the textarea when the button is clicked
    setIdeas("");
    setMeasure("");
    setGoals("");
    sendToDataBase(projectData);
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <div>
          <HelpPopover content="Här kommer det vara en informationsruta som hjälper användaren att skapa ett nytt förändringsarbete" />
        </div>
        {/* <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="right"
          overlay={HelpPopover}
        >
          <QuestionCircleFill style={QuestionmarkStyle}></QuestionCircleFill>
        </OverlayTrigger> */}
        <label style={TitleStyle}>Skapa ett förbättringsarbete</label>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form method="post" onSubmit={handleSubmit} style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input
              name="title"
              type="text"
              className="form-control"
              // this is to prevent it from submitting when pressing enter
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
                <label style={TitleStyle}>Mål</label>
                <div className="form-text" style={DescriptiveTextStyle}>
                  Vad vill du uppnå med förbättringen?
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
                <textarea
                  name="goals"
                  className="form-control"
                  placeholder="+ Lägg till"
                  style={{ border: "none", height: "98px" }}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  onKeyPress={handleKeyPressBulletPointGoals}
                  onFocus={handleFocusBulletPointGoals}
                ></textarea>
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
                  Hur mäter vi om förändringen gör skillnad?
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
                <textarea
                  name="measure"
                  className="form-control"
                  placeholder="+ Lägg till"
                  style={{ border: "none", height: "98px" }}
                  value={measure}
                  onChange={(e) => setMeasure(e.target.value)}
                  onKeyPress={handleKeyPressBulletPointMeasure}
                  onFocus={handleFocusBulletPointMeasure}
                ></textarea>
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
                  Brainstorma idéer för för nå målen
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
                <textarea
                  name="samlaideer"
                  className="form-control"
                  placeholder="+ Lägg till"
                  style={{ border: "none", height: "98px" }}
                  value={ideas}
                  onChange={(e) => setIdeas(e.target.value)}
                  onKeyPress={handleKeyPressBulletPoint}
                  onFocus={handleFocusBulletPoint}
                />
              </div>
            </div>
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
              onClick={() => {
                onHide();
                //setIdeas(""); // Clear the textarea when the button is clicked
                //setMeasure("");
              }}
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
