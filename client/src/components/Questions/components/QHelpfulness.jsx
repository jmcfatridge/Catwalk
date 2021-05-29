import React from 'react';
import $ from 'jquery';
import AddAnswer from '../A-Modal/AddAnswer.jsx';
import { Token } from '../../../../../config.js';

class QHelpfulness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: this.props.question.question_id,
      selected: false,
      showModal: false
    }
    this.updateHelpful = this.updateHelpful.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  updateHelpful() {
    this.setState({
      selected: true
    })

    $.ajax({
      type: 'PUT',
      headers: {Authorization: Token},
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${this.state.questionId}/helpful`
    })
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    if (!this.state.selected) {
      return (
        <div className='helpful-add-answer' style={{display:'inline-block'}}>
          Helpful? <u className='helpful-yes'
          onClick={this.updateHelpful}
          >Yes</u> ({this.props.question.question_helpfulness}) | <u
            className='helpful-add-answer-btn'
            onClick={() => {this.showModal();}}>Add Answer</u>

        <AddAnswer
        showModal={this.state.showModal}
        closeModal={this.closeModal}
        questionId={this.state.questionId}
        question={this.props.question.question_body}
        name={this.props.name}
        />
        </div>
      )
    } else {
      return (
        <div className='helpful-add-answer' style={{display:'inline-block'}}>
          Helpful ({this.props.question.question_helpfulness + 1}) | <u
            className='helpful-add-answer-btn'
            onClick={() => {this.showModal();}}>Add Answer</u>

        <AddAnswer
        showModal={this.state.showModal}
        closeModal={this.closeModal}
        questionId={this.state.questionId}
        name={this.props.name}
        />
        </div>
      )
    }
  }


}

export default QHelpfulness;