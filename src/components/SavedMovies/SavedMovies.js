import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Footer from '../Footer/Footer.js'
import MovieSectionList from '../MovieSectionList/MovieSectionList.js';
import { useEffect, useState } from 'react';
import api from '../../utils/MainApi';

const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return (isShortsIncluded && (movieDuration <= shortsDurationCriteria)) || (!isShortsIncluded && (movieDuration > shortsDurationCriteria));
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();
  return movie.nameRU.toLowerCase().includes(lowerQuerry);
}

export const movieFilter = (movie, { querry, includeShorts }) => {
  return (includeShorts && (movie.duration <= 40) && filterMovieByQuerry(movie, querry)) ||
    (!includeShorts && filterMovieByQuerry(movie, querry));
}

function SavedMovies({ loggedIn }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const [includeShorts, setIncludeShorts] = useState(false);
  const [parameters, setParameters] = useState({ querry: '', includeShorts: false });

  const handleShortsCheck = () => {
    setIncludeShorts(prevIncludeShorts => !prevIncludeShorts);
    setParameters(prevParameters => ({
      ...prevParameters,
      includeShorts: !prevParameters.includeShorts
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    api.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }, [parameters]);

  const handleSearchSubmit = (searchValue, includeShorts) => {
    const currentSearch = { querry: searchValue, includeShorts: includeShorts, };
    setParameters(currentSearch);
    setIsNotFound(false);
    setSearchedSavedMovies([]); // Обнуляем предыдущие результаты

  }



  useEffect(() => {
    const currentSearchedMovies = savedMovies.filter(movie => movieFilter(movie, parameters));
    if (currentSearchedMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setSearchedSavedMovies(currentSearchedMovies);
  }, [parameters, savedMovies])

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <Search
        parameters={parameters}
        setParameters={setParameters}
        includeShorts={includeShorts} // Передаем локальное состояние
        handleShortsCheck={handleShortsCheck} // Передаем локальный обработчик
        onSearchSubmit={handleSearchSubmit}
      />
      <MovieSectionList
        moviesData={searchedSavedMovies}
        isLoading={isLoading}
        isNotFound={isNotFound} />
      <Footer />
    </div>
  )
}

export default SavedMovies;






