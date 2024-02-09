import s from "./error.module.css";

function Error() {
  return (
    <div className={s.wrapper}>
      <h1>Error page</h1>
      <p>404 Not found</p>
    </div>
  );
}

export default Error;
