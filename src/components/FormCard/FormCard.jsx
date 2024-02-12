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
            <p className={style.title}>Card title</p>
          </label>
          <input
            id="cardTitle"
            style={style.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={style.buttons}>
        <Button size="sm" type="submit">
          Add Card
        </Button>
        <Button 
          size="sm"
          variant= "secondary"  
          type="button" 
          onClick={onCancel}>
          Cancel
        </Button>
        </div>
      </form>
    </div>
    );
  }

export default FormCard;