import { useState } from "react";
import styles from "./styles.module.scss";

const login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    isSubmitEnabled: false,
  });

  const handleEmailChange = (e) => {
    // console
    const newEmail = e.target.value;
    setData({ ...data, email: newEmail});
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setData({ ...data, password: newPassword });
  };

//   const updateSubmitButtonState = (isValidEmail, password) => {
//     setData(data.isValidEmail && data.password.length > 0);
//   };

  const handleSubmit = () => {
    const isValid = /\S+@\S+\.\S+/.test(data.email);
    
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginWrapper}>
        <h2>Login</h2>
        <div className={styles.inputWrapper}>
          <label>Email:</label>
          <input
            type="email"
            value={data.email}
            onChange={handleEmailChange}
            className={!data.isValidEmail ? styles.invalidInput : ""}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>Password:</label>
          <input
            type="password"
            value={data.password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleSubmit} disabled={!data.isSubmitEnabled}>
          Submit
        </button>
        <div className={styles.signupLink}>
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;
