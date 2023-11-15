import React, { useState, useEffect } from "react"; //Nytt
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
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
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
  try {
    const docRef = await addDoc(
      collection(db, "improvementWorks"),
      projectData
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
//var selectedUsers: any[] = [];
var tags: any[] = [];
//var selectedTags: any[] = [];

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

    if (!users.includes(userData.sur_name)) {
      users.push(userData.sur_name);
    }
  });
  //users.length = 0;
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

    if (!tags.includes(tagData.description)) {
      tags.push(tagData.description);
    }
  });

  //tags.length = 0;
  //return tags;
}

async function addTags(tag: Object) {
  const docRef = await addDoc(collection(db, "tags"), tag);
}

function CreateProjectModal({ show, onHide }: CreateProjectModalProps) {
  // States for error messages
  const [titleError, setTitleError] = useState(false);
  const [ideaError, setIdeaError] = useState(false);

  // States for saving text entered by user
  const [purpose, setPurpose] = useState("");
  const [ideas, setIdeas] = useState("");
  const [measure, setMeasure] = useState("");
  const [goals, setGoals] = useState("");
  const [newTag, setTags] = useState("");

  //User specific data
  const [name, setName] = useState<String>("Namn ej funnet");
  const [department, setDepartment] = useState<String>("Avdelning ej funnen");
  const [role, setRole] = useState<String>("Roll ej funnen");
  const [place, setPlace] = useState<String>("Plats ej funnen");
  const [centrum, setCentrum] = useState<String>("Centrum ej funnen");
  const [userID, setUserID] = useState<string>("UserID");

  const { isAuthenticated, isLoading, user } = useAuth0();

  //Getting data from the active user
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

  const handleKeyPressBulletPoint = (
    e: any,
    setter: (value: string) => void,
    currentValue: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setter(currentValue + "\n+ ");
    }
  };

  const handleFocusBulletPoint = (
    currentValue: string,
    setter: (value: string) => void
  ) => {
    if (currentValue === "") {
      setter("+ ");
    }
  };

  fetchUsers();
  fetchTags();

  type MembersState = string[];
  type TagState = string[];

  const [selectedMembers, setSelectedMembers] = useState<MembersState>([]);
  const [selectedTags, setSelectedTags] = useState<TagState>([]);

  //console.log(newTag);
  const handleAlternativeClick = (chosenMember: string) => {
    //If the selected member already has been chosen, remove from the array
    if (selectedMembers.includes(chosenMember)) {
      const updatedChosenMembers = selectedMembers.filter(
        (member) => member !== chosenMember
      );
      setSelectedMembers(updatedChosenMembers);
      //If the selected member has not already been chosen, add the member to the array
    } else {
      const updatedChosenMembers = [...selectedMembers, chosenMember];
      setSelectedMembers(updatedChosenMembers);
    }
  };

  const handleAlternativeClick1 = (chosenMember: string) => {
    //If the selected member already has been chosen, remove from the array
    if (selectedTags.includes(chosenMember)) {
      const updatedChosenMembers = selectedTags.filter(
        (member) => member !== chosenMember
      );
      setSelectedTags(updatedChosenMembers);
      //If the selected member has not already been chosen, add the member to the array
    } else {
      const updatedChosenMembers = [...selectedTags, chosenMember];
      setSelectedTags(updatedChosenMembers);
    }
    //fetchTags();
  };

  const [textValue, setTextValue] = useState<string>("");
  //const [confirmedText, setConfirmedText] = useState<string | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleConfirm = () => {
    //tags.push(textValue);
    const tag = {
      description: textValue,
    };
    addTags(tag);
    setTextValue(""); // Nollställ textfältet
    handleAlternativeClick1(tag.description);
  };

  console.log("alla taggar", tags);
  console.log("valda taggar", selectedTags);

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
      date_created: Timestamp.fromDate(new Date()),
      date_last_updated: Timestamp.fromDate(new Date()),
      project_leader: userID,
      project_members: selectedMembers,
      goals: transformBulletPoints(goals),
      ideas: transformBulletPoints(ideas),
      measure: transformBulletPoints(measure),
      tags: selectedTags,
      total_iterations: 1,
      all_iterations: {
        iteration1: {
          plan: {
            checklist: {
              checklist_items: ["En sak som ska göras"],
              checklist_done: [false],
              checklist_members: [""],
            },
            files: {
              file_names: ["protokoll.txt"],
              file_descriptions: ["ett protokoll"],
            },
            notes: "Planerings nteckningar",
          },
          do: {
            files: {
              file_names: ["protokoll.txt"],
              file_descriptions: ["ett protokoll"],
            },
            notes: "Göra anteckningar",
            idea: "vald ide?", // is this supposed to be here?
            results: "Resulterat resultat",
          },
          study: {
            analysis: "analys av resultatet",
            files: {
              file_names: ["protokoll.txt"],
              file_descriptions: ["ett protokoll"],
            },
            notes: "Studerings anteckningar",
          },
          act: {
            notes: "Agerande anteckningar",
            files: {
              file_names: ["protokoll.txt"],
              file_descriptions: ["ett protokoll"],
            },
            choice: "Selected choice",
          },
        },
      },
    };

    // Check if title is entered by user
    if (!formJson.title) {
      setTitleError(true); // Show error message
      return; // Stop the function to prevent sending data and closing the modal
    } else if (projectData.ideas.length == 0) {
      setIdeaError(true);
      setTitleError(false);
      return;
    } else {
      setTitleError(false); // Hide error message
      setIdeaError(false);
      // Clear textfields
      setIdeas("");
      setMeasure("");
      setGoals("");
      sendToDataBase(projectData);
      onHide(); // Only close the modal if the title is provided
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
              onKeyDown={(
                e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                e.key === "Enter" && e.preventDefault();
              }}
            ></input>
            {titleError && (
              <div style={{ color: "red" }}>Vänligen ange en titel</div>
            )}
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
                  Vad är syftet med förändringen?
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
                  name="purpose"
                  className="form-control"
                  style={{ border: "none", height: "98px" }}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                ></textarea>
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
                  onKeyDown={(e) =>
                    handleKeyPressBulletPoint(e, setGoals, goals)
                  }
                  onFocus={() => handleFocusBulletPoint(goals, setGoals)}
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
                  onKeyDown={(e) =>
                    handleKeyPressBulletPoint(e, setMeasure, measure)
                  }
                  onFocus={() => handleFocusBulletPoint(measure, setMeasure)}
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
                  onKeyDown={(e) =>
                    handleKeyPressBulletPoint(e, setIdeas, ideas)
                  }
                  onFocus={() => handleFocusBulletPoint(ideas, setIdeas)}
                />
              </div>
              {ideaError && (
                <div style={{ color: "red" }}>Minst en idé måste anges</div>
              )}
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                border: "1px solid #DDDDDD",
              }}
            >
              Lägg till kollegor
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              {users.map((member) => (
                <Dropdown.Item
                  style={{
                    fontWeight: selectedMembers.includes(member)
                      ? "bold"
                      : "normal",
                  }}
                  onClick={() => handleAlternativeClick(member)}
                >
                  {member}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown key={tags.length}>
            <Dropdown.Toggle
              style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                border: "1px solid #DDDDDD",
              }}
            >
              Lägg till beskrivande nyckelord
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Control
                  type="text"
                  placeholder="Lägg till egna nyckelord"
                  value={textValue}
                  onChange={handleTextChange}
                  className="mr-sm-2"
                  style={{ width: "80%" }}
                />
                <Button
                  variant="primary"
                  onClick={handleConfirm}
                  style={{ marginRight: "0" }}
                >
                  Lägg till
                </Button>
              </div>
              {tags.map((tag) => (
                <Dropdown.Item
                  style={{
                    fontWeight: selectedTags.includes(tag) ? "bold" : "normal",
                  }}
                  onClick={() => handleAlternativeClick1(tag)}
                >
                  {tag}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="mb-3 text-center">
            <Button
              type="submit"
              id="SkapaFörbättringsarbete"
              // onClick={() => {
              //   onHide();
              //   //setIdeas(""); // Clear the textarea when the button is clicked
              //   //setMeasure("");
              // }}
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
