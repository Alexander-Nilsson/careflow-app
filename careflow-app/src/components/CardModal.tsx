import {
    Modal,
    Button,
    Form,
    Tabs,
    Tab,
    TabContainer,
    Popover,
} from "react-bootstrap";

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

const HelpPopover = (
    <Popover id="popover-positioned-right" title="Popover right">
        Här kommer det finnas en beskrivande text
    </Popover>
);

function CardModal({ show, onHide }: CardModalProps) {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <TabContainer defaultActiveKey="planera">


                <Modal.Body>
                    <Tabs id="card-tabs" justify>
                        <Tab eventKey="planera" title="Planera" />
                        <Tab eventKey="genomföra" title="Genomföra" />
                        <Tab eventKey="studera" title="Studera" />
                        <Tab eventKey="agera" title="Agera" />
                    </Tabs>
                    <Tab.Content>
                        <Tab.Pane eventKey="planera">
                            <Form>
                                <Form.Group controlId="planeraDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>

                                <Form.Group controlId="planeraTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title" />
                                </Form.Group>

                                <Form.Group controlId="planeraDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={8}
                                        placeholder="Enter description"
                                    />
                                </Form.Group>

                                <Form.Group controlId="planeraFile">
                                    <Form.Label>Upload File</Form.Label>
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
