import { authProvider } from "../../auth";
import { URL_BASE } from "../../constants";

export async function getCardsByListId(listId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/lists/${listId}/cards`;
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
    throw new Error("Unauthorized");
  }

  const body = await response.json();
  throw new Error(body.error);
}

export async function createCard(listId, cardData) {
  const token = authProvider.token;

  const url = `${URL_BASE}/lists/${listId}/cards`;
  const options = {
    method: "POST",
    body: JSON.stringify(cardData),
    headers: {
      "Content-Type": "application/json",
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
    throw new Error("Unauthorized");
  }

  const body = await response.json();
  throw new Error(body.error);
}

export async function editCard(cardId, updateData) {
  const token = authProvider.token;

  const url = `${URL_BASE}/cards/${cardId}`;
  const options = {
    method: "PATCH",
    body: JSON.stringify(updateData),
    headers: {
      "Content-Type": "application/json",
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
    throw new Error("Unauthorized");
  }

  const body = await response.json();
  throw new Error(body.error);
}

export async function deleteCard(cardId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/cards/${cardId}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.ok;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw new Error("Unauthorized");
  }

  const body = await response.json();
  throw new Error(body.error);
}
