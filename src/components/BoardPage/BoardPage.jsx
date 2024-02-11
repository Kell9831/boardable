/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import puntosUrl from "../../assets/puntos.svg";
import EditAndDelete from "../EditAndDelete/EditAndDelete";
import { deleteBoard, editBoard, getBoardById } from "../services/board";
import List from "../List/List";
import FormList from "../FormList";
import { createList, getListsByBoardId } from "../services/list";

function BoardPage() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const titleInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBoardData() {
      try {
        const data = await getBoardById(boardId);
        setBoardData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchBoardData();
  }, [boardId]);

  useEffect(() => {
    async function fetchLists() {
      try {
        const fetchedLists = await getListsByBoardId(boardId);
        setLists(fetchedLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    }

    fetchLists();
  }, [boardId]);



  const handleCreateList = async (listTitle) => {
    try {
      await createList(boardId, { title: listTitle });

    } catch (error) {
      console.error("Error creating list:", error);
    }
  };


  const handleEditTitle = () => {
    setEditingTitle(true);
  };

  const selectTitleInput = () => {
    titleInputRef.current && titleInputRef.current.focus();
  };

  const handleTitleChange = (e) => {
    setBoardData({ ...boardData, title: e.target.value });
  };

  const handleSaveTitle = async () => {
    try {
      await editBoard(boardId, { title: boardData.title });
      setEditingTitle(false);
    } catch (error) {
      console.error("Error editing title:", error);
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

  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(boardId);
      // Redireccionar después de eliminar
      return navigate("/");
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: boardData.color }}
    >
      <div className={styles.title}>
        {editingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={boardData.title}
            onChange={handleTitleChange}
            onBlur={handleSaveTitle}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <p>{boardData.title}</p>
            <img src={puntosUrl} alt="" onClick={toggleMenu} />
          </>
        )}
        <EditAndDelete
          onEdit={handleEditTitle}
          onDelete={handleDeleteBoard}
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          selectTitleInput={selectTitleInput}
        />
      </div>
      <div className={styles.listas}>
        {lists.map((list) => (
          <List key={list.id} title={list.title} listId={list.id}/>
        ))}
        <FormList onCreateList={handleCreateList} boardId={boardId} />
      </div>
    </div>
  );
}

export default BoardPage;
