import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import WeatherAPIKey from '../../../config/weatherAPI.js';
import axios from 'axios';

const WeatherModal = (props) => {
  const [weatherData, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WeatherAPIKey}&query=New York`
      )
      .then((result) => {
        console.log('Getting Weather Data: ', result);
        setWeather(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Modal
      show={props.displayModal}
      onHide={() => {
        props.close();
      }}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Historical Weather Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant='primary'> Click to get current location: </Button>
        {weatherData.length !== 0 ? (
          <div>
            <img src={weatherData.current.weather_icons[0]} />
            <p> Precipitation: {weatherData.current.precip} </p>
          </div>
        ) : (
          ''
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WeatherModal;
