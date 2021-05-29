import React from 'react';

const QuantityForm = ({ style, size, countChange }) => {
  if (!size || !style) {
    return <select className="quantity-form"
                   placeholder=" - "
                   label="Quantity Selection"
                   disabled><option> -- </option></select>
  } else {
    var available = []
    for (var i = 1; i <= style[size].quantity; i++) {
      available.push(i)
    }
    return (
    <select className="quantity-form" onChange={countChange} placeholder=" - ">
      {
        available.map((num) => {
          return <option key={num} title={num} value={num}>{num}</option>
        })
      }
    </select>
    )
  }
}

export default QuantityForm;