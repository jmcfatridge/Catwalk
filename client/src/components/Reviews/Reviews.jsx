import React from 'react';
import ReviewList from './ReviewList/ReviewList.jsx';
import RatingBreakdown from './Ratings/RatingBreakdown.jsx';
import WidgetContext from '../WidgetContext.jsx'

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: [false, false, false, false, false]
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  /**
   * Toggles the index of the filter array on and off
   * Each index represents a number of stars (index + 1)
   * @param {index of the filter array to toggle} index
   */

  toggleFilter(index) {
    var newFilter = this.state.filter.slice(0, this.state.filter.length);
    newFilter[index] = !newFilter[index];
    this.setState({filter: newFilter})
  }

  removeFilters() {
    this.setState({
      filter: [false, false, false, false, false]
    })
  }

  render() {
    return (
      <WidgetContext.Consumer>
        {({addWidgetName}) => {
          return(

            <div {...addWidgetName()} className='review-widget' data-testid='reviews' id="reviews">
              <div className='review-title section-title'>Ratings &amp; Reviews </div>

              <RatingBreakdown
                average={this.props.average}
                reviewMeta={this.props.reviewMeta}
                toggleFilter={this.toggleFilter}
                removeFilters={this.removeFilters}
                filter={this.state.filter}/>

              {/* filler for center column */}
              <div className='review-widget-column-filler'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

              <ReviewList
                productId = {this.props.productId}
                product = {this.props.product}
                reviewMeta={this.props.reviewMeta}
                filter={this.state.filter}
                toggleFilter={this.toggleFilter}
                getReviewMeta={this.props.getReviewMeta}
                updateNumberOfReviews={this.props.updateNumberOfReviews}/>
            </div>

          )
        }}
      </WidgetContext.Consumer>);
  }
}

export default Reviews;