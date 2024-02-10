import style from "./styles.module.css";
import puntosUrl from "../../assets/puntos.svg";
import Cards from "../Cards";

function List() {

    return (
      <>
      <div className={style.container}>
        <div className={style.text}>
        <h1 >To Do</h1>
        <img src={puntosUrl} alt="" />
        </div>
        <Cards/>
        <button className={style.add}>+ Add a card</button>
      </div>
      </>
    );
  }

export default List;