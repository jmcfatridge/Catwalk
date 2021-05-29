import React from 'react';

var getInvalidEmailWarning = (valid) => {
  if(!valid) {
    return(<div className='review-add-email-invalid required'>Please enter a valid email.</div>)
  }
}

const AuthFields = (props) => (
  <div style={{'display': 'grid', 'gridTemplateColumns': 'auto auto'}}>

    <div className='review-add-id-nickname'>
      <label className='review-add-id-label'>{props.req()}Nickname: </label>
      <input type='text' name='nickname'
        className='review-add-id' id='nickname'
        maxLength='60' placeholder='Example: jackson11!'
        onChange={props.handleNickname}/>
      <div className='review-add-id-warning'>
        For privacy reasons, do not use your full name or email address
      </div>
    </div>

    <div className='review-add-id-email'>
      <label className='review-add-id-label'>{props.req()}Email: </label>
      <input type='email' name='email'
        className='review-add-id' id='email'
        maxLength='60' placeholder='Example: jackson11@email.com'
        onChange={props.handleEmail}/>
      {getInvalidEmailWarning(props.validEmail)}
      <div className='review-add-id-warning'>
        For authentication reasons, you will not be emailed
      </div>
    </div>

  </div>
);

export default AuthFields;