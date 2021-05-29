import React from 'react';
import WidgetContext from '../../../WidgetContext.jsx';

const reduceFilter = (props) => {
  const reducer = (accumulator, current, index) => {
    if (current){ return accumulator + index; }
     return accumulator;
  }
  var filters = props.filter.reduce(reducer, '');

  return filters;
}

const Filter = (props) => (
  <div className='review-filter-view'>
    {props.filter.map((on, i) => {
      if (on) {
        return (
          <div className='review-individual-filter-view' key={'filter-' + i}>
            {i + 1} stars &nbsp;

            <WidgetContext.Consumer>
            {({addWidgetName}) => {
              return (
                <span {...addWidgetName()} className='review-individual-filter-view-x' style={{'cursor':'default'}}
                onClick={() => {
                  props.toggleFilter(i);
                }}>✕</span>
              )
            }}
            </WidgetContext.Consumer>

          </div>
        )
      }
    })}
    {reduceFilter(props) ? <WidgetContext.Consumer>
            {({addWidgetName}) => {
              return (
                <div {...addWidgetName()} className='review-remove-filters'
                  onClick={props.removeFilters}
                  >Remove filters</div>
              )
            }}
            </WidgetContext.Consumer> : null}

  </div>
)

export default Filter;