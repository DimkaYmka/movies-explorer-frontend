// import Film1 from '../../images/films/1.jpg'
// import { useLocation } from 'react-router-dom';
import { convertMinutes } from '../../utils/utils';

function MovieSection({ movieData })  {
  // const { pathname } = useLocation();
 const moviesUrl = 'https://api.nomoreparties.co/';
  return (

        <li className="movie-section__item">
          <div className="movie-section__description">
            <h3 className="movie-section__title">{movieData.nameRU}</h3>
            <p className="movie-section__duration">{convertMinutes(+movieData.duration)}</p>
          </div>
          <a href={movieData.trailerLink} className="movie-section__link">
            <img className="movie-section__image"
              // src={movieData.image}
              src={`${moviesUrl}${movieData.image.url}`}
              alt={movieData.nameRU} />
          </a>
          <button className="movie-section__button " type="button">Сохранить</button>

        </li>

  )
}

export default MovieSection;
