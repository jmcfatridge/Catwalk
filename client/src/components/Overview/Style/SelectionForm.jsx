import React from 'react';
import QuantityForm from './QuantityForm.jsx'

const SelectionForm = ({ style, handleSize, size, countChange, addToCart }) => (
  <form className="size_quantity_form">
    <div className='select-size-box'>
      <select className="select-size"
              onChange={handleSize}
              label="Size Selection"
              placeholder="- Select Size -">
        <option value="none-selected">{style.null ? "OUT OF STOCK" : "- Select Size -" }</option>
        {
          Object.keys(style).map((sku) => {
            return <option
                     key={sku}
                     value={sku}
                     title={style[sku].size}>
                        {style[sku].size}
                   </option>
          })
        }
      </select>
    </div>
    <div className='quantity-form-box'>
      <QuantityForm style={style} size={size} countChange={countChange}/>
    </div>
    <br></br>
    <button className="add-to-cart" onClick={addToCart}>Add to Cart <span className='add-to-cart-plus'>+</span></button>
    <button className="share">Share</button>
  </form>
)

export default SelectionForm;