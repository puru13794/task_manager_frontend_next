import Styles from "./styles.module.scss";

const footer = () => {
  return (
    <div className={Styles.footerwrapper}>
      <p>
        MADE BY 😊{" "}
        <a href="https://puru-porfolio.vercel.app/" target="_blank">
          PURUSHOTTAM REDDY
        </a>
      </p>
    </div>
  );
};

export default footer;
