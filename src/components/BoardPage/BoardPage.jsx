
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import puntosUrl from "../../assets/puntos.svg";
import EditAndDelete from "../EditAndDelete/EditAndDelete";
import { deleteNote, editNote, getBoardById } from "../services/board";
import List from "../List/List";
import FormList from "../FormList";

function BoardPage() {
    const { boardId } = useParams();
    const [boardData, setBoardData] = useState(null);
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
        await editNote(boardId, { title: boardData.title });
        setEditingTitle(false);
      } catch (error) {
        console.error('Error editing title:', error);
      }
    };
  
    const handleDeleteBoard = async () => {
      try {
        await deleteNote(boardId);
        // Redireccionar después de eliminar
        return navigate("/");
      } catch (error) {
        console.error('Error deleting board:', error);
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
      <div className={styles.container} style={{ backgroundColor: boardData.color }}>
        <div className={styles.title}>
          {editingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={boardData.title}
              onChange={handleTitleChange}
              onBlur={handleSaveTitle}
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
         <List/>
         <FormList/>
        </div>
      </div>
    );
}

export default BoardPage;