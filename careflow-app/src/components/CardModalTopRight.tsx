import { Button, Form } from "react-bootstrap";
import { getMemberName } from "../ImprovementWorkLib";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
}

function AddNewMembers() {
  const [inputFields, setInputFields] = useState([{ name: ''}]);

  return (<><form>
    {inputFields.map((input, index) => {
      return (
        <div key={index}>
          <input
            name='name'
            placeholder='Name'
          />
        </div>
      )
    })}
  </form></>);

};

//The top right part of the modal containing the project leader and project members
function CardModalTopRight({
  project_leader,
  project_members,
}: CardModalTopRightProps) {
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
              <div>
              <Button
                    style={buttonStyle}
                    onClick={() => AddNewMembers}
                  >
                    Lägg till medlemmar
                  </Button>
              </div>
            </div>
          </Form.Label>
        </Form.Group>
      </div>
    </>
  );
}

export default CardModalTopRight;
