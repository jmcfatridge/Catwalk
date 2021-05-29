import React from 'react';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.renderRating = this.renderRating.bind(this)
  }

  nearestQuarter(num){
    var rounded = (Math.round(num * 4) / 4);
    return rounded;
  }

  getFillArray(num) {
    num = num || 0;
    var rating = this.nearestQuarter(num);
    var stars = [];

    for (var i = 0; i < 5; i++) {
      if (rating < 1 && rating > 0) {
        stars.push(rating);
        rating = 0;
      } else if (rating >= 1) {
        stars.push(1);
        rating -= 1;
      } else {
        stars.push(0);
      }
    }

    for (var i = 0; i < 5; i++) {
      if (stars[i] === 0.25) {
        stars[i] = 7;
      } else if (stars[i] === 0.5) {
        stars[i] = 9;
      } else if (stars[i] === 0.75) {
        stars[i] = 11;
      } else if (stars[i] === 1) {
        stars[i] = 18;
      }
    }
    return stars;
  }

  renderRating() {
    return(
    <React.Fragment>
      {this.getFillArray(this.props.rating).map((rating, i) => {
          return (<div className='star-block'
            key={'star-' + i}
            style={{
              'width' : '18px',
              'height' : '18px',
              'display': 'inline-block',
              'position': 'relative'
              }}>

            <div className='star-fill'
              style={{
                'width' : `${parseInt(rating)}px`,
                'height' : '18px',
                'backgroundColor': '#333333'
                }}>

              <img className='star-outline'
              src='star.png'
              alt='static star rating'
              style={{
                'width' : '18px',
                'height' : '18px',
                'display': 'inline-block'
                }}>
              </img>

            </div>
          </div>)
        })}
    </React.Fragment>
    )
  }

  render() {
    if (this.props.link) {
      return(
        <a href={'#' + this.props.link} className='star-rating'>
          {this.renderRating()}
        </a>
      )
    } else {
      return (
        <div className='star-rating'>
          {this.renderRating()}
        </div>
      )
    }
  }
}

export default StarRating;