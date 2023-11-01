import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProjectButton from "./CreateProjectButton";
import CreateProjectModal from "./CreateProjectModal";
import ContinueButton from "./ContinueButton";

function CreateNewProject() {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  return (
    <div>
      <CreateProjectButton onClick={modalShow} />
      <ContinueButton onClick={modalShow}/>
      <CreateProjectModal show={show} onHide={modalClose} />
       
    </div>
  );
}

export default CreateNewProject;
