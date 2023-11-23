import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProject } from "../ImprovementWorkLib";

interface CardDeleteModalProps {
  show: boolean;
  onHide: () => void;
  impWorkId: string;
}

function CardDeleteModal({ show, onHide, impWorkId }: CardDeleteModalProps) {
  const handleDeleteClick = () => {
    deleteProject(impWorkId);
    onHide(); // Close the modal after deleting
    console.log("pressed delete in modal");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Radera förbättringsarbetet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Är du säker att du vill radera förbättringsarbetet?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClick}>
          Radera
        </Button>
        <Button variant="primary" onClick={onHide}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardDeleteModal;
