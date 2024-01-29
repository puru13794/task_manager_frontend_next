import Loginform from "../../../components/loginform/index";
import styles from "./styles.module.scss"

const login = () => {
  return (
    <>
      <div className={styles.headWarning}>
        <p className={styles.headdesc}>
          Due to free teir restriction and free server maintanceses render.com
          servers doesn't consistently work kindly check back in few minutes
          if server doesn't respond
        </p>
      </div>
      <Loginform />
    </>
  );
};

export default login;
