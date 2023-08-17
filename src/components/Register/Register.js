// import { registerSetting } from '../../constants/authSetting';
// import Auth from '../Auth/Auth';
// // import Header from '../Header/Header.js';
// import api from '../../utils/MainApi.js';
// import useValidation from '../../hooks/useValidationHook';



// function Register({ onRegister }) {
//   const {
//     values
//   } = useValidation();

//   console.log(values);


//   function handleSubmit(e) {
//     e.preventDefault();
//     onRegister({
//         name: values.name,
//         email: values.email,
//         password: values.password,
//     });
//     console.log(values.name, values.email, values.password);
// }
//   return (
//     <main className="register">
//       {/* <Header theme={{ default: true }}/> */}
//       <Auth authSetting={registerSetting}
//       onSubmit={handleSubmit}
//       />
//     </main>
//   )
// }

// export default Register;

import React from 'react';
import Auth from '../Auth/Auth';
import useValidation from '../../hooks/useValidationHook';
// import { EMAIL_REGEX, USERNAME_REGEX } from '../../utils/constants';

const Register = ({ onRegister, isLoading }) => {
  const { values, errors, handleChange, isValid } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }
  return (
    <Auth
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      question='Уже зарегистрированы?'
      linkText=' Войти'
      link={'/signin'}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isLoading={isLoading}>
      <label className='auth__input-label'>
        Имя
        <input
          name="name"
          className={`auth__input-row ${errors.name ? 'auth__input-row_error' : ''}`}
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.name || ''}
        // pattern={USERNAME_REGEX}
        />
        <span className='auth-form__span-error'>{errors.name}</span>
      </label>
      <label className='auth__input-label'>
        E-mail
        <input name="email"
          className={`auth__input-row ${errors.email ? 'auth__input-row_error' : ''}`}
          id="email-input"
          type="email"
          required
          onChange={handleChange}
          //  pattern={EMAIL_REGEX}
          value={values.email || ''}
        />
        <span className='auth-form__span-error'>{errors.email}</span>
      </label>
      <label className='auth__input-label'>
        Пароль
        <input name="password"
          className={`auth__input-row ${errors.password ? 'auth__input-row_error' : ''}`}
          id="password-input"
          type="password"
          minLength="6"
          required
          onChange={handleChange}
          value={values.password || ''}
        />
        <span className='auth-form__span-error'>{errors.password}</span>
      </label>
    </Auth>
  );
}

export default Register

// DONE
