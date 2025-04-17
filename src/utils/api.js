import { BASE_URL } from "./constants";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkRes);
}

function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
}

function deleteCard(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function addCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function removeCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function updateProfile(data, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      avatar: data.avatar,
    }),
  }).then(checkRes);
}

export {
  addCardLike,
  removeCardLike,
  checkRes,
  addItem,
  getItems,
  deleteCard,
  updateProfile,
};
