import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const CenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Twitter Vibe Check
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Getting Started</h4>
        <p>
          Simply select a filter and enter a corresponding username or hashtag
          and the tweets will appear below.
          <br />
          If you enjoy using the site please consider giving us a star on{" "}
          <a href="https://github.com/waleedrizwan/twittervibecheck"> Github⭐</a>
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CenteredModal;
