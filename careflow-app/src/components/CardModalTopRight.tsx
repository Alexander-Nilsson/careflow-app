import { Button, Dropdown, Form } from "react-bootstrap";
import { getMemberName } from "../ImprovementWorkLib";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {  findUserIds,
} from "./CreateProjectModalHelp";

const projectMembersContainer = {
  width: "34%",
  marginTop: "30px",
  marginBottom: "20px",
  marginLeft: "3%",
  background: "#F4F4F4",
  padding: "20px",
  borderRadius: "10px",
};

const buttonStyle = {
  backgroundColor: "#051F6F",
  fontFamily: "Avenir",
  fontSize: "14px",
  padding: "10px 40px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

interface CardModalTopRightProps {
  project_leader: string;
  project_members: Array<string>;
  users : any [];
  usersClassArray: any[];
}


//The top right part of the modal containing the project leader and project members
function CardModalTopRight(
  {
  project_leader,
  project_members,
  users,
  usersClassArray,
}

: CardModalTopRightProps) 
{
  type MembersState = string[];
  const [selectedMembers, setSelectedMembers] = useState<MembersState>([]);
  const [userID, setUserID] = useState<string>("UserID");

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
              
              <Button
                    style={buttonStyle}
                    onClick={() => selectNewMembers("member")}
                  >
                    Lägg till medlemmar
                  </Button>
              
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
                    fontWeight: selectedMembers.includes(member)
                      ? "bold"
                      : "normal",
                  }}
                  onClick={() => selectNewMembers(member)}
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
