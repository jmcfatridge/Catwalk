import React from 'react';

const Arrow = ({direction, handleArrowClick}) => {
  return (
      <div
        id={direction}
        className={`slide-arrow ${direction}`}
        name={direction}
        onClick={handleArrowClick}
        style={{"backgroundImage": "url(arrow3.png)", "backgroundPosition": "center", "backgroundSize": "100% 100%"}}>
          &nbsp;
      </div>
  )
}

export default Arrow;