import Header from "../../components/Header";
import styles from "./styles.module.css";
import { createBoard, getBoards } from "../../components/services/board";
import { authProvider } from "../../auth";
import {
  Outlet,
  redirect,
  useActionData,
} from "react-router-dom";
import { getUser } from "../../components/services/user";

export async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const [username, boards] = await Promise.all([getUser(), getBoards()]);
  
  return { username, boards };
}

export async function action({ request }) {
  let formData = await request.formData();
  const boardData = Object.fromEntries(formData.entries());
  try {
    await createBoard(boardData);
    return redirect("/");
  } catch (error) {
    return { error: error.message };
  }
}

function App() {
  const actionData = useActionData();

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet context={actionData?.error} />
      </main>
    </div>
  );
}

export default App;
