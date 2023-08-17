// function MovieButton  ({ onClickHandler, typeClass, children })  {
//   const buttonModificator = typeClass ? 'movie-section__button_saved' : '';

//   return (
//     <button
//       className={`movie-section__button ${buttonModificator}`}
//       type="button" onClick={onClickHandler} >
//       {typeClass ? '' : children}
//     </button>
//   )
// };

// export default MovieButton;


import React, { useEffect, useState } from 'react';

function MovieButton({ onClickHandler, typeClass, children }) {
  const [buttonModificator, setButtonModificator] = useState('');

  useEffect(() => {
    setButtonModificator(typeClass ? 'movie-section__button_saved' : '');
  }, [typeClass]);

  // const onClickHandleer = () => {
  //   onClickHandler();
  //   setButtonModificator(prevState => prevState ? '' : 'movie-section__button_saved');
  // };

  const handleClick = () => {
    onClickHandler();
    setButtonModificator(prevState => prevState ? '' : 'movie-section__button_saved');
  };

  return (
    // <button
    //   className={`movie-section__button ${buttonModificator}`}
    //   type="button" onClick={onClickHandleer} >
    //   {typeClass ? '' : children}
    // </button>
    <button
      className={`movie-section__button ${buttonModificator}`}
      type="button" onClick={handleClick} >
      {typeClass ? '' : children}
    </button >
  )
};

export default MovieButton;
