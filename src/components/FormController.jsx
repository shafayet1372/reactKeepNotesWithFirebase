import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  db,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "../lib/firebaseDatabase";
const defaultColor = "#2f3640";
export default function FormController({
  modalHandler,
  mode,
  editedValue,
  clearEditedValue,
}) {
  let [values, setValues] = useState({
    title: "",
    description: "",
  });
  let collections = collection(db, "reactnotes");

  useEffect(() => {
    if (mode == "update") {
      let { title, description } = editedValue;
      setValues((p) => ({ title, description }));
    }
  }, [editedValue]);

  let changeHandler = (e) => {
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  let isButtonDisbaled = () => {
    return Object.values(values).every((x) => !x.length);
  };

  let createNote = () => {
    addDoc(collections, {
      title: values.title,
      description: values.description,
      pinned: false,
      color: defaultColor,
      edited_at: new Date(),
    })
      .then((result) => console.log(result))
      .catch((e) => alert(e));
  };

  let updateNote = () => {
    let { id } = editedValue;
    let docRef = doc(db, "reactnotes", id);
    updateDoc(docRef, values)
      .then((result) => clearEditedValue())
      .catch((e) => alert(2));
  };

  let submitHandler = (e) => {
    e.preventDefault();
    modalHandler();
    if (mode == "create") {
      createNote();
      return;
    }
    updateNote();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="title"
          type="text"
          placeholder="title"
          value={values.title}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          placeholder="write here"
          onChange={changeHandler}
          value={values.description}
        />
      </Form.Group>

      <Button
        disabled={isButtonDisbaled()}
        variant={mode == "create" ? "success" : "danger"}
        type="submit"
      >
        {mode == "create" ? "create" : "update"}
      </Button>
    </Form>
  );
}
