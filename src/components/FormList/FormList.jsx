import Button from "../Button";
import style from "./style.module.css";

function FormList() {

    return (
      <>
      <div className={style.container}>
        <div className={style.form}>
          <label htmlFor="listTitle"  className={style.labelText} >
            <p>List title</p></label>
          <input id="listTitle" style={style.input} />
        </div>
        <Button size="sm">Create new list</Button>
      </div>
      </>
    );
  }

export default FormList;