import React from 'react';
import $ from 'jquery';
import AHelpfulness from '../components/AHelpfulness.jsx';
import moment from 'moment';
import { Token } from '../../../../../config.js';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      isLoaded: false,
      loadAnswers: false,
      clickLoaded: false,
    }

    this.getAnswers = this.getAnswers.bind(this);
    this.handleClickHideOrLoad = this.handleClickHideOrLoad.bind(this);
    // this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
  }

  componentDidMount() {
    this.getAnswers()
  }

  componentDidUpdate(oldProps) {
    if (this.props.questionId !== oldProps.questionId)
    this.getAnswers();
  }

  getAnswers() {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${this.props.questionId}/answers/`,
      headers: {Authorization: Token},
      success: (data) => {
        this.setState({
          answers: data.results,
          isLoaded: true
        })
      }
    })
  }

  handleClickHideOrLoad() {
    this.setState({clickLoaded: !this.state.clickLoaded})
  }

  render() {
    const {answers, isLoaded, loadAnswers, clickLoaded} = this.state;
    var length;
    var loadAnswersText;
    if (!clickLoaded) {
      length = 2;
      loadAnswersText = 'LOAD MORE ANSWERS';
    } else {
      length = answers.length;
      var loadAnswersText = 'HIDE ANSWERS';
    }
    if (!isLoaded) {
      return <div data-testid='not-rendered'>
        is Loading...
      </div>
    } else if (isLoaded) {
      return (
        // default display two answers for each question
        <div className='answers-list'>
          <div className='answer-individual'>
            {answers.slice(0, length).map((answer, index) =>
              <div className='answers'key={index}>

                <b className='answers-individual-a'>A: </b>
                <div className='answers-individual-text'>
                  {answer.body} <br/>



                  {/* answerer info + helpfulness and report */}
                  <div className='answerer-info'>
                    by {answer.answerer_name},&nbsp;
                    {moment(answer.date).format("MMMM Do, YYYY")}
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <AHelpfulness answer={answers[index]}/>
                  </div>
                </div>
              </div>

            )}

          {/* render 'load more questions' button if there are more answers */}
          <div className='answers-more'>{(answers.length > 2)
          ? <b id='loadMoreAnswersLink' onClick={this.handleClickHideOrLoad}>{loadAnswersText}</b>
          : ''}</div>
          </div>
        </div>
      )
    }
  }
}

export default Answer