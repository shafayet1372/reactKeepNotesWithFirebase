import React, { useState } from "react";
import ModalView from "./ModalView";
import FormController from "./FormController";
import { AiFillPlusCircle } from "../lib/icon";
import style from "../css/style.module.css";
export default function CreateNote() {
  let [showModal, setShowModal] = useState(false);

  let modalHandler = () => {
    setShowModal((p) => !p);
  };

  return (
    <div>
      <AiFillPlusCircle className={style.create_icon} onClick={modalHandler} />
      <ModalView
        show={showModal}
        modalHandler={modalHandler}
        title="create notes"
      >
        <FormController mode="create" modalHandler={modalHandler} />
      </ModalView>
    </div>
  );
}
