import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js"
import Movies from '../Movies/Movies.js';

function App() {
  const [loggedIn, setLoggeIn] = useState(true);
  const [openNavPanel, setOpenNavPanel] = useState(false);

  function handleOpenNavPanel() {
    setOpenNavPanel(!openNavPanel);
  }

  return (
    <div className="content">
      <Header
        loggedIn={loggedIn}
        isOpenNavPanel={openNavPanel}
        isToggleNavPanel={handleOpenNavPanel} />

      <Routes>

        <Route
          element={<Main />}
          path='/'
        />
        <Route
          path='/movies'
          element={<Movies />}
        />
        {/* <Route
           path='/saved-movies'
         />
         <Route
           path='/signup'
         />
         <Route
           path='/signin'
         />

         <Route
           path='/profile'
         /> */}

      </Routes>

    </div>
  );
}

export default App;
