import React from 'react';
import moment from 'moment';
import { Token } from '../../../config.js';

const WidgetContext = React.createContext({});

function postAnalytics(widget, selector) {
  var postdata = {
    element: selector,
    widget: widget,
    time: moment().format()
  }
  fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/interactions', {
    method: 'POST',
    body: JSON.stringify(postdata),
    headers: {Authorization: Token, 'Content-Type': 'application/json'}
  })
  .then((response) => {
    // console.log(response)
  })
  .catch((err) => {
    console.error(err)
  })
}

function getParentWidgetName(element) {
  if(!element) {
    return null
  }
  if(element.dataset && element.dataset.widgetname) {
    return element.dataset.widgetname
  }
  if(element.parentNode) {
    return getParentWidgetName(element.parentNode)
  }
  return null
}

function analyticsClick(event) {
  var tagName = event.target.tagName;
  var classList = event.target.classList.value.split(' ').join('.')
  if (classList) classList = '.' + classList;
  var id = event.target.id;
  if (id) id = '.' + id

  var selector = tagName + id + classList;
  var widgetName = getParentWidgetName(event.target)

  if (selector === 'DIV.ReactModal__Overlay.ReactModal__Overlay--after-open') {
    widgetName = 'overlay';
  }

  // console.dir(event.target)
  // console.log(selector)
  // console.log(widgetName)

  postAnalytics(widgetName, selector);
}



window.addEventListener("click", analyticsClick);

class WidgetProvider extends React.Component {

  render () {
    const value = {
      addWidgetName: (widgetName) => ({
        'data-widgetname': this.props.widget || widgetName
      })
    };

    return(
      <WidgetContext.Provider value={value}>
        {this.props.children}
      </WidgetContext.Provider>
    )
  }
}

export { WidgetProvider };
export default WidgetContext;
