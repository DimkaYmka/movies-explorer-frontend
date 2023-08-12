import { registerSetting } from '../../constants/authSetting';
import Auth from '../Auth/Auth';
// import Header from '../Header/Header.js';

function Register() {
  return (
    <div className="register">
      {/* <Header theme={{ default: true }}/> */}
      <Auth authSetting={registerSetting}/>
    </div>
  )
}

export default Register;
