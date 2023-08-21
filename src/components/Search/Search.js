import { useState, useEffect } from 'react';
import SearchShort from './searchShort/SearchShort';




function Search({ parameters, setParameters, includeShorts, handleShortsCheck, onSearchSubmit }) {
  const [searchValue, setSearchValue] = useState(parameters.querry);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }

  useEffect(() => {
    setSearchValue(parameters.querry);
  }, [parameters])

  return (
    <section className="movies">
      <section className="search__section">
        <form className="search">
          <fieldset className="search__fieldset">
            <input type="text"
              name="request"
              placeholder="Фильм"
              onChange={handleChange}
              value={searchValue}
              className="search__input" required />
            <button className="search__button" type='button' onClick={() => onSearchSubmit(searchValue, includeShorts)}> {/* Используйте новое имя пропса */}
              Поиск
            </button>
          </fieldset>
          <SearchShort
            checkHandler={handleShortsCheck}
            isChecked={includeShorts}
          />
        </form>
      </section>
    </section>
  )
}

export default Search;

