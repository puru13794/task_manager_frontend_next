import styles from "./styles.module.scss";

const tasks = (props) => {
  const { tasks } = props;
  console.log("tasks", tasks);
  return (
    <div className={styles.tasksWrapper}>
      {tasks.map((task) => {
        return (
          <div key={task.id} className={styles.taskWrapper}>
            <div className={styles.headWrapper}>
            <div className={styles.tasktitle}>{task.title}</div>
            <div className={`${styles[task.status]}`}>{task.status}</div>
            </div>
            <div className={styles.taskdesc}>{task.description}</div>
            
          </div>
        );
      })}
    </div>
  );
};

export default tasks;
