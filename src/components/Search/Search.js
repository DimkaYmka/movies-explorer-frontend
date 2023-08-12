function Search() {
  return (
    <section className="movies">
      <section className="movies__section">
        <form className="search">
          <fieldset className="search__fieldset">
            <input type="text" placeholder="Фильм"
              className="search__input" required/>
            <button className="search__button">
              Поиск
            </button>
          </fieldset>
          <label className="search__checkbox">

            <input
              type="checkbox" name="search-short-toggle" id="search-short-toggle"
              className="search__label"/>
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
