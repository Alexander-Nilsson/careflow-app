import React, { useState, useEffect } from "react"; //Nytt
import { Modal, Button, Form } from "react-bootstrap";
import {
  BarChart,
  Lightbulb,
  Bullseye,
  CheckCircle,
} from "react-bootstrap-icons";
import { doc, getDoc, collection, Timestamp, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import HelpPopover from "./HelpPopover";
import Dropdown from "react-bootstrap/Dropdown";
import {
  transformBulletPoints,
  handleKeyPressBulletPoint,
  handleFocusBulletPoint,
  handleFocusBulletPointGoals,
  handleKeyPressBulletPointGoals,
  findUserIds,
} from "./CreateProjectModalHelp";
import { getUser2 } from "../ImprovementWorkLib";

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

const ButtonStyleGrey = {
  backgroundColor: "lightgrey",
  fontFamily: "Avenir",
  fontSize: "17px",
  padding: "10px 20px",
  border: "none",
  cursor: "not-allowed",
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
  users: any[];
  tags: any[];
  usersClassArray: any[];
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

function CreateProjectModal({
  show,
  onHide,
  users,
  tags,
  usersClassArray,
}: CreateProjectModalProps) {
  // States for error messages
  const [titleError, setTitleError] = useState(false);
  const [ideaError, setIdeaError] = useState(false);

  // States for saving text entered by user
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [ideas, setIdeas] = useState("");
  const [measure, setMeasure] = useState("");
  const [goals, setGoals] = useState("");
  const [newTag, setTags] = useState("");

  // Check if both title and ideas are filled in
  const isFormFilled =
    title.trim() !== "" && ideas.replace("+ ", "").trim() !== "";

  //User specific data
  const [name, setName] = useState<String>("Namn ej funnet");
  const [department, setDepartment] = useState<String>("Avdelning ej funnen");
  const [role, setRole] = useState<String>("Roll ej funnen");
  const [place, setPlace] = useState<String>("Plats ej funnen");
  const [centrum, setCentrum] = useState<String>("Centrum ej funnen");
  const [userID, setUserID] = useState<string>("UserID");

  // To handle tags and members in dropdown menus
  type MembersState = string[];
  type TagState = string[];
  const [selectedMembers, setSelectedMembers] = useState<MembersState>([]);
  const [selectedTags, setSelectedTags] = useState<TagState>([]);

  const { isAuthenticated, isLoading, user } = useAuth0();

  //Getting data from the active user
  async function getUser(username: string) {
    const docRef = doc(db, "users", username);
    const docSnap = await getUser2(docRef);

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
      getUser(user.name);
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
  };

  // is executed when submit button is pressed
  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Gather info from textfields
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let project_members = findUserIds(selectedMembers, usersClassArray);
    // Remove logged in user from members list
    project_members = project_members.filter((item) => item != userID);

    const projectData = {
      title: formJson.title,
      centrum: centrum,
      place: place,
      clinic: department,
      closed: false,
      phase: 2, // planning phase is phase 2
      date_created: Timestamp.fromDate(new Date()),
      date_last_updated: Timestamp.fromDate(new Date()),
      project_leader: userID,
      project_members: project_members,
      purpose: purpose,
      goals: transformBulletPoints(goals),
      ideas: transformBulletPoints(ideas),
      ideas_done: Array(transformBulletPoints(ideas).length).fill(false),
      measure: transformBulletPoints(measure),
      tags: selectedTags,
      total_iterations: 1,
      all_iterations: [
        {
          selected_idea: "",
          plan: {
            checklist: {
              checklist_items: [],
              checklist_done: [],
              checklist_members: [],
            },
            files: {
              file_names: [],
              file_descriptions: [],
              file_urls: [],
            },
            notes: "",
          },
          do: {
            files: {
              file_names: [],
              file_descriptions: [],
              file_urls: [],
            },
            notes: "",

            results: "",
          },
          study: {
            analysis: "",
            files: {
              file_names: [],
              file_descriptions: [],
              file_urls: [],
            },
            notes: "",
          },
          act: {
            notes: "",
            files: {
              file_names: [],
              file_descriptions: [],
              file_urls: [],
            },
            choice: "",
          },
        },
      ],
    };

    // Check if necessary fields is entered by user
    if (!formJson.title && projectData.ideas.length == 0) {
      setTitleError(true); // Show error message
      setIdeaError(true);
    } else if (!formJson.title) {
      setTitleError(true); // Show error message
      setIdeaError(false);
      return; // Stop the function to prevent sending data and closing the modal
    } else if (projectData.ideas.length == 0) {
      setIdeaError(true);
      setTitleError(false);
      return;
    } else {
      setTitleError(false); // Hide error message
      setIdeaError(false);
      // Clear textfields
      setTitle("");
      setPurpose("");
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
        <label style={TitleStyle}>Skapa ett förbättringsarbete</label>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form method="post" onSubmit={handleSubmit} style={{ width: "90%" }}>
          <div className="mb-3 text-center">
            <label style={TitleStyle}>Titel</label>
            <input
              name="title"
              type="text"
              value={title}
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              // förhindra att trycka på enter stänger modalen
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
                <Bullseye
                  style={{
                    color: "#C71307",
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
                <CheckCircle
                  style={{
                    color: "#008000",
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
                  placeholder="◯ Lägg till"
                  style={{ border: "none", height: "98px" }}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  onKeyDown={(e) =>
                    handleKeyPressBulletPointGoals(e, setGoals, goals)
                  }
                  onFocus={() => handleFocusBulletPointGoals(goals, setGoals)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div style={FlexAndCenter}>
              <div style={IconCircleStyle}>
                <BarChart
                  style={{
                    color: "#32308D",
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
                    color: "#D9C515",
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
            {ideaError && (
              <div style={{ color: "red" }}>Minst en idé måste anges</div>
            )}
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
            </div>
          </div>
          <Dropdown style={{ marginBottom: "15px", marginTop: "30px" }}>
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
              {/* <div style={{ display: "flex", alignItems: "center" }}>
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
              </div> */}
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
              style={!isFormFilled ? ButtonStyleGrey : ButtonStyle}
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
