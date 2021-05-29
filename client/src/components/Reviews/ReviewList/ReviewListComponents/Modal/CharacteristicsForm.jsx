import React from 'react';

var getCharacteristicSelections = (char) => {
  if (char === 'Size') {
    return ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'];
  }
  if (char === 'Width') {
    return ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
  }
  if (char === 'Comfort') {
    return ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  }
  if (char === 'Quality') {
    return ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
  }
  if (char === 'Length') {
    return ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  }
  if (char === 'Fit') {
    return ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
  }
}

const CharacteristicsForm = (props) => {
  var rows = [];
  for (var char in props.characteristics) {
    var selection = getCharacteristicSelections(char);
    var id = props.characteristics[char].id;
    rows.push(
      <div key={'characteristic-' + char} className='review-add-char-select'>
        <div className={'review-add-char-title review-add-char-title-' + char}>{char}</div>
        <div className='review-add-char-radio'>
          <input type='radio' name={id} value='1' id={`${char}-1`} onClick={props.handleCharSelect}/>
          <label htmlFor={`${char}-1`}>{selection[0]}</label>
        </div>
        <div className='review-add-char-radio'>
          <input type='radio' name={id} value='2' id={`${char}-2`} onClick={props.handleCharSelect}/>
          <label htmlFor={`${char}-2`}>{selection[1]}</label>
        </div>
        <div className='review-add-char-radio'>
          <input type='radio' name={id} value='3' id={`${char}-3`} onClick={props.handleCharSelect}/>
          <label htmlFor={`${char}-3`}>{selection[2]}</label>
        </div>
        <div className='review-add-char-radio'>
          <input type='radio' name={id} value='4' id={`${char}-4`} onClick={props.handleCharSelect}/>
          <label htmlFor={`${char}-4`}>{selection[3]}</label>
        </div>
        <div className='review-add-char-radio'>
          <input type='radio' name={id} value='5' id={`${char}-5`} onClick={props.handleCharSelect}/>
          <label htmlFor={`${char}-5`}>{selection[4]}</label>
        </div>
      </div>
    )
  }
  return (
    <div className='review-add-char-component'>
      {props.req()}Characteristics:
      {rows}
    </div>);
}

export default CharacteristicsForm;