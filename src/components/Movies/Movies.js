import MovieSectionList from '../MovieSectionList/MovieSectionList';
import Search from '../Search/Search';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'

import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider';
import { useEffect, useState } from 'react';

import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return (isShortsIncluded && (movieDuration <= shortsDurationCriteria)) || (!isShortsIncluded && (movieDuration > shortsDurationCriteria));
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();
  return movie.nameRU.toLowerCase().includes(lowerQuerry);
}

// export const movieFilter = (movie, { querry, includeShorts }) => {
//   return checkMovieDuration(movie.duration, includeShorts) && filterMovieByQuerry(movie, querry);
// }

export const movieFilter = (movie, { querry, includeShorts }) => {
  return (includeShorts && (movie.duration <= 40) && filterMovieByQuerry(movie, querry)) ||
    (!includeShorts && filterMovieByQuerry(movie, querry));
}

const getAmountOfCards = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 550) {
    return { totalCards: 5, extraCards: 2 };
  } else if (screenWidth <= 750) {
    return { totalCards: 8, extraCards: 2 };
  }
  return { totalCards: 12, extraCards: 3 };
}

const getIncludeShortsFromLocalStorage = () => {
  const includeShorts = JSON.parse(localStorage.getItem('includeShorts'));
  return includeShorts !== null ? includeShorts : false;
};

const Movies = ({ loggedIn }) => {

  const [allMovies, setAllMovies] = useState([]);

  const [prevSearchResults, setPrevSearchResults] = useState([]);

  const [moviesDisplayed, setMoviesDisplayed] = useState([]);
  const [amountOfCards, setAmountOfCards] = useState(getAmountOfCards());
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { setSavedMovies } = useSavedMoviesContext();
  const [parameters, setParameters] = useState({
    querry: '',
    includeShorts: getIncludeShortsFromLocalStorage(), // Используем значение из localStorage
  });
  const [serachedMovies, setSearchedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const [includeShorts, setIncludeShorts] = useState(getIncludeShortsFromLocalStorage());

  const handleShortsCheck = () => {
    const newIncludeShorts = !includeShorts;
    setIncludeShorts(newIncludeShorts);
    localStorage.setItem('includeShorts', JSON.stringify(newIncludeShorts));
  }

  const handleSearchSubmit = (searchValue, includeShorts) => {
    const currentSearch = {
      querry: searchValue,
      includeShorts: includeShorts,
    };

    localStorage.setItem('search', JSON.stringify(currentSearch));
    setParameters(currentSearch);
    setSearchedMovies([]); // Обнуляем предыдущие результаты
    setIsNotFound(false); // Сбрасываем состояние "ничего не найдено"
  }


  useEffect(() => {
    const search = JSON.parse(localStorage.getItem('search'));
    if (search) setParameters(search);

    const prevResults = JSON.parse(localStorage.getItem('prevSearchResults'));
    if (prevResults) setSearchedMovies(prevResults);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setSavedMovies])

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem('search'));
    if (search) setParameters(search);

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
        setIsNotFound(true)
      })
  }, [])

  useEffect(() => {
    if (localStorage.getItem('search')) {
      setMoviesDisplayed(serachedMovies.slice(0, amountOfCards.totalCards));

    } else {
      setMoviesDisplayed(allMovies.slice(0, amountOfCards.totalCards));

    }
  }, [amountOfCards, serachedMovies, allMovies]);


  useEffect(() => {
    setIsButtonVisible(moviesDisplayed.length < serachedMovies.length);
  }, [moviesDisplayed, serachedMovies])

  const handleMoreMovies = () => {
    const moviesToShow = allMovies.slice(moviesDisplayed.length, moviesDisplayed.length + amountOfCards.extraCards);
    setMoviesDisplayed([...moviesDisplayed, ...moviesToShow]);
  }

  useEffect(() => {
    if (!parameters.querry) {
      setSearchedMovies([]); // Обнуляем предыдущие результаты
      setIsNotFound(false); // Сбрасываем состояние "ничего не найдено"
      return;
    }

    // Фильтрация с использованием нового состояния чекбокса
    const currentSearchedMovies = allMovies.filter(movie =>
      movieFilter(movie, { querry: parameters.querry, includeShorts: includeShorts })
    );

    if (currentSearchedMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }

    setSearchedMovies(currentSearchedMovies);

    localStorage.setItem('prevSearchResults', JSON.stringify(currentSearchedMovies));
  }, [parameters, includeShorts, allMovies])

  return (
    <div>
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <main className="movies container">

        <Search
          parameters={parameters}
          setParameters={setParameters}
          includeShorts={getIncludeShortsFromLocalStorage()} // Передайте значение из localStorage
          handleShortsCheck={handleShortsCheck}
          onSearchSubmit={handleSearchSubmit}
        />
        <MovieSectionList
          isLoading={isLoading}
          moviesData={moviesDisplayed}
          isNotFound={isNotFound} />
        {isButtonVisible
          ?
          <button className="movie-section__more-button"
            type="button" onClick={handleMoreMovies}>
            Ещё
          </button>
          : null
        }

      </main>
      <Footer />
    </div>
  )
};

export default Movies;
