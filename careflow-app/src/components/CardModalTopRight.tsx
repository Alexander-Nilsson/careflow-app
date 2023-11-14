import { Form } from "react-bootstrap";

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
}

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
              <b>Förbättringsledare</b>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                {project_leader}
              </div>
              <b>Förbättringsmedlemmar</b>
              {project_members.map((member, index) => (
                <div style={{ marginTop: "10px" }}>{member}</div>
              ))}
            </div>
          </Form.Label>
        </Form.Group>
      </div>
    </>
  );
}

export default CardModalTopRight;
