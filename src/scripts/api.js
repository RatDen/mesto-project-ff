
export function getUserProfile(loginInfo) {
    return fetch(loginInfo.url + loginInfo.group + '/users/me', {
        headers: {
            authorization: loginInfo.token
        }
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function getCards(loginInfo) {
    return fetch(loginInfo.url + loginInfo.group + '/cards', {
        headers: {
            authorization: loginInfo.token
        }
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function saveUserProfile(loginInfo, userProfile) {
    return fetch(loginInfo.url + loginInfo.group + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: loginInfo.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userProfile.name,
            about: userProfile.about
        })
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function editUserProfileAvatar(loginInfo, avatarUrl) {
    return fetch(loginInfo.url + loginInfo.group + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: loginInfo.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function saveCard(loginInfo, card) {
    return fetch(loginInfo.url + loginInfo.group + '/cards', {
        method: 'POST',
        headers: {
            authorization: loginInfo.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: card.name,
            link: card.link
        })
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function deleteCard(loginInfo, cardId) {
    return fetch(loginInfo.url + loginInfo.group + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: loginInfo.token
        }
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function saveLike(loginInfo, cardId) {
    return fetch(loginInfo.url + loginInfo.group + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: loginInfo.token
        }
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}

export function deleteLike(loginInfo, cardId) {
    return fetch(loginInfo.url + loginInfo.group + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: loginInfo.token
        }
    })
      .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
}