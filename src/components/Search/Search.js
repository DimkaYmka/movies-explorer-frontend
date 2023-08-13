import { useState, useEffect } from 'react';



function Search ({ parameters, handleSearchSubmit }) {
  // const [searchValue, setSearchValue] = useState(parameters.querry);
  // const [isShortsChecked, setIsShortsChecked] = useState(parameters.includeShorts);

  // const handleChange = ({ target }) => {
  //   setSearchValue(target.value);
  // }
  // useEffect(() => {
  //   setSearchValue(parameters.querry);
  //   setIsShortsChecked(parameters.includeShorts);
  // }, [parameters])

  return (
    <section className="movies">
      <section className="movies__section">
        <form className="search" onSubmit={handleSearchSubmit}>
          <fieldset className="search__fieldset">
            <input type="text" placeholder="Фильм"
            // onChange={handleChange}
            //   value={searchValue}
              className="search__input" required />
            <button className="search__button" type='submit'>
              Поиск
            </button>
          </fieldset>
          <label className="search__checkbox">

            <input
              type="checkbox" name="search-short-toggle" id="search-short-toggle"
              className="search__label" />
            <label
              className="search__checkbox-label"
              htmlFor="search-short-toggle" />
            <p className="search__text">
              Короткометражки
            </p>
          </label>

        </form>
      </section>
    </section>
  )
}

export default Search
