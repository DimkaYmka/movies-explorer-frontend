import MovieSectionList from '../MovieSectionList/MovieSectionList';
import Search from '../Search/Search';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'


import { useEffect, useState } from 'react';

import moviesApi from '../../utils/MoviesApi';

// // Фильтрация фильмов
// const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
//   return isShortsIncluded || (movieDuration > shortsDurationCriteria);
// }

// const filterMovieByQuerry = (movie, searchQuerry) => {
//   const lowerQuerry = searchQuerry.toLowerCase();

//   const isNameRuMatches = movie.nameRU.toLowerCase().includes(lowerQuerry);
//   const isNameEnMatches = movie.nameEN.toLowerCase().includes(lowerQuerry);
//   const isDescriptionMatches = movie.description.toLowerCase().includes(lowerQuerry);

//   return isNameRuMatches || isNameEnMatches || isDescriptionMatches;
// }

// export const movieFilter = (movie, { querry, includeShorts }) => {
//   return checkMovieDuration(movie.duration, includeShorts) && filterMovieByQuerry(movie, querry);
// }

const getAmountOfCards = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 550) {
    return { totalCards: 5, extraCards: 2 };
  } else if (screenWidth <= 750) {
    return { totalCards: 8, extraCards: 2 };
  }
  return { totalCards: 12, extraCards: 3 };
}

const Movies = () => {

  const [allMovies, setAllMovies] = useState([]);
  const [moviesDisplayed, setMoviesDisplayed] = useState([]);
  const [amountOfCards, setAmountOfCards] = useState(getAmountOfCards());
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    const movieStorage = JSON.parse(localStorage.getItem('movies'));
    if (movieStorage) {
      setAllMovies(movieStorage)
      return;
    }
    moviesApi.getMovies()
      .then(movies => {
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  useEffect(() => {
    setMoviesDisplayed(allMovies.slice(0, amountOfCards.totalCards));
  }, [amountOfCards, allMovies])


  useEffect(() => {
    setIsButtonVisible(moviesDisplayed.length < allMovies.length);
  }, [moviesDisplayed, allMovies])

  const handleMoreMovies = () => {
    const moviesToShow = allMovies.slice(moviesDisplayed.length, moviesDisplayed.length + amountOfCards.extraCards);
    setMoviesDisplayed([...moviesDisplayed, ...moviesToShow]);
  }

  return (
    <main className="movies container">
      <Header theme={{ default: false }}/>
        <Search
              // parameters={parameters}
      //    handleSubmit={handleSubmit}
        />
        <MovieSectionList moviesData={moviesDisplayed} />
        {isButtonVisible
        ?
        <button className="movie-section__more-button"
          type="button" onClick={handleMoreMovies}>
          Ещё
        </button>
        : null
      }
        <Footer />
    </main>
  )
};

export default Movies;



