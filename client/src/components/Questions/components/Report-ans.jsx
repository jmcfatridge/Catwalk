import React from 'react';
import $ from 'jquery';
import { Token } from '../../../../../config.js';
import WidgetContext from '../../WidgetContext.jsx';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
    this.clickReport = this.clickReport.bind(this);
  }

  clickReport() {
    this.setState({
      selected: true
    })

    $.ajax({
      type: 'PUT',
      headers: {Authorization: Token},
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${this.props.answer.answer_id}/report`
    })
  }

  render() {
    if (!this.state.selected) {
      return (
        <WidgetContext.Consumer>
          {({addWidgetName}) => {
            return (
              <u {...addWidgetName()} className='answer-report-false' onClick={this.clickReport}>Report</u>
            )
          }}
        </WidgetContext.Consumer>
      )
    } else {
      return (
        <u>Reported</u>
      )
    }
  }
}

export default Report;