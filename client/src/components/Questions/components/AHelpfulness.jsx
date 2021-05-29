import React from 'react';
import $ from 'jquery';
import Report from '../components/Report-ans.jsx';
import { Token } from '../../../../../config.js';
import WidgetContext from '../../WidgetContext.jsx';

class AHelpfulness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.updateHelpful = this.updateHelpful.bind(this);
  }

  updateHelpful() {
    this.setState({
      selected: true
    })

    $.ajax({
      type: 'PUT',
      headers: {Authorization: Token},
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${this.props.answer.answer_id}/helpful`
    })
  }

  render() {
    if (!this.state.selected) {
      return (
        <WidgetContext.Consumer>
          {({addWidgetName}) => {
            return (
              <div className='answer-helpfulness' style={{display:'inline-block'}}>
                Helpful? <u
                  {...addWidgetName()}
                  className='answer-helpfulness-yes'
                  onClick={this.updateHelpful}>Yes</u> ({this.props.answer.helpfulness})
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <Report answer={this.props.answer}/>
              </div>
            )
          }}
        </WidgetContext.Consumer>
      )
    } else {
      return (
        <div className='answer-helpfulness' style={{display:'inline-block'}}>
          Helpful ({this.props.answer.helpfulness + 1})
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Report answer={this.props.answer}/>
        </div>
      )
    }
  }
}

export default AHelpfulness;