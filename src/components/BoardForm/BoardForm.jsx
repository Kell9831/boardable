import * as React from "react";
import styles from "./styles.module.css";
import {  Form, useNavigation, useOutletContext } from "react-router-dom";
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


  React.useEffect(() => {
    if (navigation.state === "idle" && !error) {
      setFormData(initialValues);
    }
  }, [navigation.state, error]);

  return (
    <Form 
      method="POST"
      action="/"
      className={styles.form} style={{ backgroundColor: formData.color }}>
      <label htmlFor="title">Board Title</label>
      <input
        name="title"
        className={styles.title} 
        aria-label="title"
        value={formData.title} 
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
    </Form>
  );
}

export default BoardForm;

