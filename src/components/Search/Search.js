function Search() {
  return (
    <main className="movies">
      <section className="search__section">
        <form className="search">
          <fieldset className="search__fieldset">
            <input type="text" placeholder="Фильм"
              className="search__input" />
            <button className="search__button">
              Поиск
            </button>
          </fieldset>
          <label className="search__checkbox">

            <input
              type="checkbox" name="search-short-toggle" id="search-short-toggle"
              className="search-input__checkbox" />
            <label
              className="search-input__checkbox-label"
              htmlFor="search-short-toggle" />
            <p className="search__text">
              Короткометражки
            </p>
          </label>

        </form>
      </section>
    </main>
  )
}

export default Search
