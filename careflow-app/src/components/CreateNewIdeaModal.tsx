import React, { useState } from "react";
import { FormControl, Container, Button, Modal } from "react-bootstrap";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoType } from "./Start";
import HelpPopover from "./HelpPopover";
import rightArrow from "../Images/right-arrow.png";

type IdeasSectionProps = {
  userInfo: UserInfoType;
};

function IdeasSection({ userInfo }: IdeasSectionProps) {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // ... (your existing code)

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div style={ideasSectionStyle}>
      <div className="d-flex">
        <h1
          className="mt-2 ml-2 flex-grow-1"
          style={titleStyle}
          onClick={handleModalOpen} // Open the modal on title click
        >
          Förslagslåda
        </h1>
        {/* ... (rest of your existing code) */}
      </div>

      {/* ... (rest of your existing code) */}

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Content for your modal */}
          <p>This is your modal content.</p>
          {/* ... (additional content) */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {/* Additional modal footer buttons if needed */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IdeasSection;
