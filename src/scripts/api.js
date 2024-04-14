
const loginInfo = {
  url: 'https://nomoreparties.co/v1/',
  group: 'wff-cohort-11',
  token: '7067014e-808a-4e5e-8222-98d5ce1556a4',
  userId: null
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getUserProfile() {
  return fetch(loginInfo.url + loginInfo.group + '/users/me', {
    headers: {
      authorization: loginInfo.token,
    },
  })
    .then(res => handleResponse(res));
}

export function getCards() {
  return fetch(loginInfo.url + loginInfo.group + '/cards', {
    headers: {
      authorization: loginInfo.token,
    },
  })
    .then(res => handleResponse(res));
}

export function saveUserProfile(userProfile) {
  return fetch(loginInfo.url + loginInfo.group + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: loginInfo.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userProfile.name,
      about: userProfile.about,
    }),
  })
    .then(res => handleResponse(res));
}

export function editUserProfileAvatar(avatarUrl) {
  return fetch(loginInfo.url + loginInfo.group + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: loginInfo.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then(res => handleResponse(res));
}

export function saveCard(card) {
  return fetch(loginInfo.url + loginInfo.group + '/cards', {
    method: 'POST',
    headers: {
      authorization: loginInfo.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
    .then(res => handleResponse(res));
}

export function deleteCard(cardId) {
  return fetch(loginInfo.url + loginInfo.group + '/cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: loginInfo.token,
    },
  })
    .then(res => handleResponse(res));
}

export function saveLike(cardId) {
  return fetch(loginInfo.url + loginInfo.group + '/cards/likes/' + cardId, {
    method: 'PUT',
    headers: {
      authorization: loginInfo.token,
    },
  })
    .then(res => handleResponse(res));
}

export function deleteLike(cardId) {
  return fetch(loginInfo.url + loginInfo.group + '/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: loginInfo.token,
    },
  })
    .then(res => handleResponse(res));
}
