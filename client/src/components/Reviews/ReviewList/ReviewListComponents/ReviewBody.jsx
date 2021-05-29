import React from 'react';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    }

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState ({
      show: !this.state.show
    });
  }

  render () {
    if (this.props.body.length <= 250) {
      return (
        <div className='review-tile-body review-tile-element'>
          {this.props.body}
        </div>
      )
    } else if (!this.state.show) {
      return (
        <div className='review-tile-body review-tile-element'>
          {this.props.body.substring(0, 250)}
          <div className='review-tile-body-expand'
            onClick={this.toggleShow}>show more</div>
        </div>
      )
    } else if (this.state.show) {
      return(
        <div className='review-tile-body review-tile-element'>
          {this.props.body}
          <div className='review-tile-body-expand'
            onClick={this.toggleShow}>show less</div>
        </div>
      )
    }
  }
}

export default ReviewBody;