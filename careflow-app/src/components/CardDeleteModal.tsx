import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImprovementWork, deleteProject } from '../ImprovementWorkLib';

interface CardDeleteModalProps {
  show: boolean;
  onHide: () => void;
  impWorkId: string;
}

function CardDeleteModal({ show, onHide, impWorkId }: CardDeleteModalProps) {
  const handleDeleteClick = () => {
    //deleteProject(impWorkId);
    onHide(); // Close the modal after deleting
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClick}>
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardDeleteModal;
