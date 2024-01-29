import styles from "./styles.module.scss";

const loader = () => {
  return <div id="spin_loader" className={styles.loading_spinner}></div>;
};

export default loader;
