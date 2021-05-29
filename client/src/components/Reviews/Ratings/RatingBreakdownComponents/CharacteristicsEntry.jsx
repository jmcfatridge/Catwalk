import React from 'react';

const CharacteristicsEntry = (props) => (
  <div
    className='rating-char-entry'
    style={{
      'marginTop': '30px',
      'marginBottom': '2px'
    }}>
    {props.char} <br/>

    {/* METER ICON*/}
    <div className='rating-char-entry-meter-icon'
    style={{'position': 'relative'}}>
      <div className='rating-char-entry-meter-icon-pos'
      style={{
        'position': 'absolute',
        'width': '100%',
        'paddingLeft': ((props.value / 5) * 100) + '%',
        'marginLeft': '-8px'
        }}>
          ▼
      </div>

      {/* GRAY METER BOXES */}
      <div className='rating-char-entry-meter'
      style={{
        'display': 'grid',
        'gridTemplateColumns': Array(props.gridSize).fill('1fr').join(' '),
        'columnGap': '3px'
      }}>
        <div className='rating-char-entry-meter-bg'>&nbsp;</div>
        <div className='rating-char-entry-meter-bg'>&nbsp;</div>
        <div className='rating-char-entry-meter-bg'>&nbsp;</div>
        {props.gridSize === 4 ?<div className='rating-char-entry-meter-bg'>&nbsp;</div>: ''}
      </div>
    </div>

    {/* METER LABELS */}
    <div className='rating-char-entry-meter-labels'
    style={{
      'display': 'grid',
      'gridTemplateColumns': '1fr 1fr 1fr',
      'marginTop': '7px',
      'fontSize': '90%',
      'color': '#666666'
    }}>
      <div className='rating-char-entry-meter-label-min' style={{'justifySelf': 'start'}}>{props.minScale}</div>
      <div className='rating-char-entry-meter-label-mid' style={{'justifySelf': 'center'}}>{props.midScale}</div>
      <div className='rating-char-entry-meter-label-max' style={{'justifySelf': 'end'}}>{props.maxScale}</div>
    </div>

  </div>
);

export default CharacteristicsEntry;