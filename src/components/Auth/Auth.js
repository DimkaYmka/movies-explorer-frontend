// import { Link } from 'react-router-dom';
// import { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import useValidation from '../../hooks/useValidationHook';
// import api from '../../utils/MainApi'

// const errorList = {
//   name: 'Имя состоять более чем из 2 букв',
//   email: 'email введен некоректно',
//   password: 'Пароль должен быть длинее 8 символов',
// }

// function Auth({ authSetting, onSubmit }) {

//   const {
//     values,
//     errors,
//     isValid,
//     handleChange,
//     currentInputName,
//   } = useValidation();

//   return (


//     <main className="auth">
//       <Link to="/" className="auth__logo" />
//       <h2
//         className="auth__title">
//         {authSetting.title}
//       </h2>
//       <form className="auth__form" onSubmit={onSubmit}>
//         {authSetting.type === 'register'
//           &&
          // <div
          //   className="auth__input">
//             <label className="auth__input-label">
//               Имя
//             </label>
//             <input
//               type="text"
//               name="name"
//               className={`auth__input-row ${errors.name ? 'auth__input-row_error' : ''}`}
//               minLength={2}
//               maxLength={30}
//               onChange={handleChange}
//               value={values.name || ''}
//               required />
//           </div> }
//         <div className="auth__input">
//           <label className="auth__input-label">
//             E-mail
//           </label>
//           <input
//             type="email"
//             required name="email"
//             value={values.email || ''}
//             className={`auth__input-row ${errors.email ? 'auth__input-row_error' : ''}`}
//             onChange={handleChange} />
//         </div>
//         <div className="auth__input">
//           <label className="auth__input-label">
//             Пароль
//           </label>
//           <input
//             type="password"
//             required name="password"
//             className={`auth__input-row ${errors.password ? 'auth__input-row_error' : ''}`}
//             onChange={handleChange}
//             value={values.password || ''}
//             minLength={8} />
//           <span className='auth-form__span-error'>
//             {errors[currentInputName] ? errorList[currentInputName] : ''}
//           </span>
//         </div>


//       <div className="auth__submit">
        // <button className="auth__submit-button"  type="submit" disabled={!isValid ? true : false}>
        //   {authSetting.buttonSubmit}
        // </button>
//         <div className="auth__container">
//           <p className="auth__text">
//             {authSetting.Text}
//           </p>
//           <Link to={authSetting.Path}
//             className="auth__link">
//             {authSetting.Link}
//           </Link>
//         </div>
//       </div>
//       </form>
//     </main>
//   )
// }

// export default Auth;


import {Link} from "react-router-dom";
import logo from '../../images/logo.svg'

function Auth ({
                  children,
                  title,
                  buttonText,
                  question,
                  linkText,
                  link,
                  onSubmit,
                  isDisabled,
                  isLoading})  {
    return(
        <div className={'auth'}>
          <div className="auth__forma">
            <Link to={'/'} className='auth__logo'>
                <img src={logo} alt={'Логотип проекта'}/>
            </Link>
            <h3 className='auth__title'>{title}</h3>
            <form className='auth__form'  onSubmit={onSubmit} noValidate>
                {children}
                <button className="auth__submit-button"  type="submit" disabled={isDisabled ? true : false}>
                    {buttonText}
                </button>
            </form>
            <p className="auth__text">
                {question}
                <Link to={link} className='auth__link'>
                    {linkText}
                </Link>
            </p>
            </div>
        </div>
    )
}

export default Auth;
