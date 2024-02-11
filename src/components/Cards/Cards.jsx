import style from "./style.module.css";
import puntosUrl from "../../assets/puntos.svg";
/* eslint-disable react/prop-types */

function Cards({title}) {
  console.log("title" + title); 
    return (
      <>
      <div className={style.container}>
        <p className={style.text} >{title}</p>
        <img src={puntosUrl} alt="" />
      </div>
      </>
    );
  }

export default Cards;