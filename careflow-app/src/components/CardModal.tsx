import {
  Modal,
  Button,
  Form,
  Tabs,
  Tab,
  TabContainer,
  Popover,
} from "react-bootstrap";

import {
  Calendar,
  Folder2Open,
  GeoAltFill,
  Circle,
  CheckCircle,
} from "react-bootstrap-icons";

interface CardModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  content: string;
}

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

function CardModal({ show, onHide, title, content }: CardModalProps) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <TabContainer defaultActiveKey="genomföra">
        <Modal.Body
          style={{
            paddingLeft: "30px",
            paddingRight: "30px",
            fontFamily: "Avenir",
          }}
        >
          <Tabs id="card-tabs" justify>
            <Tab
              eventKey="planera"
              title={
                <span style={FlexAndCenter}>
                  <CheckCircle
                    style={{
                      marginLeft: "35px",
                      marginRight: "10px",
                    }}
                  />
                  Planera
                </span>
              }
            />
            <Tab
              eventKey="genomföra"
              title={
                <span style={FlexAndCenter}>
                  <CheckCircle
                    style={{
                      marginLeft: "20px",
                      marginRight: "10px",
                    }}
                  />
                  Genomföra
                </span>
              }
            />
            <Tab
              eventKey="studera"
              title={
                <span style={FlexAndCenter}>
                  <Circle
                    style={{
                      marginLeft: "30px",
                      marginRight: "10px",
                    }}
                  />
                  Studera
                </span>
              }
            />
            <Tab
              eventKey="agera"
              title={
                <span style={FlexAndCenter}>
                  <Circle
                    style={{
                      marginLeft: "40px",
                      marginRight: "10px",
                    }}
                  />
                  Agera
                </span>
              }
            />
          </Tabs>

          <Modal.Title style={{ marginTop: "30px" }}>{title}</Modal.Title>
          <div
            style={{
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            Här ska det ligga taggar sen
          </div>
          <div style={{ marginBottom: "50px" }}>
            <div style={FlexAndCenter}>
              <Calendar style={IconStyle} />
              <div>
                <label>Startdatum</label>
              </div>
            </div>
            <div style={FlexAndCenter}>
              <Folder2Open style={IconStyle} />
              <div>
                <label>Avdelning</label>
              </div>
            </div>
            <div style={FlexAndCenter}>
              <GeoAltFill style={IconStyle} />
              <div>
                <label>Sjukhus</label>
              </div>
            </div>
          </div>
          <Form.Group controlId="planeraDescription" style={FormGroupStyle}>
            <Form.Label>
              <b>Beskrivning</b>
            </Form.Label>
            <div>{content}</div>
          </Form.Group>

          <Tab.Content>
            <Tab.Pane eventKey="planera">
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
            </Tab.Pane>

            <Tab.Pane eventKey="genomföra">
              <Form>
                <Form.Group controlId="genomforaCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select">
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="genomforaType">
                  <Form.Label>Type</Form.Label>
                  {["radio1", "radio2", "radio3"].map((type) => (
                    <Form.Check
                      type="radio"
                      label={type}
                      name="type"
                      id={`type-${type}`}
                    />
                  ))}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Tab.Pane>

            <Tab.Pane eventKey="studera">
              <Form>{/* content for "Studera" tab */}</Form>
            </Tab.Pane>

            <Tab.Pane eventKey="agera">
              <Form>
                <Form.Group controlId="studeraOptions">
                  <Form.Label>Options</Form.Label>
                  {["option1", "option2", "option3"].map((option) => (
                    <Form.Check
                      type="checkbox"
                      label={option}
                      id={`option-${option}`}
                    />
                  ))}
                </Form.Group>

                <Form.Group controlId="studeraFile">
                  <Form.Label>Upload File</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHide} style={ButtonStyle}>
            Spara
          </Button>
        </Modal.Footer>
      </TabContainer>
    </Modal>
  );
}

export default CardModal;
