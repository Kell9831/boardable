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

export async function getUserMe() {
  const token = authProvider.token;

  const url = `${URL_BASE}/me`;
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

export async function updateUserProfile(data) {
  const token = authProvider.token;

  const url = `${URL_BASE}/me`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  } else {
    const body = await response.json();
    throw new Error(body.error);
  }
}

export async function deleteUserProfile() {
  const token = authProvider.token;

  const url = `${URL_BASE}/me`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return true;
  } else {
    const body = await response.json();
    throw new Error(body.error);
  }
}
