import React from 'react';

const TextDetail = (props) => (
  <div>
    <label htmlFor='summary' className='review-add-summary-label'>Review Summary </label>
      <input type='text' className='review-add-summary'
      id='summary' name='summary' maxLength='60'
      placeholder='Example: Best purchase ever!'
      onChange={props.handleSummary}/>

    <br/>
    <br/>

    {props.req()}<label htmlFor='body' className='review-add-body-label'>Review body</label>
    <textarea className='review-add-body'
      rows='4' id='body' name='body' maxLength='1000'
      placeholder='Why did you like the product or not?'
      onChange={props.handleBody}></textarea>

    <br/>

    {props.minimumCharacters()}
  </div>
);

export default TextDetail;