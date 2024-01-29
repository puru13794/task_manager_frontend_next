import styles from "./styles.module.scss";
import Image from "next/image";

const tasks = (props) => {
  const { tasks, showModal, setShowModal, handleDelete, handleEdit } = props;
  //   console.log("tasks", tasks);
  return (
    <>
      <div className={styles.filterSection}>
        <button
          className={styles.btn}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Task
        </button>
      </div>
      <div className={styles.tasksWrapper}>
        {tasks.map((task) => {
          return (
            <div key={task.id} className={styles.taskWrapper}>
              <div className={styles.headWrapper}>
                <div className={styles.tasktitle}>{task.title}</div>
                <div className={styles.actionsWrapper}>
                  <div className={`${styles[task.status]}`}>{task.status}</div>
                  <div
                    className={styles.handlers}
                    onClick={() => {
                      handleEdit(task);
                    }}
                  >
                    <Image
                      src="/edit.png"
                      width={20}
                      height={20}
                      alt="edit-image"
                    />
                  </div>
                  <div
                    className={styles.handlers}
                    onClick={() => {
                      handleDelete(task);
                    }}
                  >
                    <Image
                      src="/delete.png"
                      width={20}
                      height={20}
                      alt="edit-image"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.taskdesc}>{task.description}</div>
            </div>
          );
        })}
        {tasks.length == 0 &&  (<p className={styles.emptyTask}>No Tasks</p>)}
      </div>
    </>
  );
};

export default tasks;
