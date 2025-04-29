import React from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

interface ShareModalProps {
  show: boolean;
  onClose: () => void;
  url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ show, onClose, url }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Blog URL copied to clipboard!");
        onClose();
      })
      .catch(() => alert("Failed to copy URL."));
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share this Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl value={url} readOnly />
          <Button variant="primary" onClick={handleCopy}>Copy Link</Button>
        </InputGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
