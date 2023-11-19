import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

import { PlusLg } from "react-bootstrap-icons";

const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

const flexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const saveChecklistButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
};

interface cardModalChecklistProps {
  project_leader: string;
  project_members: Array<string>;
  checklist: {
    checklist_items: Array<string>;
    checklist_done: Array<boolean>;
    checklist_members: Array<string>;
  };
  checklistDone: Array<boolean>;
  setChecklistDone: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function CardModalChecklist({
  project_leader,
  project_members,
  checklist,
  checklistDone,
  setChecklistDone,
}: cardModalChecklistProps) {
  //const [checklistDone, setChecklistDone] = useState(checklist.checklist_done);

  const handleCheckboxChange = (index: number) => {
    setChecklistDone((prevChecklistDone) => {
      const newChecklistDone = [...prevChecklistDone]; //Create a copy of the boolean's previous state
      newChecklistDone[index] = !newChecklistDone[index]; //Change the state of the copy
      return newChecklistDone; //Return the new state
    });

    //HÄR SKA DET OCKSÅ LÄGGAS TILL KOD FÖR ATT UPPDATERA DATABASEN MED NYA BOOLEAN-VÄRDET
  };

  //Handles the modal that opens up when you create a new checklist task
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleShowTaskModal = () => {
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
  };

  //State variables related to the checkbox
  const [selectedMembers, setSelectedMembers] = useState([""]);
  const [newTask, setNewTask] = useState("");
  const [checklistItem, setChecklistItem] = useState(checklist.checklist_items);
  const [checklistMembers, setChecklistMembers] = useState(
    checklist.checklist_members
  );

  //Adds members to a checklist task when their name is clicked
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

  //Adds the new task to the checklist array when the "lägg till aktivitet" button is clicked
  const handleSaveTaskModal = (newTask: string) => {
    //Makes sure that the "aktivitet" field is filled before the task can be added
    if (newTask.trim() !== "") {
      setShowTaskModal(false);
      const updatedChecklistItem = [...checklistItem, newTask];
      const updatedChecklistDone = [...checklistDone, false];

      //If members have been chosen, convert the selectedMembers array to a string on the (Member 1, Member 2) format. If no one has been chosen, set selectedMembers to "none".
      const selectedMembersString =
        selectedMembers.length > 1
          ? selectedMembers.filter((member) => member !== "").join(", ")
          : "none";

      const updateChecklistMembers = [
        ...checklistMembers,
        selectedMembersString,
      ];

      setChecklistItem(updatedChecklistItem);
      setChecklistDone(updatedChecklistDone);
      setChecklistMembers(updateChecklistMembers);

      setNewTask("");
      setSelectedMembers([""]);
    }
  };

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Aktiviteter för att genomföra idén</b>
        </Form.Label>
        <div style={whiteContainerStyle}>
          {checklistItem.map((item, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={
                // Print the task followed by the names of the project members assigned to that task (if no one is assigned, only print the task text)
                checklistMembers[index] === "none" ? (
                  item
                ) : (
                  <span>
                    {item}
                    <span
                      style={{
                        color: "#AEAEAE",
                        fontSize: "14px",
                        marginLeft: "7px",
                      }}
                    >
                      ({checklistMembers[index]})
                    </span>
                  </span>
                )
              }
              checked={checklistDone[index]} //Checks if the checkbox should be filled or not based on the state-array "checklistDone"
              onChange={() => handleCheckboxChange(index)} //Handles checkbox changes
            />
          ))}

          <Button
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              fontSize: "15.5px",
              padding: "0px",
              border: "none",
              cursor: "pointer",
              marginTop: "17px",
            }}
            onClick={handleShowTaskModal}
          >
            <div style={flexAndCenter}>
              <PlusLg style={{ marginRight: "9px" }} />
              <div>Lägg till ny aktivitet</div>
            </div>
          </Button>
        </div>
      </Form.Group>

      <Modal
        show={showTaskModal}
        onHide={handleCloseTaskModal}
        style={{ top: "25%", fontFamily: "Avenir" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form style={{ width: "90%" }}>
            <div className="mb-3 text-center">
              <label>Aktivitet</label>
              <input
                type="text"
                className="form-control"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 text-center">
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
                  <Dropdown.Item
                    style={{
                      fontWeight: selectedMembers.includes(project_leader)
                        ? "bold"
                        : "normal",
                    }}
                    onClick={() => handleAlternativeClick(project_leader)}
                  >
                    {project_leader}
                  </Dropdown.Item>
                  {project_members.map((member) => (
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
            </div>
            <div className="mb-3 text-center">
              <Button
                style={saveChecklistButtonStyle}
                onClick={() => handleSaveTaskModal(newTask)}
              >
                Lägg till ny aktivitet
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModalChecklist;
