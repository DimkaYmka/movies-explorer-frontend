import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Footer from '../Footer/Footer.js'
import MovieSectionList from '../MovieSectionList/MovieSectionList.js';
import { savedMoviesData } from '../../constants/savedMoviesData.js';


function SavedMovies() {

  return (
    <div className="layout">
      <Header theme={{ default: false }}/>
      <Search />
      <MovieSectionList moviesData={savedMoviesData}/>
      <Footer />
    </div>
  )
}

export default SavedMovies;
