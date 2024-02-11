import Button from "../Button";
import style from "./style.module.css";
import { useState } from "react";
import { createList } from "../services/list";
/* eslint-disable react/prop-types */

function FormList({ onCreateList ,boardId }) {
  const [listTitle, setListTitle] = useState("");

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
  

    try {
      await createList(boardId, { title: listTitle });
      setListTitle("");
      onCreateList();
      window.location.reload();
      e.preventDefault();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <>
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.form}>
          <label htmlFor="listTitle" className={style.labelText}>
            <p>List title</p>
          </label>
          <input
            id="listTitle"
            style={style.input}
            value={listTitle}
            onChange={handleTitleChange}
          />
        </div>
        <Button size="sm" type="submit">Create new list</Button> 
      </form>
    </>
  );
}

export default FormList;
