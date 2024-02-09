import { redirect } from "react-router-dom";
import { authProvider } from "../../auth";
import { URL_BASE } from "../../constants";

export async function getUser() {
  const token = authProvider.token;

  const url = `${URL_BASE}/user`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}
