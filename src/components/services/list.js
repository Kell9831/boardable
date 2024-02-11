import { authProvider } from "../../auth";
import { URL_BASE } from "../../constants";

//Obtiene todas las listas de un tablero específico por su ID
export async function getListsByBoardId(boardId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/boards/${boardId}/lists`;
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

//Crea una nueva lista en un tablero especificado por su ID.

export async function createList(boardId, listData) {
  const token = authProvider.token;

  const url = `${URL_BASE}/boards/${boardId}/lists`;
  const options = {
    method: "POST",
    body: JSON.stringify(listData),
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

// Edita una lista específica por su ID.

export async function editList(listId, updateData) {
  const token = authProvider.token;

  const url = `${URL_BASE}/lists/${listId}`;
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

// Elimina una lista específica por su ID.
export async function deleteList(listId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/lists/${listId}`;
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
