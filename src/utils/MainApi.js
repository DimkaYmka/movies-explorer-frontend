const apiOptions = {
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.mesto.project.learn.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
};


const getJWTByLocalStorage = () => {
  return localStorage.getItem('jwt')
}

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // getMovies() {
  //   // const token = getJWTByLocalStorage()
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     }
  //     // headers: this._headers
  //   })
  //     .then(this._getResponse)
  // }

  getUserData() {
    // const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
      // headers: this._headers,
    })
      .then(this._getResponse)
  }


  //
  editUserData(userInfo) {
    // const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(this._getResponse)
  }
  //





  deleteSavedMovie(cardId) {
    // const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._getResponse);
  }


}



const api = new Api(apiOptions)

export default api
