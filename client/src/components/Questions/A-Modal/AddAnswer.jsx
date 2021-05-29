import React from 'react';
import Modal from 'react-modal';
import AnswerInput from '../A-Modal/AnswerInput.jsx';
import AuthFields from '../Q-Modal/AuthFields.jsx';
import EmptyFields from '../Q-Modal/EmptyFields.jsx';
import $ from 'jquery';
import WidgetContext from '../../WidgetContext.jsx';
import { Token } from '../../../../../config.js'


if (process.env.NODE_ENV !== 'test')  Modal.setAppElement('#app');



class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickname: '',
      email: '',
      validEmail: true,
      photos: [],
      empty: false
    }
    this.resetModal = this.resetModal.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNickname = this.handleNickname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  resetModal() {
    this.props.closeModal();
    this.setState({
      answer: '',
      nickname: '',
      email: '',
      validEmail: true,
      photos: [],
      empty: []
    })
  }

  handleAnswer(e) {
    this.setState({
      answer: e.target.value
    })
  }

  handleNickname(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  handleEmail(e) {
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(e.target.value.match(mailformat)) {
      this.setState({
        email: e.target.value,
        validEmail: true
      })
    } else {
      this.setState({
        email: '',
        validEmail: false
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    var data = {
      body: this.state.answer,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.photos
    }

    var emptyFields = [];
    if (data.body === '') {
      emptyFields.push('Question')
    }
    if (data.name === '') {
      emptyFields.push('Nickname')
    }
    if (data.email === '') {
      emptyFields.push('Email')
    }

    if (emptyFields.length) {
      this.setState({
        empty: emptyFields
      })
    } else {
      console.log(data)
      $.ajax({
        'type': 'POST',
        'headers': {Authorization: Token},
        'url': `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${this.props.questionId}/answers`,
        'data': JSON.stringify(data),
        'contentType': 'application/json',
        'success': () => {this.resetModal();},
        'error': (err) => {console.log(err);}
      })
    }
  }



  render() {
    var modalMargin = (window.innerHeight * 0.5) - 350;
    if (modalMargin < 0) {modalMargin = 0;}

    return (
      <WidgetContext.Consumer>
        {({addWidgetName}) => {
          return (
            <Modal
              isOpen={this.props.showModal}
              className='answer-add-modal'
              contentLabel='Add Answer'
              onRequestClose={this.resetModal}
              style={{'content': {'marginTop': modalMargin + 'px'}}}
              >
              <div {...addWidgetName()}
              className='answer-add-header'
              style={{'display': 'grid', 'gridTemplateColumns': 'auto auto'}}>

                <div className='answer-add-title'>Submit your Answer</div>
                <div {...addWidgetName()} className='btn-answer-add-close' onClick={this.resetModal}>X</div>
                <div className='answer-add-subtitle'>{this.props.name}: {this.props.question}</div>

              </div>

                <div {...addWidgetName()} className='answer-add-form'>
                  <AnswerInput handleAnswer={this.handleAnswer}/> <br/>
                  <span>Upload Pictures</span><br/>
                  <input type='text'></input>
                  <button>Upload</button> <br/><br/>
                  <AuthFields handleNickname={this.handleNickname} handleEmail={this.handleEmail} validEmail={this.state.validEmail}/> <br/>

                  <EmptyFields emptyFields={this.state.empty}/>

                  <button {...addWidgetName()} onClick={this.submitForm}>Submit</button>


                </div>


            </Modal>
        )
      }}
      </WidgetContext.Consumer>
    )
  }



}

export default AddAnswer;