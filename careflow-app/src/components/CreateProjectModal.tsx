import React, { useState } from "react"; //Nytt
import { Modal, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import {
  BarChart,
  Lightbulb,
  Bullseye,
  EnvelopePaper,
} from "react-bootstrap-icons";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  Timestamp,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import HelpPopover from "./HelpPopover";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import { Id } from "../types";
import { useRoutes } from "react-router-dom";

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
class Tag {
  id: Id;
  description: string;
  constructor(id: Id, description: string) {
    this.id = id;
    this.description = description;
  }
}
class User {
  id: Id;
  admin: boolean;
  centrum: string;
  clinic: string;
  email: string;
  first_name: string;
  sur_name: string;
  phone_number: string;
  place: string;
  profession: string;
  projects: Array<string>;

  constructor(
    id: Id,
    admin: boolean,
    centrum: string,
    clinic: string,
    email: string,
    first_name: string,
    sur_name: string,
    phone_number: string,
    place: string,
    profession: string,
    projects: Array<string>
  ) {
    this.id = id;
    this.admin = admin;
    this.centrum = centrum;
    this.clinic = clinic;
    this.email = email;
    this.first_name = first_name;
    this.sur_name = sur_name;
    this.phone_number = phone_number;
    this.place = place;
    this.profession = profession;
    this.projects = projects;
  }
}

// Writes the formdata to database
async function sendToDataBase(formJson: any) {
  console.log(formJson);

  // Temp solution to avoid crash
  const checklist_act_map = {
    checklist_done: [false],
    checklist_item: ["Köp fika"],
    checklist_members: [""],
  };
  const checklist_plan_map = {
    checklist_done: [false],
    checklist_item: ["Planera fika"],
    checklist_members: [""],
  };
  const checklist_study_map = {
    checklist_done: [false],
    checklist_item: ["Studera fika"],
    checklist_members: [""],
  };
  const checklist_do_map = {
    checklist_done: [false],
    checklist_item: ["Gör fika"],
    checklist_members: [""],
  };

  const allData = {
    id: 42,
    centrum: "Ett centrum",
    checklist_act: checklist_act_map,
    checklist_do: checklist_do_map,
    checklist_plan: checklist_plan_map,
    checklist_study: checklist_study_map,
    clinic: "en klinik",
    closed: false,
    phase: 1,
    date_created: new Timestamp(0, 0),
    tags: [],
    place: "US Linköping",
    description: "En beskrivning av projektet",
    title: "En titel för projektet",
    project_members: [],
  };

  await setDoc(doc(db, "projects", "Sample Project"), allData);

  //await setDoc(doc(db, "projects", formJson.title), formJson);
}

const memberConverter = {
  toFirestore: (memberData: any) => ({
    id: memberData.id,
    admin: memberData.admin,
    centrum: memberData.centrum,
    clinic: memberData.clinic,
    email: memberData.email,
    first_name: memberData.first_name,
    sur_name: memberData.sur_name,
    phone_number: memberData.phone_number,
    place: memberData.place,
    profession: memberData.profession,
    projects: memberData.projects,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);

    return new User(
      snapshot.id,
      data.admin,
      data.centrum,
      data.clinic,
      data.email,
      data.first_name,
      data.sur_name,
      data.phone_number,
      data.place,
      data.profession,
      data.projects
    );
  },
};

const tagConverter = {
  toFirestore: (tagData: any) => ({
    description: tagData.description,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);

    return new Tag(snapshot.id, data.description);
  },
};

var users: any[] = [];
var selectedUsers: any[] = [];
var tags: any[] = [];
var selectedTags: any[] = [];

async function fetchUsers() {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const ids = querySnapshot.docs.map((doc) => doc.id);

  ids.map(async (id) => {
    const projectReference = doc(db, "users", id).withConverter(
      memberConverter
    );
    const snapshot = await getDoc(projectReference);
    const userData = snapshot.data() as User;

    users.push(userData.sur_name);
  });
  users.length = 0;
  //return users;
}

async function fetchTags() {
  const q = query(collection(db, "tags"));
  const querySnapshot = await getDocs(q);
  const ids = querySnapshot.docs.map((doc) => doc.id);

  ids.map(async (id) => {
    const tagReference = doc(db, "tags", id).withConverter(tagConverter);
    const snapshot = await getDoc(tagReference);
    const tagData = snapshot.data() as Tag;

    tags.push(tagData.description);
  });

  tags.length = 0;
  //return tags;
}

function CreateProjectModal({ show, onHide }: CreateProjectModalProps) {
  const [selectedPhase, setselectedPhase] = useState(1); // State for tracking the selected phase/pill

  fetchUsers();
  fetchTags();

  //handle dropdown for users
  const [selectedOption, setSelectedOption] = useState<string>(users[0]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (!selectedUsers.includes(event.target.value)) {
      selectedUsers.push(event.target.value);
    }
  };

  //handle dropdown for tags
  const [selectedOption1, setSelectedOption1] = useState<string>(tags[0]);
  const handleOptionChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
    if (!selectedTags.includes(event.target.value)) {
      selectedTags.push(event.target.value);
    }
  };

  // is executed when submit button is pressed
  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson.phase = selectedPhase.toString();

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
      e.preventDefault();
    }
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
                <EnvelopePaper
                  style={{
                    color: "black",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <div>
                <label style={TitleStyle}>Syfte</label>
                <div className="form-text" style={DescriptiveTextStyle}>
                  Vad är syftet bakom förändringen?
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
                  name="malochsyfte"
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
                  name="malochsyfte"
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
                  name="mataochfoljaupp"
                  type="text"
                  className="form-control"
                  placeholder="Lägg till"
                  style={{ border: "none" }}
                  // this is to prevent it from submitting when pressing enter
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
          <div>
            <label style={TitleStyle}>Lägg till kollegor: </label>
            <select value={selectedOption} onChange={handleOptionChange}>
              {users.map((user: any, index: any) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <p>Vald kollega: {selectedOption}</p>
          </div>
          <div>
            <label style={TitleStyle}>Lägg till taggar: </label>
            <select value={selectedOption1} onChange={handleOptionChange1}>
              {tags.map((tag: any, index: any) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <p>Vald tag: {selectedOption1}</p>
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
