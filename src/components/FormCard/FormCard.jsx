import Button from "../Button";
import style from "./style.module.css";

function FormCard() {

    return (
      <>
      <div className={style.container}>
        <div className={style.form}>
          <label htmlFor="listTitle"  className={style.labelText} >
            <p>Card title</p></label>
          <input id="listTitle" style={style.input} />
        </div>
        <Button size="sm">Add Card</Button>
        <button>Cancel</button>
      </div>
      </>
    );
  }

export default FormCard;