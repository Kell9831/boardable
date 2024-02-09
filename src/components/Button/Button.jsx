import clsx from "clsx";
import s from "./Button.module.css";
/* eslint-disable react/prop-types */

function Button({ size = "md", variant = "primary", children, ...delegated }) {
  const classNames = clsx(s.button, s[variant], s[size]);

  return (
    <button className={classNames} {...delegated}>
      {children}
    </button>
  );
}

export default Button;
