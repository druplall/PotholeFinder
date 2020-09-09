import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import GOOGLE_API_KEY from '../../../config/googleAPI.js';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from './modal.jsx';

const Marker = ({ children }) => {
  return children;
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      potHoleLocation: [],
      displayModal: false,
      currentPotHole: {},
    };
    this.displayModalFunction = this.displayModalFunction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNewMarker = this.addNewMarker.bind(this);
  }
  async componentDidMount() {
    const coords = await this.currentLocation();
    //console.log(coords);
    this.setState({
      latitude: coords.lat,
      longitude: coords.long,
    });

    try {
      const getAddress = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${GOOGLE_API_KEY}`
      );

      let getCity = getAddress.data.results[2].formatted_address.split(',');

      const getPotHoles = await axios.get(
        `https://data.cityofnewyork.us/resource/fed5-ydvq.json`,
        {
          params: {
            city: `${getCity[0]}`,
            $LIMIT: 5,
            $WHERE: 'status="Open"',
          },
        }
      );

      console.log('NYC Pothole data: ', getPotHoles);
      this.setState({
        potHoleLocation: getPotHoles.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async currentLocation() {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    console.log('Received user position: ', pos);
    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  }

  displayModalFunction(potHole) {
    this.setState({
      currentPotHole: potHole,
      displayModal: !this.state.displayModal,
    });
  }

  closeModal() {
    this.setState({
      displayModal: !this.state.displayModal,
    });
  }

  async addNewMarker(position) {
    let getCity;
    let getStreetName;
    try {
      const getAddress = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${GOOGLE_API_KEY}`
      );
      console.log(getAddress);
      getCity = getAddress.data.results[2].formatted_address.split(',');
      getStreetName = getAddress.data.results[0].formatted_address.split(',');
    } catch (error) {}

    let tempObject = {
      descriptor: 'UserCreated',
      latitude: position.lat,
      longitude: position.lng,
      street_name: getStreetName[0],
      city: getCity[0],
      created_date: new Date().toLocaleString(),
    };
    let newState = this.state.potHoleLocation.slice();
    newState.push(tempObject);
    console.log('Changing state: ', newState);
    this.setState({
      potHoleLocation: newState,
    });
  }

  render() {
    return (
      <div style={{ height: '90vh', width: '100%', marginTop: '10px' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude,
          }}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude,
          }}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onClick={(position) => {
            console.log(position);
            this.addNewMarker(position);
          }}
        >
          {this.state.potHoleLocation.length !== 0
            ? this.state.potHoleLocation.map((item) => {
                return (
                  <Marker
                    key={item.unique_key}
                    lat={item.latitude}
                    lng={item.longitude}
                  >
                    <span
                      style={{ fontSize: '35px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.displayModalFunction(item);
                      }}
                    >
                      {item.descriptor === 'UserCreated' ? (
                        <span style={{ fontSize: '25px' }}>&#x274C;</span>
                      ) : (
                        <span>&#x2757;</span>
                      )}
                    </span>
                  </Marker>
                );
              })
            : ''}
        </GoogleMap>
        <Modal
          displayModal={this.state.displayModal}
          currentPothole={this.state.currentPotHole}
          close={this.closeModal}
        ></Modal>
      </div>
    );
  }
}

export default Map;
