
import styles from "./styles.module.css";
/* eslint-disable react/prop-types */

function Board({ board }) {

  return (
    <div className={styles.note} style={{ backgroundColor: board.color }}>
      <div>
        <p className={styles.title}>{board.title}</p>
      </div>
    </div>
  );
}

export default Board;

