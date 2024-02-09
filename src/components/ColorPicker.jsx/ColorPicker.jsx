import * as React from "react";
import eclipseUrl from "../../assets/eclipse.svg";
import styles from "./styles.module.css";
/* eslint-disable react/prop-types */
const colors = [
  "#FFFFFF",
  "#F28B82",
  "#FBBC04",
  "#FFF475",
  "#CCFF90",
  "#A7FFEB",
  "#CBF0F8",
  "#AECBFA",
  "#D7AEFB",
  "#FDCFE8",
];

function ColorPicker({ name, onChange }) {
  const [showColors, setShowColors] = React.useState(false);

  function handleClick(event) {
    setShowColors(false);
    onChange(event);
  }

  return (
    <div className={styles.wrapper}>
      {showColors && (
        <div className={styles.colors}>
          {colors.map((color) => (
            <input
              key={color}
              type="button"
              className={styles.color}
              style={{ backgroundColor: color }}
              name={name}
              value={color}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
      <button
        className={styles["action-button"]}
        type="button"
        onClick={() => setShowColors(!showColors)}
        aria-label={name}
      >
        <img src={eclipseUrl} />
      </button>
    </div>
  );
}

export default ColorPicker;