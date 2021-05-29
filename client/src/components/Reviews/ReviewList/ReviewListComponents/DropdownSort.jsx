import React from 'react';

const DropdownSort = (props) => (
  <div className='review-list-sort'>
    <label className='review-list-header' htmlFor='review-list-sort-select'>
      {props.maxReviews} reviews, sorted by </label>
    <select className='review-list-sort review-list-sort-select' id='review-list-sort-select'
    onChange={props.updateSort}>
      <option value='relevant'>relevance</option>
      <option value='newest'>newest</option>
      <option value='helpful'>helpful</option>
    </select>
  </div>
)

export default DropdownSort;