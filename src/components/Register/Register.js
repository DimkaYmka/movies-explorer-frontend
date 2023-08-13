import { registerSetting } from '../../constants/authSetting';
import Auth from '../Auth/Auth';
// import Header from '../Header/Header.js';

function Register() {
  return (
    <main className="register">
      {/* <Header theme={{ default: true }}/> */}
      <Auth authSetting={registerSetting}/>
    </main>
  )
}

export default Register;
