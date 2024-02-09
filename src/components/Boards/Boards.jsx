// Boards.jsx

import styles from "./styles.module.css";
import BoardList from "../BoardList/BoardList";
import { getBoards } from "../services/board";
import { useEffect, useState } from "react";

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const boardsData = await getBoards();
        setBoards(boardsData);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    }

    fetchBoards();
  }, []);

  return (
   <div >
      <div className={styles.select}>
        <p>My Boards</p>
        <div className={styles.formfield}>
        <label>Sort by</label>
        <select className={styles.selec}>
          <option value="createdDate">Created date</option>
          <option value="name">Name</option>
          <option value="updatedAt">Last updated</option>
        </select></div>
        </div>

        <BoardList boards={boards} />
   </div>
  );
}

export default Boards;
