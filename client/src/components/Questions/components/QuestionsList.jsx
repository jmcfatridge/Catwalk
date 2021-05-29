import React from 'react';
import Answer from '../components/Answer.jsx';
import $ from 'jquery';
import { Token } from '../../../../../config.js';
import QHelpfulness from '../components/QHelpfulness.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      filtered: false,
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.questions !== oldProps.questions) {
      this.setState({
        load: true,
        questions: this.props.questions,
        filtered: false
      })
    }
    if (this.props.filteredQuestions !== oldProps.filteredQuestions) {
      this.setState({
        load: true,
        filtered: true,
      })
    }
  }

  render() {
    var count;
    var list;
    if (!this.props.loadMore) {
      count = 2;
    } else {
      count = this.props.questions.length;
    }


    if (this.props.filtered && this.state.questions.length === 0) {
        return (
          <div>
            No Matches!
          </div>
        )
    } else {
      return (
        // map out 2 individual questions from props.state.data
        <div className='questions-list'>
          {this.state.questions.slice(0, count).map((question, index) =>
            <div className="default-Answer" key={index}>
              <div className='default-answer-header'>
                <b>Q: </b>
                <div className='default-answer-header-details'>
                  <b style={{display:'inline-block'}}>{this.state.questions[index].question_body}</b>

                  <QHelpfulness question={this.state.questions[index]} name={this.props.name} />
                </div>
              </div>
              <Answer questionId={this.state.questions[index].question_id} key={index}/>
            </div>
          )}
        </div>
      )

    }
  }

}

export default QuestionsList;