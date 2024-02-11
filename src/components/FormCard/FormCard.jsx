import { useState } from "react";
import Button from "../Button";
import style from "./styles.module.css";
/* eslint-disable react/prop-types */

function FormCard({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title });
  };

    return (
      <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div className={style.form}>
          <label htmlFor="cardTitle" className={style.labelText}>
            <p>Card title</p>
          </label>
          <input
            id="cardTitle"
            style={style.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button size="sm" type="submit">
          Add Card
        </Button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
    );
  }

export default FormCard;