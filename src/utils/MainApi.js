const apiOptions = {
  baseUrl: 'http://localhost:3002',
  // baseUrl: 'https://api.d1mkaymka.nomoredomains.xyz',
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

  getUserData() {
    // const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
      // headers: this._headers,
    })
      .then(this._getResponse)
  }


  //
  editUserData(data) {
    // const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',

      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(userInfo)
      body: JSON.stringify({
        //тело запроса
        name: data.name,
        email: data.email,
    }),
    })
      .then(this._getResponse)
  }
  //



  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._getResponse)
  };

  NewSavedMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    })
    .then(this._getResponse)
  };

  deleteSavedMovie(movieId) {
    // const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._getResponse);
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(this._getResponse);;
  };



  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._getResponse);
  };

  getContent (token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        Authorization: `Bearer ${token}`,
      }
    })
      .then(this._getResponse);
  };


}




const api = new Api(apiOptions)

export default api
