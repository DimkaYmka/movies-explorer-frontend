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

  const handleSubmit = (event) => {
    event.preventDefault(); // Отменить действие по умолчанию (попытку отправить форму)
    if (event.target.checkValidity()) {
      onSearchSubmit(searchValue, includeShorts);
    }
  }

  return (
    <section className="movies">
      <section className="search__section">
        <form className="search" onSubmit={handleSubmit}>
          <fieldset className="search__fieldset">
            <input
              type="text"
              name="request"
              placeholder="Фильм"
              onChange={handleChange}
              value={searchValue}
              className="search__input"
              required
            />
            <button
              className="search__button"
              type="submit" // Тип изменен на submit
            >
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
