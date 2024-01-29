import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { setAuthToken } from "../../utils/authUtils";
// import { toast } from "react-toastify";
import toast from 'react-hot-toast';
import Loader from "../../components/loader";

const loginform = ({ login = true }) => {
  //   const { login } = props;
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    ispasswordValid: true,
  });
  const [loader, setLoader] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setData({ ...data, email: newEmail });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setData({ ...data, password: newPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(data.email);
    const ispasswordValid = data.password.length > 0;
    setData({
      ...data,
      isValidEmail: isValid,
      ispasswordValid: ispasswordValid,
    });
    if (data.ispasswordValid && data.isValidEmail) {
      setLoader(true);
      const userData = {
        email: data.email,
        password: data.password,
      };
      if (!login) {
        axios
          .post(`${process.env.base_url}/users`, {
            user: { ...userData },
          })
          .then((response) => {
            // console.log("response", response);
            if (response.status === 200 && response.data.data?.code == 200) {
              router.push("/login");
              //TODO:  flash a toater with response message
              toast.success("sign up sucess");
            } else {
              toast.error("sign up failed");
              console.log("sign up failed");
            }
          })
          .catch((error) => {
            toast.error(error.response.data);
          })
          .finally(() => {
            setLoader(false);
          });
      } else {
        axios
          .post(`${process.env.base_url}/users/sign_in`, {
            user: { ...userData },
          })
          .then((response) => {
            // console.log("response", response);
            if (response.status === 200 && response.data?.data.code == 200) {
              // console.log('token', response.headers.authorization)
              setAuthToken(response.headers.authorization, "auth_token");
              router.push("/dashboard");
              // toast.success('login success')
            } else {
              console.log("sign in failed");
              toast.error("sign in failed");
            }
          })
          .catch((error) => {
            toast.error(error.response.data);
          })
          .finally(() => {
            setLoader(false);
          });
      }
    } else {
      console.log("toaster");
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginWrapper}>
        <h2 className={styles.login}>{login ? "Login" : "SignUp"}</h2>
        <div className={styles.inputWrapper}>
          <label for="email">Email</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleEmailChange}
            className={!data.isValidEmail ? styles.invalidInput : ""}
            ref={emailInputRef}
            placeholder="Enter your Email"
          />
          {!data.isValidEmail && (
            <p className={styles.error}>Provide a valid email</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handlePasswordChange}
            className={!data.ispasswordValid ? styles.invalidInput : ""}
            placeholder="Enter your Password"
          />
          {!data.ispasswordValid && (
            <p className={styles.error}>Provide a valid password</p>
          )}
        </div>
        <button  onClick={handleSubmit}>
          {login ? "Login" : "SignUp"}
          {loader && <Loader />}
        </button>
        {login && (
          <div className={styles.signupLink}>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        )}
        {!login && (
          <div className={styles.signupLink}>
            <p>
              Have an account? <a href="/login">Log in</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default loginform;
