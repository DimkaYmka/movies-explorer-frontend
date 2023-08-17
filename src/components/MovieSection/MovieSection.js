// import Film1 from '../../images/films/1.jpg'
import { useLocation } from 'react-router-dom';
import { convertMinutes } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider';
import api from '../../utils/MainApi';
import MovieButton from '../MovieButton/MovieButton'

const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return isShortsIncluded || (movieDuration > shortsDurationCriteria);
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();

  const isNameRuMatches = movie.nameRU.toLowerCase().includes(lowerQuerry);
  const isNameEnMatches = movie.nameEN.toLowerCase().includes(lowerQuerry);
  const isDescriptionMatches = movie.description.toLowerCase().includes(lowerQuerry);

  return isNameRuMatches || isNameEnMatches || isDescriptionMatches;
}

export const movieFilter = (movie, { querry, includeShorts }) => {
  return checkMovieDuration(movie.duration, includeShorts) && filterMovieByQuerry(movie, querry);
}

function MovieSection({ movieData }) {
  const { pathname } = useLocation();
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();

  const [isDeleted, setIsDeleted] = useState(false);

  const moviesUrl = 'https://api.nomoreparties.co/';

  useEffect(() => {
    setIsMovieSaved(savedMovies.some(movie => movie.movieId === movieData.id || movie.movieId === movieData.movieId));
  }, [savedMovies, movieData])

  // function deleteMovie() {

  //   const deleteParam = pathname === '/movies'
  //     ? movieData.id
  //     : movieData.movieId;
  //   const movieToDelete = savedMovies.find(movie => movie.movieId === deleteParam);

  //   api.deleteSavedMovie(movieToDelete._id)
  //     .then(movieData => {
  //       setSavedMovies(savedMovies.filter(movie => movie._id !== movieData._id));
  //       setIsDeleted(true);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  function deleteMovie() {
    const deleteParam = pathname === '/movies'
      ? movieData.id
      : movieData.movieId;

    const movieToDelete = savedMovies.find(movie => movie.movieId === deleteParam);
    const movieToDeleteIndex = savedMovies.findIndex(movie => movie.movieId === deleteParam);

    api.deleteSavedMovie(movieToDelete._id)
      .then(movieData => {
        setSavedMovies(prevMovies => {
          const updatedMovies = [...prevMovies];
          updatedMovies.splice(movieToDeleteIndex, 1);
          return updatedMovies;
        });
        setIsDeleted(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    setIsDeleted(false); // Сбрасываем значение isDeleted при изменении movieData
  }, [movieData]);





  const saveMovie = () => {
    const savingMovieInfo = {
      ...movieData,
      movieId: movieData.id,
      image: `${moviesUrl}${movieData.image.url}`,
      thumbnail: `${moviesUrl}${movieData.image.formats.thumbnail.url}`,
    };

    delete savingMovieInfo.id;
    delete savingMovieInfo.created_at;
    delete savingMovieInfo.updated_at;

    console.log('Movie data: ', movieData);
    console.log('Movie saved: ', savingMovieInfo);

    api.NewSavedMovie(savingMovieInfo)
      .then(movie => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch(err => {
        console.log(err);
      })
  }



  if (isDeleted && pathname === "/saved-movies") {
    return null; // не отображаем удаленный фильм
  }

  return (
    <li className="movie-section__item">
      <div className="movie-section__description">
        <h3 className="movie-section__title">{movieData.nameRU}</h3>
        <p className="movie-section__duration">{convertMinutes(+movieData.duration)}</p>
      </div>
      <a href={movieData.trailerLink} className="movie-section__link">
        <img className="movie-section__image"
          src={ pathname === "/movies"
              ? `${moviesUrl}/${movieData.image.url}`
              : movieData.image}
          alt={movieData.nameRU} />
      </a>
      {/* <button onClick={pathname === "/movies" ? saveMovie : deleteMovie}
        className="movie-section__button " type="button">{pathname === "/movies" ? 'Сохранить' : 'X'}
      </button> */}
      <MovieButton
        onClickHandler={isMovieSaved ? deleteMovie : saveMovie}
        typeClass={isMovieSaved && pathname === "/movies"} >
        {pathname === "/movies" ? 'Сохранить' : 'X'}
      </MovieButton>


    </li>

  )
}

export default MovieSection;
