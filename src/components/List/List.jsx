import style from "./styles.module.css";
import puntosUrl from "../../assets/puntos.svg";
import Cards from "../Cards";
import { useEffect, useRef, useState } from "react";
import { createCard, getCardsByListId } from "../services/card";
import FormCard from "../FormCard/FormCard";
import EditAndDelete from "../EditAndDelete/EditAndDelete";
import { deleteList, editList } from "../services/list";
/* eslint-disable react/prop-types */

function List({ listId, title }) {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const titleInputRef = useRef(null);

  useEffect(() => {
    async function fetchCards() {
      const fetchedCards = await getCardsByListId(listId);
      setCards(fetchedCards);
    }

    fetchCards();
  }, [listId]);

  const handleAddCard = async (cardData) => {
    try {
      await createCard(listId, cardData);
      const updatedCards = await getCardsByListId(listId);
      setCards(updatedCards);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const handleEditTitle = () => {
    setEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    try {
      await editList(listId, { title: listTitle });
      setEditingTitle(false);
    } catch (error) {
      console.error("Error editing list:", error);
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
  
  const handleDeleteList = async (e) => {
    try {
      await deleteList(listId);

      window.location.reload();
      e.preventDefault();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const selectTitleInput = () => {
    titleInputRef.current && titleInputRef.current.focus();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        {editingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleSaveTitle}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h1>{listTitle}</h1>
        )}
        <img src={puntosUrl} alt="" onClick={toggleMenu} />
        {isMenuOpen && (
          <EditAndDelete
            onEdit={handleEditTitle}
            onDelete={handleDeleteList}
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            selectTitleInput={selectTitleInput}
          />
        )}
      </div>
      {cards.map((card) => (
        <Cards key={card.id} title={card.title} cardId={card.id} />
      ))}
      {showForm ? (
        <FormCard
          onSubmit={handleAddCard}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button className={style.add} onClick={() => setShowForm(true)}>
          + Add a card
        </button>
      )}
    </div>
  );
}

export default List;
