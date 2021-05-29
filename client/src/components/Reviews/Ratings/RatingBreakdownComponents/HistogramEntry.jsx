import React from 'react';

const HistogramEntry = (props) => (
  <div className='rating-hist-entry'
    style={{
      'display': 'grid',
      'gridTemplateColumns': `60px ${props.rating}fr ${(props.total || 1) - props.rating}fr`,
      'marginBottom': '20px'
    }}>
    <div className={'rating-hist-entry-label-' +  (5 - props.order)}
    onClick={() => {props.toggleFilter(4-props.order)}}>
      <u className={'rating-hist-label rating-hist-label-' +  (5 - props.order)}>{5 - props.order} stars</u>
      </div>
    <div className={'rating-hist-entry-percectage-yes-' + (5 - props.order)}
    style={{
      'backgroundColor': '#90b886',
      'height': '9px',
      'marginTop' : '7px'
    }}></div>
    <div className={'rating-hist-entry-percectage-no-' + (5 - props.order)}
    style={{
      'backgroundColor': '#ededed',
      'height': '9px',
      'marginTop' : '7px'
    }}></div>
  </div>
);


export default HistogramEntry;