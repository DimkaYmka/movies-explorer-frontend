import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

// import Header from "../Header/Header.js";
import Main from "../Main/Main.js"
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js'
import NotFound from '../404/404.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';





function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Dima',
    email: 'asd@mail.ru',
    loggedIn: true
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* <div className="content"> */}


        <Routes>

          <Route
            element={<Main />}
            path='/'
          />
          <Route
            path='/movies'
            element={<Movies />}
          />
          <Route
            path='/saved-movies'
            element={<SavedMovies />}
          />
          <Route
            path='/signup'
            element={<Register/>}
          />
          <Route
            path='/signin'
            element={<Login/>}
          />

          <Route
            path='/profile'
            element={<Profile />}
          />

          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFound />} />

        </Routes>
      {/* </div> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
