import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from './components/map.jsx';
import WeatherModal from './components/weatherModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWeather: false,
    };
    this.closeWeatherModal = this.closeWeatherModal.bind(this);
  }

  closeWeatherModal() {
    this.setState({
      showWeather: !this.state.showWeather,
    });
  }

  render() {
    return (
      <Container>
        <Navbar collapseOnSelect expand='lg' variant='dark' bg='primary'>
          <Navbar.Brand href=''> Pothole Finder App</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='#createRequest'>Create Request</Nav.Link>
              <Nav.Link href='#viewPendingRequest'>
                View Pending Request
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col>
            <Map></Map>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Button
              style={{ marginTop: '30px' }}
              variant='warning'
              onClick={() => {
                this.setState({
                  showWeather: !this.state.showWeather,
                });
              }}
            >
              Historical Weather Data
            </Button>
            <WeatherModal
              displayModal={this.state.showWeather}
              close={this.closeWeatherModal}
            ></WeatherModal>
          </Col>
          <Col xs={6}>
            <Button style={{ marginTop: '30px' }} variant='info'>
              New York City Budget Data
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
