import styles from "./styles.module.css";
import { authProvider } from "../../auth";
import Button from "../Button";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import logoUrl from "../../assets/vector.svg";
import flechaUrl from "../../assets/flecha.svg";

export async function action({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");
  let password = formData.get("password");

  try {
    await authProvider.createUser(username, password);
  } catch (error) {
    return {
      error: "Invalid signup attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

// export async function loader(){
//   if(authProvider === true){
//     return redirect("/login");
//   }
//   return null;
// }


function Signup(){
    
  const actionData = useActionData();
  const navigation = useNavigation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("from");

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={styles.container}>
         <img src={logoUrl} alt="" />
      <h1 className={styles.title}>Welcome to Boardable</h1>
      <Form className={styles.form} method="POST">
        {redirectTo && (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        )}
        <div className={styles["input-group"]}>
          <label htmlFor="username" className={styles.label}>
            username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="password" className={styles.label}>
            password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>
        <Button variant = "primary" size="lg"   style={{ width: '320px' }} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Signup"}
        </Button>
        {actionData?.error && (
          <p className={styles.error}>{actionData.error}</p>
        )}
      </Form>

      <Link className={styles.link} to= "/Login">Login to your account <img src={flechaUrl}/></Link>
    </div>
  );
}
export default Signup;