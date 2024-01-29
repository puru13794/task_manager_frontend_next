import Loginform from "../../../components/loginform/index";
import styles from "./styles.module.scss";

const login = () => {
  return (
    <>
      <div className={styles.headWarning}>
        <p className={styles.headdesc}>
          Due to free tier restrictions and periodic server maintenance on
          Render.com, our servers may experience intermittent downtime. Please
          check back in a few minutes if you encounter any issues with server
          responsiveness.
        </p>
      </div>
      <Loginform />
    </>
  );
};

export default login;
