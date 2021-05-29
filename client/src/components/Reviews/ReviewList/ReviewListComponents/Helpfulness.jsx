import React from 'react';
import $ from 'jquery';
import { Token } from '../../../../../../config.js';
import WidgetContext from '../../../WidgetContext.jsx';

class Helpfulness extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      reported: false
    };
    this.updateHelpful = this.updateHelpful.bind(this);
    this.updateReport = this.updateReport.bind(this);
  }

  updateHelpful() {
    this.setState({
      selected: true
    });

    $.ajax({
      type: 'PUT',
      headers: {Authorization: Token},
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${this.props.review.review_id}/helpful`
    })
  }

  updateReport() {
    this.setState({
      reported: true
    });
    $.ajax({
      type: 'PUT',
      headers: {Authorization: Token},
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${this.props.review.review_id}/report`
    })
  }

  reportedState() {
    if (!this.state.reported) {
      return (
        <u className='review-tile-report-false' onClick={this.updateReport}>Report</u>
      )
    } else {
      return (<u className='review-tile-report-true'>Reported</u>);
    }
  }

  selectedState() {
    if (!this.state.selected) {
      return (
        <WidgetContext.Consumer>
          {({addWidgetName}) => {
            return (
              <span  className='review-tile-helpfulness-false review-tile-element'>
                Helpful?&nbsp;
                <u {...addWidgetName()} className='review-helpful-yes'
                onClick={this.updateHelpful}>
                  Yes
                </u> ({this.props.review.helpfulness})
            </span>
            )
          }}
        </WidgetContext.Consumer>
      )
    } else {
      return (
        <span className='review-tile-helpfulness-true'>
          Helpful ({this.props.review.helpfulness + 1})
        </span>
      )
    }
  }

  render() {
    return (
    <div className='review-tile-helpfulness-and-report  review-tile-element'
    style={{
      'fontSize': '90%',
      'color': 'gray'
    }}>
      {this.selectedState()} | {this.reportedState()}
    </div>);
  }
}

export default Helpfulness;