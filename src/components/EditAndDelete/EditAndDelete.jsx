
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
    <div className={style.container} onClick={toggleMenu}>
        <div className={style.menu}>
          <p onClick={handleEdit}>Edit</p>
          <p onClick={handleDelete}>Delete</p>
        </div>
    </div>
    )}
    </>
  );
}

export default EditAndDelete;

