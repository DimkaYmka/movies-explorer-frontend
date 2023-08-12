import Auth from '../Auth/Auth';
import { loginSetting } from '../../constants/authSetting';
// import Header from '../Header/Header.js';

function Login() {
  return (
    <main className="login">
      {/* <Header theme={{ default: true }}/> */}
      <Auth authSetting={loginSetting} />
    </main>
  )
}

export default Login;
