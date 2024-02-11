import style from "./style.module.css";
import puntosUrl from "../../assets/puntos.svg";
import { useRef, useState } from "react";
import EditAndDelete from "../EditAndDelete/EditAndDelete";
import { deleteCard, editCard } from "../services/card";
/* eslint-disable react/prop-types */

function Cards({ title, cardId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const titleInputRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditTitle = () => {
    setEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    try {
      await editCard(cardId, { title: newTitle });
      setEditingTitle(false);
    } catch (error) {
      console.error("Error editando la tarjeta:", error);
    }
  };


  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      try {
        await handleSaveTitle();
      } catch (error) {
        console.error("Error al guardar el título:", error);
      }
    }
  };

  const handleDeleteCard = async (e) => {
    try {
      await deleteCard(cardId);
      window.location.reload();
      e.preventDefault();
    } catch (error) {
      console.error("Error eliminando la tarjeta:", error);
    }
  };

  const selectTitleInput = () => {
    titleInputRef.current && titleInputRef.current.focus();
  };

  return (
    <>
      <div className={style.container}>
        {editingTitle ? (
          <input
            ref={titleInputRef}
            className={style.input}
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleSaveTitle}
            onKeyDown={handleKeyDown}
            
          />
        ) : (
          <p className={style.text}>{newTitle}</p>
        )}
        <img src={puntosUrl} alt="" onClick={toggleMenu} />
      </div>
      {isMenuOpen && (
        <EditAndDelete
          onEdit={handleEditTitle}
          onDelete={handleDeleteCard}
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          selectTitleInput={selectTitleInput}
        />
      )}
    </>
  );
}

export default Cards;
