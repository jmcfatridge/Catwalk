import React from 'react';
import HistogramEntry from './HistogramEntry.jsx';

class Histogram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ratingsFull: [0,0,0,0,0],
      total: 0
    };
    this.updateRatingsFull = this.updateRatingsFull.bind(this);
  }

  componentDidMount() {
    if (this.props.ratings !== null) {
      this.updateRatingsFull();
    }
  }

  componentDidUpdate(oldProps) {
    if(this.props.ratings!== oldProps.ratings) {
      this.updateRatingsFull();
    }
  }

  updateRatingsFull() {
    var newRatingsFull = this.state.ratingsFull;
    var total = 0;
    for (var key in this.props.ratings) {
      newRatingsFull[5 - (parseInt(key))] = parseInt(this.props.ratings[key])
      total += parseInt(this.props.ratings[key])
    }

    this.setState({
      ratingsFull: newRatingsFull,
      total: total
    })
  }

  render() {

    if (this.state.ratingsFull) {
      return (
      <div className='rating-hist'>
        {this.state.ratingsFull.map((rating, i) => {
          return (<HistogramEntry
            order = {i}
            key={'histogram-entry-' + i}
            total={this.state.total}
            rating={rating}
            toggleFilter = {this.props.toggleFilter}/>);
        })}
      </div>);
    } else {
      return (<div>NO DATA</div>)
    }

  }
}

export default Histogram;