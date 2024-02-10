import style from "./style.module.css";
import puntosUrl from "../../assets/puntos.svg";

function Cards() {

    return (
      <>
      <div className={style.container}>
        <p className={style.text} >Mi primera tarjeta</p>
        <img src={puntosUrl} alt="" />
      </div>
      </>
    );
  }

export default Cards;