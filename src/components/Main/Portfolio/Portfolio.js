

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="#" className="portfolio__link" target="_blank" rel="noreferrer">Статичный сайт<p className="portfolio__mark">↗</p></a>
        </li>
        <li className="portfolio__item">
          <a href="#" className="portfolio__link" target="_blank" rel="noreferrer">Адаптивный сайт<p className="portfolio__mark">↗</p></a>
        </li>
        <li className="portfolio__item">
          <a href="#" className="portfolio__link" target="_blank" rel="noreferrer">Одностраничное приложение<p className="portfolio__mark">↗</p></a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
