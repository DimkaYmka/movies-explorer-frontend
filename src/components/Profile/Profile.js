import { useContext } from 'react';

import { CurrentUserContext } from '../../context/CurrentUserContext.js';

import Header from '../Header/Header.js'
function Profile() {

  const { name, email } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    console.log('done');
  }

  function handleEdit() {
    console.log('done');
  }

  function handleLogout() {
    console.log('done');
  }

  return (
    <div className="">
      <Header theme={{ default: false }} />
      <main className="profile">
        <h2 className="profile__title">
          {`Привет, ${name}!`}
        </h2>

        <form name="profile__form"
          className="profile__form"
          onSubmit={handleSubmit}>
          <label className="profile__input-container">
            <span className="profile__input-label">
              Имя
            </span>
            <input
              name="name"
              type="text"
              className="profile__input"
              placeholder="Имя"
              value={name || ''}
              onChange={handleEdit}
              minLength={2}
              maxLength={30}
              required={true} />
          </label>

          <label className="profile__input-container">
            <span className="profile__input-label">
              E-mail
            </span>
            <input
              required
              type="email"
              name="email"
              className="profile__input"
              placeholder="почтa"
              value={email || ''}
              onChange={handleEdit}
            />
          </label>

        </form>

        <div className="profile__edit">
          <button
            type="submit"
            form="profile__form"
            onClick={handleEdit}
            className="profile__button-edit">
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>

      </main>
    </div>
  )
};

export default Profile;
