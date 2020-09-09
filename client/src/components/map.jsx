import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import GOOGLE_API_KEY from '../../../config/googleAPI.js';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
    };
    this.displayModal.bind(this);
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

  displayModal() {
    console.log('testing');
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
        >
          {this.state.potHoleLocation.length !== 0
            ? this.state.potHoleLocation.map((item) => {
                //console.log(item);
                return (
                  <Marker
                    key={item.unique_key}
                    lat={item.latitude}
                    lng={item.longitude}
                  >
                    {/* <Button variant='primary'>Click here</Button> */}
                    <span style={{ fontSize: '35px' }}>&#10071;</span>
                  </Marker>
                );
              })
            : ''}
        </GoogleMap>
      </div>
    );
  }
}

export default Map;
