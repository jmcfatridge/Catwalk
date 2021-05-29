import React from 'react';
import QuestionsList from '../components/QuestionsList.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    // state for input
    this.state = {
      filtered: false,
      filter: '',
      questions: this.props.questions
    }
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  // function that handes change of input value
  onSearchChange(e) {

    this.setState({
      filter: e.target.value
    })

    if (e.target.value.length > 2) {
      var filteredQuestions = this.props.questions.filter(question => question.question_body.toLowerCase().includes(e.target.value.toLowerCase()))
      this.setState({
        questions: filteredQuestions,
        filtered: true
      })

    } else if (e.target.value.length < 2.1) {
      this.setState({
        filtered: false,
        questions: this.props.questions
      })
    }
  }


  render() {
      return (
        // input for filter
        <div className="search-questions-div">
          <input style={{
            // 'width': '75%',
            // 'padding': '12px 15px',
            // 'margin': '20px'
          }}id="searchQuestions" placeholder="Have a question? Search for answers..." type="text" value={this.state.filter} onChange={this.onSearchChange}></input>

          <div>
            <QuestionsList
            questions={this.state.questions}
            filteredQuestions={this.state.questions}
            filtered={this.state.filtered}
            name={this.props.name}
            loadMore={this.props.loadMore}/>
          </div>
        </div>
      )
  }


}

export default Search;