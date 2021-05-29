import React from 'react';

const EmptyFields = (props) => {
  if (props.empty.length) {
    return (
      <div className='review-add-empty'>
        <b className='review-add-empty-header'>‼ Please enter the following fields:</b><br/>
        {props.empty.map((val, i) => {
          return (<div className='review-add-empty-field required' key={'empty-' + i}>{val}</div>)
        })}
        {}
      </div>
    )
  } else {
    return null;
  }

}

export default EmptyFields;