import styles from "./styles.module.css";
import { Form, Link } from "react-router-dom";
import logoUrl from "../../assets/vector.svg";
import { useState } from "react";

/* eslint-disable react/prop-types */

function Header() {
  const [activeButton, setActiveButton] = useState("");
 
  const handleButtonClick = async(buttonName) => {
    setActiveButton(buttonName);
  }

  return (
    <header className={styles.container}>
      <div className={styles.group}>
        <img className={styles.logo} src={logoUrl} alt="" />
        <div className={styles.message}>Boardable</div>
      </div>
      <div className={styles.form}>
        <Link
          to="/account"
          className={`${styles.button} ${
            activeButton === "account" ? styles.buttonSelect : ""
          }`}
          onClick={() => handleButtonClick("account")}
        >
          My Account
        </Link>
        <Form method="POST" action="/logout">
          <button className={styles.button}>Logout</button>
        </Form>
      </div>
    </header>
  );
}

export default Header;
