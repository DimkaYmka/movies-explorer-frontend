import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';

function Header({ loggedIn, isOpenNavPanel, isToggleNavPanel }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      {loggedIn ?
        <div>
          <div className={`header__overlay ${isOpenNavPanel ? 'header__overlay_active' : ''}`} />
          <button
            className="header__navpanel"
            onClick={isToggleNavPanel}>
            <div className={`header__navpanel-inner ${isOpenNavPanel ? 'header__navpanel-inner_active' : ''}`} />
          </button>
          <Navigation isOpenNavPanel={isOpenNavPanel} />
        </div>
        :
        <div className="header__main">
          <Link to="/signup" className="header__signup">
            Регистрация
          </Link>
          <Link to="/signin" className="header__signin">
            Войти
          </Link>
        </div>
      }
    </header>
  )
}

export default Header;




//  function Header({ loggeIn }) {
//    return (
//      <header className="header container">
//        <Link to="/" className="header__logo"/>
//        { loggeIn
//          ? <div className="header__wrapper">
//              <button className="header__burger"/>
//              <Navigation/>
//            </div>
//          : <div className="header__entrance">
//              <Link to="/signup" className="header__link">
//                Регистрация
//              </Link>
//              <Link to="/signin" className="header__button">
//                Войти
//              </Link>
//            </div>
//        }
//      </header>
//    )
//  }
