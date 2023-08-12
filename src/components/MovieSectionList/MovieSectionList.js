import MovieSection from '../MovieSection/MovieSection.js'


function MoviesCardList  ({ moviesData }) {
  return (
    <section className="movie-section">
      <ul className="movie-section__list">
        {
          moviesData.map(({ _id, ...movie}) => (
            <MovieSection key={_id} movieData={movie} />
          ))
        }
      </ul>
      <button className="movies-section__more-button"> Ещё </button>
    </section>
  )
};

export default MoviesCardList;
