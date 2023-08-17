import MovieSectionList from '../MovieSectionList/MovieSectionList';
import Search from '../Search/Search';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'

import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider';
import { useEffect, useState } from 'react';

import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

// Фильтрация фильмов
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

const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return (isShortsIncluded && (movieDuration <= shortsDurationCriteria)) || (!isShortsIncluded && (movieDuration > shortsDurationCriteria));
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();
  return movie.nameRU.toLowerCase().includes(lowerQuerry);
}

export const movieFilter = (movie, { querry, includeShorts }) => {
  return checkMovieDuration(movie.duration, includeShorts) && filterMovieByQuerry(movie, querry);
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

const Movies = ({ loggedIn }) => {

  const [allMovies, setAllMovies] = useState([]);
  const [moviesDisplayed, setMoviesDisplayed] = useState([]);
  const [amountOfCards, setAmountOfCards] = useState(getAmountOfCards());
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { setSavedMovies } = useSavedMoviesContext();
  const [parameters, setParameters] = useState({ querry: '', includeShorts: false });
  const [serachedMovies, setSearchedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        // setIsModalOpened(true);
        // setModalText(err);
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
    setMoviesDisplayed(serachedMovies.slice(0, amountOfCards.totalCards));
  }, [amountOfCards, serachedMovies])


  useEffect(() => {
    setIsButtonVisible(moviesDisplayed.length < serachedMovies.length);
  }, [moviesDisplayed, serachedMovies])

  const handleMoreMovies = () => {
    const moviesToShow = allMovies.slice(moviesDisplayed.length, moviesDisplayed.length + amountOfCards.extraCards);
    setMoviesDisplayed([...moviesDisplayed, ...moviesToShow]);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { request, short } = e.target.elements;
    console.log(request.value, short.checked);

    const currentSearch = { querry: request.value, includeShorts: short.checked };

    localStorage.setItem('search', JSON.stringify(currentSearch));
    setParameters(currentSearch);
    setIsNotFound(false);
  }

  useEffect(() => {
    if (!parameters.querry) return;

    // const currentSearchedMovies = allMovies.filter(movie => movieFilter(movie, parameters));
    // console.log('currentSearchedMovies: ', currentSearchedMovies);
    // setSearchedMovies(currentSearchedMovies);
      const currentSearchedMovies = allMovies.filter(movie => movieFilter(movie, parameters));
      if (currentSearchedMovies.length === 0) {
        setIsNotFound(true);
    } else {
        setIsNotFound(false);
        setSearchedMovies(currentSearchedMovies);
    }
      console.log('currentSearchedMovies: ', currentSearchedMovies);
      setSearchedMovies(currentSearchedMovies);

  }, [parameters, allMovies])

  return (
    <main className="movies container">
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <Search
        parameters={parameters}
        handleSearchSubmit={handleSearchSubmit}
        setParameters={setParameters}
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
      <Footer />
    </main>
  )
};

export default Movies;


// import Header from '../Header/Header.js';
// import Search from '../Search/Search.js';
// import Footer from '../Footer/Footer.js'
// import MovieSectionList from '../MovieSectionList/MovieSectionList.js';

// import { useEffect, useState } from 'react';

// import  moviesApi  from '../../utils/MoviesApi.js';

// // // Фильтрация фильмов
// // const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
// //   return isShortsIncluded || (movieDuration > shortsDurationCriteria);
// // }

// // const filterMovieByQuerry = (movie, searchQuerry) => {
// //   const lowerQuerry = searchQuerry.toLowerCase();

// //   const isNameRuMatches = movie.nameRU.toLowerCase().includes(lowerQuerry);
// //   const isNameEnMatches = movie.nameEN.toLowerCase().includes(lowerQuerry);
// //   const isDescriptionMatches = movie.description.toLowerCase().includes(lowerQuerry);

// //   return isNameRuMatches || isNameEnMatches || isDescriptionMatches;
// // }

// // export const movieFilter = (movie, { querry, includeShorts }) => {
// //   return checkMovieDuration(movie.duration, includeShorts) && filterMovieByQuerry(movie, querry);
// // }

// const getAmountOfCards = () => {
//   const screenWidth = window.innerWidth;
//   if (screenWidth <= 550) {
//     return { totalCards: 5, extraCards: 2 };
//   } else if (screenWidth <= 750) {
//     return { totalCards: 8, extraCards: 2 };
//   }
//   return { totalCards: 12, extraCards: 3 };
// }

// function Movies() {
//   // const [isLoadind, setIsLoading] = useState(false);
//   const [allMovies, setAllMovies] = useState([]);
//   const [moviesDisplayed, setMoviesDisplayed] = useState([]);
//   const [amountOfCards, setAmountOfCards] = useState(getAmountOfCards());
//   const [isButtonVisible, setIsButtonVisible] = useState(true);

//   // const handleResize = () => {
//   //   // console.log('resize', amountOfCards);
//   //   setAmountOfCards(getamountOfCards());
//   // }

//   // const debouncedResize = useDebouncedFunction(handleResize, 400);

//   // useEffect(() => {
//   //   window.addEventListener('resize', debouncedResize);

//   //   return () => window.removeEventListener('resize', debouncedResize);
//   // }, [debouncedResize]);


//   useEffect(() => {
//     const movieStorage = JSON.parse(localStorage.getItem('movies'));
//     if (movieStorage) {
//       setAllMovies(movieStorage)
//       return;
//     }

//     // setIsLoading(true);
//     moviesApi.getMovies()
//       .then(movies => {
//         setAllMovies(movies);
//         localStorage.setItem('movies', JSON.stringify(movies));
//       })
//       .catch(err => {
//         console.error(err);
//       })
//     // .finally(() => {
//     //   setIsLoading(false);
//     // })
//   }, [])

//   useEffect(() => {
//     setMoviesDisplayed(allMovies.slice(0, amountOfCards.totalCards));
//   }, [amountOfCards, allMovies])

//   useEffect(() => {
//     setIsButtonVisible(moviesDisplayed.length < allMovies.length);
//   }, [moviesDisplayed, allMovies])

//   const handleMoreMovies = () => {
//     const moviesToShow = allMovies.slice(moviesDisplayed.length, moviesDisplayed.length + amountOfCards.extraCards);
//     setMoviesDisplayed([...moviesDisplayed, ...moviesToShow]);
//   }




//   return (
//     <div>
//       <Header theme={{ default: false }} />
//       <Search
//       // parameters={parameters}
//       //    handleSubmit={handleSubmit}
//           />
//       <MovieSectionList moviesData={moviesDisplayed} />
//       {isButtonVisible
//         ?
//         <button className="movie-section__more-button"
//           type="button" onClick={handleMoreMovies}>
//           Ещё
//         </button>
//         : null
//       }
//       <Footer />
//     </div>
//   )
// }

// export default Movies;



