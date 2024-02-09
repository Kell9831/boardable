import styles from "./styles.module.css";
import { Form } from "react-router-dom";
import logoUrl from "../../assets/vector.svg";
/* eslint-disable react/prop-types */

function Header() {

  return (
    <header className={styles.container}>
    <div className={styles.group}>
     <img className={styles.logo} src={logoUrl} alt="" />
      <div className={styles.message}>
        Boardable
      </div>
      </div>
      <div className={styles.form}>
      <button className={styles.button}>My Account</button>
      <Form  method="POST" action="/logout">
        <button className={styles.button}>Logout</button>
      </Form>
      </div>
    </header>
  );
}

export default Header;
