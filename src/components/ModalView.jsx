import React from "react";
import { Modal } from "react-bootstrap";
export default function ModalView({ show, modalHandler, children, title }) {
  return (
    <Modal show={show} onHide={modalHandler}>
      <Modal.Header closeButton className="border-0"></Modal.Header>
      <div className="text-center">
        <h3>{title}</h3>
      </div>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
