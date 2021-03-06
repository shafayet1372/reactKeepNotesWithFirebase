import React from "react";
import { Col } from "react-bootstrap";
import SingleCard from "./Card";
import style from "../css/style.module.css";
export default function NotesView({
  allNotes,
  deleteNoteHandler,
  setColor,
  pinnedHandler,
  editHandler,
}) {
  return allNotes.map((x) => (
    <Col
      key={x.id}
      md={6}
      lg={6}
      xl={4}
      sm={6}
      className={`my-2 d-flex justify-content-center ${style.col_fix}`}
    >
      <SingleCard
        deleteNoteHandler={deleteNoteHandler}
        values={x}
        setColor={setColor}
        pinnedHandler={pinnedHandler}
        editHandler={editHandler}
      />
    </Col>
  ));
}
