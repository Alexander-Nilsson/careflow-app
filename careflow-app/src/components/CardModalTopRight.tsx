import { Button, Dropdown, Form } from "react-bootstrap";
import { getMemberName } from "../ImprovementWorkLib";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {  findUserIds,
} from "./CreateProjectModalHelp";
import { users, usersClassArray } from "./CreateNewProject";

const projectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
  borderRadius: "10px",
};

interface CardModalTopRightProps {
  project_leader: string;
  project_members: Array<string>;
  updatedMembers: Array<string>;
  setUpdatedMembers: React.Dispatch<React.SetStateAction<string[]>>;
}


//The top right part of the modal containing the project leader and project members
function CardModalTopRight(
  {
  project_leader,
  project_members,
  updatedMembers,
  setUpdatedMembers,
}

: CardModalTopRightProps) 
{

  type MembersState = string[];
  const [selectedMembers, setSelectedMembers] = useState<MembersState>([]);
  const [userID, setUserID] = useState<string>("UserID");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newMember, setNewMember] = useState("");

 //Handles the deletion of tags
 const handleRemoveMember = (indexToRemove: number) => {
  const updatedMembersArray = updatedMembers.filter(
    (_, index) => index !== indexToRemove
  );
  setUpdatedMembers(updatedMembersArray);
  console.log(updatedMembers);
};

const handleShowTagModal = () => {
  setShowMemberModal(true);
};
const handleCloseTagModal = () => {
  setShowMemberModal(false);
};

//setSelectedMembers(project_members);

//Adds the new tag to the tag array when the "lägg till kollegor" button is clicked
const handleSaveMember = (newMember: string) => {
  //Makes sure that the input field is filled before the tag can be added
  if (newMember.trim() !== "") {
    handleCloseTagModal();
    const updatedMembersArray = [...updatedMembers, newMember];
  
    console.log(updatedMembersArray);
    setUpdatedMembers(updatedMembersArray);
    const updatedProjectMemberArray = [...project_members, ...updatedMembersArray];
    
    console.log(updatedProjectMemberArray);
    
    setNewMember("");
  }
};

  const selectNewMembers = (chosenMember: string) => {
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
  let project_members = findUserIds(selectedMembers, usersClassArray);
  // Remove logged in user from members list
  project_members = project_members.filter((item) => item != userID);
  const updatedMembersArray = [...updatedMembers, newMember];
    setUpdatedMembers(updatedMembersArray);
    setNewMember("");

  console.log(updatedMembers);
}




  return (
    <>
      <div style={projectMembersContainer}>
        <Form.Group>
          <Form.Label>
            <div>
              <b style={{ fontSize: "18px" }}>Förbättringsledare</b>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  fontSize: "15px",
                }}
              >
                {project_leader}
              </div>
              <b style={{ fontSize: "18px" }}>Förbättringsmedlemmar</b>
              {project_members.map((member, index) => (
                <div style={{ marginTop: "10px", fontSize: "15px" }}>
                  {member}
                </div>
              ))}
              {updatedMembers.map((member, index) => (
                <div style={{ marginTop: "10px", fontSize: "15px" }}>
                  {member}
                </div>
              ))}
              
              <div>
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
                    fontWeight: updatedMembers.includes(member)
                      ? "bold"
                      : "normal",
                  }}
                  onClick={() => 
                    (updatedMembers.includes(member))
                    ? handleRemoveMember(member)
                    : handleSaveMember(member)}
                >
                  {member}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
              </div>
            </div>
          </Form.Label>
        </Form.Group>
      </div>
    </>
  );

}


export default CardModalTopRight;
