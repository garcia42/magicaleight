import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Response(props) {
  return <h3>{props.question} <br></br> {props.answer}</h3>;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      question: null,
      answer: null,
      data: null,
      isSubmitted: false,
      currentIndex: -1,
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleQuestionSubmitted = this.handleQuestionSubmitted.bind(this);
  }

  handleQuestionChange(e) {
    this.setState({question: e.target.value});
  }

  handleQuestionSubmitted(e) {
    e.preventDefault();

    const newHistory = this.state.history.concat({
      response: {
        question: this.state.question,
        answer: getAnswer(),
      }
    });

    if (this.state.question) {
      // Reset the question
      this.setState({
        history: newHistory,
        currentIndex: newHistory.length - 1,
        question: null,
        isSubmitted: true,
      });
    }
  }

  render() {
    let responses;
    if (this.state.history.length > 0) {
      const history = this.state.history;
      responses = history.map((step, index) => {
        return (
          <li key={index}>
            <button onClick = {() =>
              this.setState({
                currentIndex: index,
              })
            }>{history[index].response.question}</button>
          </li>
        );
      });
    }

    let currentResponse;
    if (this.state.currentIndex >= 0) {
      console.log("In If")
      currentResponse = this.state.history[this.state.currentIndex].response;
    }
    console.log(currentResponse)

    return (
      <div className="screen">
        {this.state.currentIndex >= 0 && <div className="responses">
          History<br></br>
          {responses && <ol>{responses}</ol>}
        </div>}
        <div className="middle">
          Are you ready to see your future?
          <form className="form-style-4" action="#" onSubmit={() => {}}>
            <label>
              <span>Enter Your Question</span><input type="text" name="field1" required={true} onChange={this.handleQuestionChange} />
            </label>
              <label><span> </span><input type="submit" value="Ask and Receive your Future" onClick={this.handleQuestionSubmitted}/></label>
          </form>
        </div>
        <div className="answer">
        {this.state.isSubmitted && !(typeof currentResponse == "undefined") && <Response question={currentResponse.question} answer={currentResponse.answer}/>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    console.log(response);
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
}

function getAnswer() {
  var randInt = Math.floor(Math.random() * 19);
  var answers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
  ];
  return answers[randInt];
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
export default App;
