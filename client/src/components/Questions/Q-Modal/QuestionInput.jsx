import React from 'react';

var req = () => {
  return <span className='required'>*</span>
}

const QuestionInput = (props) => (
  <div>
    <label>{req()}Question</label>
    <div><input className='question-add-body' name='body' maxLength='1000' onChange={props.handleQuestion}></input></div>

  </div>
)

export default QuestionInput;