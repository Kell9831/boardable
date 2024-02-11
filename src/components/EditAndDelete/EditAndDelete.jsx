
/* eslint-disable react/prop-types */

import style from "./style.module.css";

function EditAndDelete({ onEdit, onDelete, isOpen, toggleMenu, selectTitleInput }) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      selectTitleInput();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
    {isOpen && (
    <div onClick={toggleMenu}>
        <div className={`${style.menu} ${style.container}`} >
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
    )}
    </>
  );
}

export default EditAndDelete;

