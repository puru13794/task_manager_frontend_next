import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const confirmation = (props) => {
  const { task, show, setShow } = props;

  return (
    <Modal show={show} onHide={setShow}>
      <Modal.Header closeButton>
        <Modal.Title style={{"font-size": "15px"}}>Are you sure you want to delete task? </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.buttonsWrapper}>
          <button
            className={styles.left}
            onClick={() => {
              props.deleteTask(task);
            }}
          >
            Yes
          </button>
          <button
            className={styles.right}
            onClick={() => {
              setShow(false);
            }}
          >
            No
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default confirmation;
