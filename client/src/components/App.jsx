import React, {Suspense} from 'react';
import $ from 'jquery';
import { Token } from '../../../config.js';
import { WidgetProvider } from './WidgetContext.jsx'

const Header = React.lazy(() => import('./Header/Header.jsx'));
const Overview = React.lazy(() => import('./Overview/Overview.jsx'));
const Reviews = React.lazy(() => import('./Reviews/Reviews.jsx'));
const Questions = React.lazy(() => import('./Questions/Questions.jsx'));

class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      allProducts: null,
      product: null,
      productStyles: null,
      productId: null,
      questions: null,
      reviewMeta: null,
      averageReview: null,
      numberOfReviews: 0
    };
    this.getProducts = this.getProducts.bind(this);
    this.getProductDetails = this.getProductDetails.bind(this);
    this.getProductStyle = this.getProductStyle.bind(this);
    this.updateProductId = this.updateProductId.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.getAverageReview = this.getAverageReview.bind(this);
    this.initializeGetReviewMeta = this.initializeGetReviewMeta.bind(this);
    this.initializeGetQuestions = this.initializeGetQuestions.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.updateNumberOfReviews = this.updateNumberOfReviews.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  updateNumberOfReviews(num) {
    this.setState({
      numberOfReviews: num
    })
  }

  getProducts() {
    $.get({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',
      headers: { Authorization: Token },
      success: (data) =>  {
        this.getAllData(data)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProductDetails(id) {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`,
        headers: { Authorization: Token },
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  getProductStyle(id) {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`,
        headers: { Authorization: Token },
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  updateProductId(productId) {
    this.setState({
      productId: productId
    });
  }

  getAllData (data) {
    var id = data[0].id;
    Promise.all([
      this.initializeGetQuestions(id),
      this.initializeGetReviewMeta(id),
      this.getProductDetails(id),
      this.getProductStyle(id)
    ]).then(responses => {
      var averageReview = this.getAverageReview(responses[1].ratings)
      this.setState({
        allProducts: data,
        productId: id,
        questions: responses[0].results,
        reviewMeta: responses[1],
        product: responses[2],
        productStyles: responses[3],
        averageReview: averageReview
      })
    }).catch(err => {
      console.log(err);
    })
  }

  initializeGetQuestions(id) {
    return new Promise ((resolve, reject) => {
      $.ajax({

        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/`,
        headers: {Authorization: Token},
        data: {'product_id': id},
        datatype: 'json',
        success: (data) => {
          resolve(data)
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  getQuestions(id) {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/`,
      headers: { Authorization: Token },
      data: { 'product_id': id },
      success: (data) => {
        this.setState({ questions: data.results })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  initializeGetReviewMeta(productId) {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta`,
        headers: { Authorization: Token },
        data: { 'product_id': productId },
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  getReviewMeta(productId) {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta`,
      headers: { Authorization: Token },
      data: { 'product_id': productId },
      success: (data) => {
        this.setState({ reviewMeta: data })
        this.getAverageReview(data.ratings)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAverageReview(reviews) {
    var totalReviews = 0;
    var combinedReviews = 0;
    for (var key in reviews) {
      totalReviews += parseInt(reviews[key]);
      combinedReviews += key * parseInt(reviews[key]);
    }

    return (combinedReviews / totalReviews) || 0
  }

  render() {
    return (
      <div className='app'>
        <Suspense fallback={<div>Loading...</div>}>
        <Header />

        {/* overview */}
        <WidgetProvider widget='product overview'>
          <Overview
            product={this.state.product}
            styles={this.state.productStyles}
            average={this.state.averageReview}
            numberOfReviews={this.state.numberOfReviews}/>
        </WidgetProvider>
        {/* question */}
        <WidgetProvider widget='questions and answers'>
          <Questions
          productId={this.state.productId}
          questions={this.state.questions}
          product={this.state.product}
          getQuestions={this.getQuestions}/>
        </WidgetProvider>

        {/* reviews */}
        <WidgetProvider widget='rating and reviews'>
          <Reviews productId={this.state.productId} reviewMeta={this.state.reviewMeta}
            average={this.state.averageReview} product={this.state.product}
            getReviewMeta={this.getReviewMeta}
            updateNumberOfReviews={this.updateNumberOfReviews} />
        </WidgetProvider>
        </Suspense>
      </div>
    );
  }
}

export default App;