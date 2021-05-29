import React from 'react';

var req = () => {
  return <span className='required'>*</span>
}

const AnswerInput = (props) => (
  <div>
    <label>{req()}Answer</label>
    <div><input className='answer-add-body' name='body' maxLength='1000' onChange={props.handleAnswer}></input></div>

  </div>
)

export default AnswerInput;