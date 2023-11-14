import { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";

const saveFileButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
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

const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

//The section of the modal where the user uploads files
function CardModalFiles({}) {
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleShowFileModal = () => {
    setShowFileModal(true);
  };
  const handleCloseFileModal = () => {
    setShowFileModal(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSaveFile = (event: FormEvent) => {
    handleCloseFileModal();
    event.preventDefault();
    if (selectedFile) {
      // You can handle the file upload here
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Bilagor</b>
        </Form.Label>
        <div style={whiteContainerStyle}>
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
            onClick={handleShowFileModal}
          >
            <div style={flexAndCenter}>
              <PlusLg style={{ marginRight: "9px" }} />
              <div>Ladda upp bilaga</div>
            </div>
          </Button>
        </div>
      </Form.Group>

      <Modal
        show={showFileModal}
        onHide={handleCloseFileModal}
        style={{ top: "25%", fontFamily: "Avenir" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form style={{ width: "90%" }}>
            <div className="mb-3 text-center">
              <input
                type="file"
                className="form-control"
                id="fileInput"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3 text-center">
              <input
                type="text"
                className="form-control"
                placeholder="Lägg till en beskrivande mening..."
                style={{ fontStyle: "italic" }}
              ></input>
            </div>
            <div className="mb-3 text-center">
              <Button style={saveFileButtonStyle} onClick={handleSaveFile}>
                Ladda upp bilaga
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModalFiles;
