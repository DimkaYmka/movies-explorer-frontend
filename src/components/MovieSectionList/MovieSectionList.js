import MovieSection from '../MovieSection/MovieSection.js'


function MoviesCardList  ({ moviesData }) {
  return (
    <main className="movie-section">
      <ul className="movie-section__list">
        {
          moviesData.map(({ _id, ...movie}) => (
            <MovieSection key={_id} movieData={movie} />
          ))
        }
      </ul>
      <button className="movie-section__more-button"> Ещё </button>
    </main>
  )
};

export default MoviesCardList;
