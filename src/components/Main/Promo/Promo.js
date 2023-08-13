// import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__text">
        {/* <h1 className="promo__title">Учебный проект студента факультета<br/>Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот<br/>проект и его создателя.</p> */}
         <h1 className="promo__title">Учебный проект студента факультета <nobr>Веб-разработки</nobr>.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="#project" className="promo__link">
          Узнать больше
        </a>
      </div>
      <div className='promo__picture'>
      </div>
    </section>
  )
}

export default Promo;
