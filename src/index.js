import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      answer: null,
      data: null,
    };
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

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    var welcome = 'Hello ' + (this.state.username ? this.state.username : 'User');

    return (
      <div className="screen">
        <div className="hello">
        {welcome}
        <br></br>
        Are you ready to see your future?
        </div>
        {this.state.username &&
        <form className="form-style-4" action="#" onSubmit={() => {}}>
          <label>
            <span>Enter Your Question</span><input type="text" name="field1" required={true} />
          </label>
            <label><span> </span><input type="submit" value="Ask and Receive your Future" onClick={() => {
              this.setState({
                answer: 'YES',
              });
          }}/></label>
        </form>
        }
        {!this.state.username &&
        <div className="facebook">
          <FacebookLogin
            appId="868688626897033"
            autoLoad={false}
            fields="name,email,picture"
            callback={(response) => {
              console.log(response);
              this.setState({
                username: response.name,
                email: response.email,
              })
            }} />
        </div>}
        <div className="answer">
        {this.state.answer}
        </div>
        {this.state.data}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
export default App;
