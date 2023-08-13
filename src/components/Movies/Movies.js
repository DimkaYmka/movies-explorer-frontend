
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Footer from '../Footer/Footer.js'
import MovieSectionList from '../MovieSectionList/MovieSectionList.js';
import { moviesData } from '../../constants/moviesData.js';

function Movies() {

  return (
    <div className="movie__container">
      <Header theme={{ default: false }}/>
      <Search />
      <MovieSectionList moviesData={moviesData}/>
      {/* <MovieSection /> */}

      <Footer />
    </div>
  )
}

export default Movies;
