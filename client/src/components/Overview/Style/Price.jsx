import React from 'react';

const Price = ({ standard, sale }) => {
  const onSale = { "fontWeight": "bold", "color": "red" }
  if (!sale) {
    return (<div className="standard-price">{standard}</div>)
  } else {
    return (
    <div className="price">
      <div className="old-price" style={onSale}><s>{standard}</s><span className="new-price" style={onSale}> {sale}</span></div>
    </div>
    )
  }
}

export default Price;