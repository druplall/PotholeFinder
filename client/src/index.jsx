import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <Button variant='primary'>Click here</Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
