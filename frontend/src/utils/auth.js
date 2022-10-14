export const BASE_URL = 'https://api.mesto.vlovchinnikov21.nomoredomains.icu';

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
};
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);

        return data.token;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(handleResponse);
};
