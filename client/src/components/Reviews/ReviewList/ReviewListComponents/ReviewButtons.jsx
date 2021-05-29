import React, { useState } from 'react';
import WidgetContext from '../../../WidgetContext.jsx';
import AddReview from './Modal/AddReview.jsx';

const ReviewButtons = (props) => {

  const [show, setShow] = useState(false);
  return (
  <React.Fragment>
    <WidgetContext.Consumer>
      {({addWidgetName}) => {
        return (
          props.displayedData.length < props.filteredData.length ?
            <button {...addWidgetName()} className='btn btn-reviews btn-more-reviews'
            onClick={props.updateMoreReviews}>
              MORE REVIEWS
            </button>
            : <span id='no-more-reviews'/>
          )
        }
      }
    </WidgetContext.Consumer>

    <button className='btn btn-reviews btn-add-reviews'
    onClick={() => {setShow(true);}}>
      ADD A REVIEW +
    </button>

    <AddReview
      show={show}
      closeModal={() => {setShow(false)}}
      reviewMeta={props.reviewMeta}
      productId={props.productId}
      product={props.product}
      updateReviewData={props.updateReviewData}
      getReviewMeta={props.getReviewMeta}/>
  </React.Fragment>)
}

export default ReviewButtons;