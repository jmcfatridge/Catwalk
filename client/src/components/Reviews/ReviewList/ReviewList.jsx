import React from 'react';
import $ from 'jquery';
import { Token } from '../../../../../config.js';
import ReviewTile from './ReviewListComponents/ReviewTile.jsx';
import DropdownSort from './ReviewListComponents/DropdownSort.jsx';
import ReviewButtons from './ReviewListComponents/ReviewButtons.jsx';

class ReviewList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      sort: 'relevant',
      reviewData: null,
      filteredData: [],
      displayedData: [],
      maxReviews: 0
    };
    this.updateReviewData = this.updateReviewData.bind(this);
    this.updateMoreReviews = this.updateMoreReviews.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
  }

  /**
   * updates the productId once it is uploaded
   * updates the filteredData every time the filter is changed
   * @param {*} oldProps
   */
  componentDidUpdate(oldProps) {
    if(this.props.productId !== oldProps.productId) {
      this.updateReviewData(100);
    }

    if(JSON.stringify(this.props.filter) !== JSON.stringify(oldProps.filter)) {
      var filteredData = this.filterReviews(this.state.reviewData);
      this.setState({
        filteredData: filteredData,
        displayedData: filteredData.slice(0, this.state.count)
      })
    }
  }

  /**
   * @param {an array of all reviews} reviews
   * @returns an array of filtered reviews
   */
  filterReviews(reviews) {
    var filteredData = [];

    /**
     * reduces the array of true/false filters to
     * a string of indices where the value of that
     * index is true (the filter is on)
     */
    const reducer = (accumulator, current, index) => {
      if (current){ return accumulator + index; }
       return accumulator;
    }
    var filters = this.props.filter.reduce(reducer, '');

    //updates filteredData with the reviews that apply
    if (filters === '' || filters === '01234'){
      filteredData = reviews;
    } else {
      for (var i = 0; i < reviews.length; i++) {
        if (filters.indexOf(reviews[i].rating - 1) !== -1) {
          filteredData.push(reviews[i])
        }
      }
    }

    return filteredData;
  }

  /**
   * adds 2 reviews to the array of reviews that are displayed
   *
   */
  updateMoreReviews() {
    var twoMore = this.state.count + 2;
    this.setState({
      count: twoMore,
      displayedData: this.state.filteredData.slice(0, twoMore)
    });
  }

  /**
   * re-retrieves data from database with the new sort parameter
   * @param {sort selector event} e
   */
  updateSort(e) {
    this.setState({sort: e.target.value});
    this.updateReviewData(this.state.maxReviews, e.target.value);
  }

  /**
   * Retrieves reviews from the database
   * Contintues increasing the number of reviews that is retrieved
   *    until all are retrieved
   * @param {the number of reviews to retrieve} count
   * @param {the sort parameter} sort
   */
  updateReviewData(count, sort) {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/`,
      headers: {Authorization: Token},
      data: {
        'product_id': this.props.productId,
        'count': count || this.state.count,
        'sort': sort || this.state.sort
      },
      success: (data) => {
        //there are no more reviews to retrieve
        if (data.results.length <= count) {
          var filteredData = this.filterReviews(data.results);
          this.setState({
            reviewData: data.results,
            filteredData: filteredData,
            displayedData: filteredData.slice(0, this.state.count),
            maxReviews: data.results.length
          })
          this.props.updateNumberOfReviews(data.results.length);

        //there are more to retrieve
        } else {
          this.updateReviewData(count + 100);
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  render() {
    if(this.state.displayedData) {
      return (
        <div className='review-list' style={{'overflow': 'hidden', 'minWidth': '375px'}}>

          {/* DROPDOWN MENU */}
          <DropdownSort updateSort={this.updateSort} maxReviews={this.state.maxReviews}/>

          {/* REVIEWS */}
          <div className='review-list-tile-collection'
            style={{'overflow': 'auto', 'maxHeight': '75vh', 'paddingRight': '15px'}}
            >
            {this.state.displayedData.map(element => {
            return (<ReviewTile
              review = {element}
              key = {'review-list=' + element.review_id}
              updateFilteredReviews = {this.updateFilteredReviews}/>);
          })}
          </div>

          <br/>

          {/* BUTTONS */}
          <ReviewButtons displayedData={this.state.displayedData}
            filteredData={this.state.filteredData}
            updateMoreReviews={this.updateMoreReviews}
            updateReviewData={this.updateReviewData}
            {...this.props}/>
          <br/>
        </div>
      );
    } else {
      return <div data-testid='not-rendered'>&nbsp;</div>
    }
  }
}

export default ReviewList;