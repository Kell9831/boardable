
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
/* eslint-disable react/prop-types */

function Board({ board }) {
  return (
    <Link to={`/boards/${board.id}`} className={styles.link}>
      <div className={styles.note} style={{ backgroundColor: board.color }}>
        <div>
          <p className={styles.title}>{board.title}</p>
        </div>
      </div>
    </Link>
  );
}
export default Board;

