import React from "react";
import SingleColors from "./SingleColors";
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete, AiOutlineEdit, VscPinned } from "../lib/icon";
import defaultColors from "../lib/colors";
import style from "../css/style.module.css";

export default function Index({
  values,
  setColor,
  deleteNoteHandler,
  pinnedHandler,
  editHandler,
}) {
  let getColorsAndId = (id, colors) => {
    setColor(id, colors);
  };

  return (
    <Card className={`${style.card}  text-white`}>
      <Card.Body style={{ backgroundColor: values.color }}>
        <Card.Title>{values.title}</Card.Title>
        <Card.Text>{values.description}</Card.Text>
      </Card.Body>
      <div className="d-flex  justify-content-between mx-2">
        <div className="d-flex my-2">
          {defaultColors.map((x) => {
            return (
              <SingleColors
                key={uuidv4()}
                color={x}
                id={values.id}
                getColorsAndId={getColorsAndId}
                setBorder={values.color == x}
              />
            );
          })}
        </div>

        <div className="d-flex align-items-start">
          <VscPinned
            className={`${style.pin_icon} p-0 ${
              values.pinned && style.pinned_icon
            }`}
            onClick={() => pinnedHandler(values.pinned, values.id)}
          />
        </div>
      </div>
      <div className="d-flex mx-2 text-white justify-content-between">
        <div>
          <AiOutlineEdit
            className={style.icon}
            onClick={() => editHandler(values)}
          />
          <AiFillDelete
            className={style.icon}
            onClick={() => deleteNoteHandler(values.id)}
          />
        </div>
        <div>
          <small>
            edited at{" "}
            {new Date(values.edited_at.seconds * 1000).toLocaleTimeString()}
          </small>
        </div>
      </div>
      {/* <div className=" d-flex justify-content-between text-dark">
    <small>edited at 2:23:2 pm</small>
  </div> */}
    </Card>
  );
}
