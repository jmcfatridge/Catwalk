import React from 'react'

var getRating = (ratingNumber) => {
  var ratingArray = new Array(5).fill(false);
  for (var i = 0; i < ratingNumber; i++) {
    ratingArray[i] = true;
  }
  return ratingArray;
}

var getPhrase = (rating) => {
  var phrase = '';
  if (rating === 1) {
    phrase = 'Poor';
  } else if (rating === 2) {
    phrase = 'Fair';
  } else if (rating === 3) {
    phrase = 'Average';
  } else if (rating === 4) {
    phrase = 'Good';
  } else if (rating === 5 || rating === -1) {
    phrase = 'Great';
  }

  return phrase;
}

class DynamicStarRating extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rating: getRating(0),
      hoverRating: getRating(0)
    }
  }


  render() {
    return (
      <div className='review-add-rating'>
        <span className='required'>*</span>
        <span className='review-add-rating-header'>Overall Rating: </span>

        {this.state.hoverRating.map((starState, i) => {
          return (
          <span className={'review-add-rating-star' + (starState === true ? '-on' : '-off') + ' dyn-star-' + i}
            data-testid={'dyn-star-' + i}
            key={'review-add-star-' + i}
            onClick={() => {
              var newRating = getRating(i + 1)
              this.setState({rating: newRating, hoverRating: newRating});
              this.props.handleUpdateRating(i + 1);
            }}
            onMouseOver={() => {
              this.setState({hoverRating: getRating(i + 1)});
            }}
            onMouseLeave={() => {
              this.setState({hoverRating: this.state.rating})
            }}>
            {starState === true ? '★' : '☆'}
          </span>)
        })}

        <span className='review-add-rating-phrase'> {getPhrase(this.state.hoverRating.indexOf(false))}</span>
      </div>
    )
  }
}
export default DynamicStarRating