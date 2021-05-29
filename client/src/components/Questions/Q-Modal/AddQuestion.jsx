import React from 'react';
import Modal from 'react-modal';
import QuestionInput from '../Q-Modal/QuestionInput.jsx';
import AuthFields from '../Q-Modal/AuthFields.jsx';
import EmptyFields from '../Q-Modal/EmptyFields.jsx';
import $ from 'jquery';
import { Token } from '/config.js';
import WidgetContext from '../../WidgetContext.jsx';
if (process.env.NODE_ENV !== 'test')  Modal.setAppElement('#app');

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: '',
      validEmail: true,
      empty: []
    }
    this.resetModal = this.resetModal.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleNickname = this.handleNickname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  resetModal() {
    this.props.closeModal();
    this.setState({
      question: '',
      nickname: '',
      email: '',
      validEmail: true,
      empty: []
    })
  }

  handleQuestion(e) {
    this.setState({
      question: e.target.value
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
      body: this.state.question,
      name: this.state.nickname,
      email: this.state.email,
      product_id: this.props.productId
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
      $.ajax({
        'type': 'POST',
        'headers': {Authorization: Token},
        'url': 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions',
        'data': JSON.stringify(data),
        'contentType': 'application/json',
        'success': (body) => {
          this.resetModal();
          this.props.getQuestions(this.props.productId);
        },
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
            isOpen={this.props.show}
            className='question-add-modal'
            contentLabel='Add Question'
            onRequestClose={this.resetModal}
            style={{'content': {'marginTop': modalMargin + 'px'}}}
            >

                  <div
                  {...addWidgetName()}
                  className='question-add-header'
                  style={{'display': 'grid', 'gridTemplateColumns': 'auto auto'}}>

                    <div className='question-add-title'>Ask Your Question</div>
                    <div {...addWidgetName()}className='btn-question-add-close' onClick={this.resetModal}>X</div>
                    <div className='question-add-subtitle'>About the {this.props.name}</div>

                  </div>
                  <div {...addWidgetName()} className='question-add-form'>

                    <QuestionInput handleQuestion={this.handleQuestion}/><br/>

                    <AuthFields validEmail={this.state.validEmail} handleNickname={this.handleNickname} handleEmail={this.handleEmail}/>

                    <EmptyFields emptyFields={this.state.empty}/>

                <button {...addWidgetName()} onClick={this.submitForm}>Submit</button>
              </div>
            </Modal>
          )
        }}
        </WidgetContext.Consumer>
    );
  }

}

export default AddQuestion;