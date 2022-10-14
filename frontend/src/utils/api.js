class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserProfile() {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserProfile(items) {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: items.name,
        about: items.about,
      }),
    }).then(this._checkResponse);
  }

  addUserCard(items) {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: items.name,
        link: items.link,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `/cards/${id}/likes`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  delete(id) {
    return fetch(this._url + `/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editUserAvatar(items) {
    return fetch(this._url + '/users/me/avatar', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: items.avatar,
      }),
    }).then(this._checkResponse);
  }

  getData() {
    return Promise.all([this.getInitialCards(), this.getUserProfile()]);
  }
}

const api = new Api({
  url: 'https://api.mesto.vlovchinnikov21.nomoredomains.icu',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
