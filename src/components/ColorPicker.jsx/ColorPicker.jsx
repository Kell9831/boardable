import * as React from "react";
import eclipseUrl from "../../assets/eclipse.svg";
import styles from "./styles.module.css";
/* eslint-disable react/prop-types */
const colors = [
  "#E2E8F0",
  "#FECACA",
  "#FED7AA",
  "#FEF08A",
  "#D9F99D",
  "#BFDBFE",
  "#FBCFE8",
  "#DDD6FE",
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