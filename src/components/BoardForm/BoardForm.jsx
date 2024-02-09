import * as React from "react";
import styles from "./styles.module.css";
import { createBoard } from "../../components/services/board";
import {  useNavigation, useOutletContext } from "react-router-dom";
import ColorPicker from "../ColorPicker.jsx/ColorPicker";
import Button from "../Button";

const initialValues = {
  title: "",
  color: "#FFFFFF",
};

function BoardForm() {
  const [formData, setFormData] = React.useState(initialValues);
  const navigation = useNavigation();
  const error = useOutletContext();
  const isSubmitting = Boolean(navigation.formMethod);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createBoard(formData);
      navigation.navigate("/");
    } catch (error) {
      console.error("Error creating board:", error);
    }
  }

  React.useEffect(() => {
    if (navigation.state === "idle" && !error) {
      setFormData(initialValues);
    }
  }, [navigation.state, error]);

  return (
    <form onSubmit={handleSubmit} className={styles.form} style={{ backgroundColor: formData.color }}>
      <label htmlFor="title">Board Title</label>
      <input
        name="title"
        className={styles.title} // Cambié el nombre de la clase de body a title
        aria-label="title"
        value={formData.title} // Cambié body por title
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <div className={styles.footer}>
        <ColorPicker name="color" onChange={handleChange} />
        <Button size="sm" variant="primary" type="submit" disabled={isSubmitting} style={{ marginLeft: "auto" }}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default BoardForm;
