import { Link } from 'react-router-dom';


function Auth({ authSetting }) {
  return (


    <main className="auth">
 <Link to="/" className="auth__logo" />
      <h2
        className="auth__title">
        {authSetting.title}
      </h2>
      <form className="auth__form">
        <div className="auth__input">
          <label className="auth__input-label">
            Имя
          </label>
          <input className="auth__input" type="email"
            required />
        </div>

        <div className="auth__input">
          <label className="auth__input-label">
            E-mail
          </label>
          <input className="auth__input" type="password"
            required />
        </div>

        {authSetting.type === 'register'
          &&
          <div
            className="auth__input">
            <label className="auth__input-label">
              Пароль
            </label>
            <input className="auth__input" type="text"
              required />
          </div>
        }
      </form>

      <div className="auth_submit">
        <button className="auth__submit-button" type="submit">
          {authSetting.buttonSubmit}
        </button>
        <div className="auth__container">
          <p className="auth__text">
            {authSetting.Text}
          </p>
          <Link to={authSetting.Path}
            className="auth__link">
            {authSetting.Link}
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Auth;
