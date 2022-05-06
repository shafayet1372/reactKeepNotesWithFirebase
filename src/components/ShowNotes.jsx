import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { db, doc, updateDoc, deleteDoc } from "../lib/firebaseDatabase";
import ModalView from "./ModalView";
import FormController from "./FormController";
import NotesView from "./NotesView";
export default function ShowNotes({ notes }) {
  let [showModal, setShowModal] = useState(false);

  let [editedValue, setEditedValue] = useState({});

  let modalHandler = () => {
    setShowModal((p) => !p);
  };

  let clearEditedValue = () => setEditedValue({});

  let setColor = (id, color) => {
    let docRef = doc(db, "reactnotes", id);
    updateDoc(docRef, { color: color })
      .then((x) => console.log(x))
      .catch((e) => alert(e));
  };
  let deleteNoteHandler = (id) => {
    let docRef = doc(db, "reactnotes", id);
    deleteDoc(docRef)
      .then((x) => console.log(x))
      .catch((e) => alert(e));
  };
  let pinnedHandler = (isPinned, id) => {
    let docRef = doc(db, "reactnotes", id);
    updateDoc(docRef, { pinned: !isPinned })
      .then((x) => console.log(x))
      .catch((e) => console.log(e));
  };

  let editHandler = (values) => {
    modalHandler();
    setEditedValue(values);
  };

  let showNotes = () => {
    let allPinnedNotes = notes.filter((x) => x.pinned);
    let allNotPinnedNotes = notes.filter((x) => !x.pinned);
    if (allPinnedNotes.length) {
      return (
        <div>
          <Row>
            <Col md={12} sm={12}>
              <h4 className="text-dark">#Pinned</h4>
            </Col>
            <NotesView
              allNotes={allPinnedNotes}
              editHandler={editHandler}
              setColor={setColor}
              pinnedHandler={pinnedHandler}
              deleteNoteHandler={deleteNoteHandler}
            />
          </Row>
          <Row>
            {allNotPinnedNotes.length ? (
              <Col md={12} sm={12}>
                <h4 className="text-dark">#Others</h4>
              </Col>
            ) : null}
            <NotesView
              allNotes={allNotPinnedNotes}
              editHandler={editHandler}
              setColor={setColor}
              pinnedHandler={pinnedHandler}
              deleteNoteHandler={deleteNoteHandler}
            />
          </Row>
        </div>
      );
    }
    return (
      <Row>
        <NotesView
          allNotes={notes}
          editHandler={editHandler}
          setColor={setColor}
          pinnedHandler={pinnedHandler}
          deleteNoteHandler={deleteNoteHandler}
        />
      </Row>
    );
  };
  return (
    <div>
      {showNotes()}
      <ModalView
        show={showModal}
        modalHandler={modalHandler}
        title="update note"
      >
        <FormController
          mode="update"
          editedValue={editedValue}
          modalHandler={modalHandler}
          clearEditedValue={clearEditedValue}
        />
      </ModalView>
    </div>
  );
}
