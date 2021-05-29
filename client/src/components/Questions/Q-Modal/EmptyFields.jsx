import React from 'react';

const EmptyFields = (props) => {
  if (props.emptyFields.length) {
    return (
      <div className='q-a-add-empty'>
        <b>!! Please enter the following fields:</b><br/>
        {props.emptyFields.map((field, i) => {
          return (<div className='q-a-add-empty-field-required' key={'empty-' + i}>
            {field}
          </div>)
        })}
      </div>
    )
  } else {
    return null;
  }
}

export default EmptyFields;