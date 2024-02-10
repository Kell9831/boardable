import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';
import styles from './styles.module.css';
/* eslint-disable react/prop-types */
function BoardList({ boards }) {
  if (boards.length === 0) {
    return <p className={styles.empty}>No boards</p>;
  }

  return (
    <div className={styles.container}>
      <BoardForm />
      {boards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
}

export default BoardList;