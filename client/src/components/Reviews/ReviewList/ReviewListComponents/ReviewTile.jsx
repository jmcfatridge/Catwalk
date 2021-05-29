import React from 'react';
import StarRating from '../../../starRating.jsx';
import Photos from './Photos.jsx';
import Helpfulness from './Helpfulness.jsx';
import ReviewBody from './ReviewBody.jsx';
import moment from 'moment';

const ReviewTile = (props) => (
  <div className='review-list-tile'
    style={{
      'borderBottom': 'solid 1px gray',
      'marginTop': '20px',
      'fontSize': '90%'
    }}>


    {/* -------------------------*/}
    <div className='review-tile-header review-tile-element'
    style={{
      'display': 'grid',
      'gridTemplateColumns': '5fr auto'}}>

      <StarRating rating = {props.review.rating}/>
      <div className='review-tile-user-and-date'
      style={{
        'justifySelf': 'end',
        'color': 'gray'}}>
        {props.review.reviewer_name},&nbsp;&nbsp;
        {moment(props.review.date).format("MMMM Do, YYYY")}
      </div>
    </div>

    {/* -------------------------*/}

    {props.review.summary ?
    <div className='review-tile-summary review-tile-element'>
      <b className='review-tile-summary'
      style={{
        'display': 'block',
        'fontSize': '20px',
        'height': '30px',
        'whiteSpace': 'nowrap',
        'overflow': 'hidden',
        'textOverflow': 'ellipsis',
        'wordWrap': 'break-word'
        }}>{props.review.summary}</b></div> : '' }

    {/* -------------------------*/}

    {/* <div className='review-tile-body review-tile-element'>
      {props.review.body} </div> */}
    <ReviewBody body={props.review.body} />

    {/* -------------------------*/}

    <Photos photoList = {props.review.photos}/>

    {/* -------------------------*/}

    {props.review.recommend ?
    <div className='review-tile-recommend review-tile-element'>
      ✓ I recommend this item</div> : '' }

    {/* -------------------------*/}

    {props.review.response ?
    <div className='review-tile-response review-tile-element'
    style={{
      'backgroundColor': '#f0f0f0',
      'padding': '20px'
    }}>
      <b className='review-tile-response'>Response:</b><br/><br/>
      {props.review.response}</div> : '' }

    {/* -------------------------*/}

    <Helpfulness
    review={props.review}/>
  </div>
)

export default ReviewTile;