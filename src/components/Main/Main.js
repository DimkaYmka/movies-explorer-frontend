import Promo from "./Promo/Promo.js";
import AboutProject from "./AboutProject/AboutProject.js"
import Technologies from "./Technologies/Technologies.js"
import AboutMe from "./AboutMe/AboutMe.js";
import Portfolio from "./Portfolio/Portfolio.js"
import Footer from "../Footer/Footer.js";

function Main() {
  return (
    <div>
      <Promo />
      <AboutProject/>
      <Technologies/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </div>
  )
}
export default Main;
