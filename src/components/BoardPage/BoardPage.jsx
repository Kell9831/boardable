import styles from "./styles.module.css";
import puntosUrl from "../../assets/puntos.svg";
import List from "../List";
import FormList from "../FormList";
/* eslint-disable react/prop-types */
function BoardPage(){
    return(
        <div className={styles.container} >
            <div className={styles.title}>
                <p>my board</p>
                <img src={puntosUrl} alt="" />
            </div>
            <div className={styles.listas}>
                <List/>
                <FormList/>
            </div>
        </div>
    )

}

export default BoardPage;