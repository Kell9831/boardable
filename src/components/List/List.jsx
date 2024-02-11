import style from "./styles.module.css";
import puntosUrl from "../../assets/puntos.svg";
import Cards from "../Cards";
import { useEffect, useState } from "react";
import { createCard, getCardsByListId } from "../services/card";
import FormCard from "../FormCard/FormCard";
/* eslint-disable react/prop-types */

function List({ listId, title }) {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className={style.container}>
      <div className={style.text}>
        <h1>{title}</h1>
        <img src={puntosUrl} alt="" />
      </div>
      {cards.map((card, index) => (
        <Cards key={index} title={card.title} />
      ))}
      {showForm ? (
        <FormCard onSubmit={handleAddCard} onCancel={() => setShowForm(false)} />
      ) : (
        <button className={style.add} onClick={() => setShowForm(true)}>
          + Add a card
        </button>
      )}
    </div>
  );
}

export default List;
