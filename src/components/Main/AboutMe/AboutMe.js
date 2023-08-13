import Title from "../Title/Title";
import Student from "../../../images/student.jpg"

function AboutMe() {
  return (
    <section className="about-me">
      <Title title="Студент" />
      <article className="student">
        <div className="student__container">
          <h2 className="student__title">Виталий</h2>
          <p className="student__heading">Фронтенд-разработчик, 30 лет</p>

          <p className="student__paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href="https://github.com/DimkaYmka" className="student__link" target="_blank">Github</a>
        </div>
        <div className="student__image-container">
          <img src={Student} alt="фото студента" className="student__image" />
        </div>
      </article>
    </section>
  )
}

export default AboutMe;
