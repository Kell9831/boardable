import styles from "./styles.module.css";
import { authProvider } from "../../auth";
import Button from "../Button";

import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteUserProfile, getUserMe, updateUserProfile } from "../services/user";

export async function action({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");
  let password = formData.get("password");

  try {
    await authProvider.login(username, password);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

function Account() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("from");

  const [userData, setUserData] = useState(null);
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUserMe(); 
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []); 

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedUserData = {
        username: userData.username,
      name: event.target.name.value,
      email: event.target.email.value, 
      password: event.target.password.value 
      };
      await updateUserProfile(updatedUserData);
      alert("User profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);

    }
  };
 
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account?")) {
        await deleteUserProfile();
       return navigate("/login");
      }
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Account</h1>
      <Form className={styles.form} method="POST" onSubmit={handleUpdate} >
        {redirectTo && (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        )}
        <div className={styles["input-group"]}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="testino"
            name="username"
            value={userData ? userData.username : ''}
            required
            className={styles.input}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={userData ? userData.name : ''}
            required
            className={styles.input}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={userData ? userData.email : ''}
            className={styles.input}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="password" className={styles.label}>
            Password
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
          {isSubmitting ? "Update..." : "Update"}
        </Button>
        {actionData?.error && (
          <p className={styles.error}>{actionData.error}</p>
        )}
        <button onClick={handleDelete} className={styles.button} >Delete my account </button>
      </Form>

      
    </div>
  );
}

export default Account;