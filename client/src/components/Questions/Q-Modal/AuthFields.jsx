import React from 'react';

var getInvalidEmailWarning = (validEmail) => {
  if (!validEmail) {
    return (
      <div className='q-a-add-email-invalid'>
        Please enter a valid Email.
      </div>
    )
  }
}

var req = () => {
  return <span className='required'>*</span>
}

const AuthFields = (props) => (
  <div>
    <div>
      <label>{req()}Nickname:</label>

      <input type='text' className='question-add' maxLength='60' placeholder='Example: jackson11!' onChange={props.handleNickname}/>

      <div className='q-a-id-warning'>
        For privacy reasons, do not use your full name or email address
      </div>
    </div>


    <div>
      <label>{req()}Email:</label>
      <input type='email' className='question-add' maxLength ='60' placeholder='Example: jackson11@gmail.com' onChange={props.handleEmail}/>
      {getInvalidEmailWarning(props.validEmail)}
      <div className='q-a-id-warning'>
        For authentication reasons, you will not be emailed
      </div>

    </div>
  </div>
)

export default AuthFields;