import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Photo = (props) => {
  const [displayPhoto, setPhoto] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    console.log('re-render the photo');
  }, [displayPhoto]);

  function cameraControl() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((result) => {
        const mediaStreamTrack = result.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        // console.log(imageCapture);
        imageCapture
          .takePhoto()
          .then((blob) => {
            // Insert image
            return blob;
          })
          .then((blob) => {
            setImageSrc(URL.createObjectURL(blob));
            setPhoto(true);
          })
          .catch((err) => {
            console.log('takePhoto() error: ', err);
          });
      })
      .catch((error) => console.error('getUserMedia() error:', error));
  }

  return (
    <div>
      {cameraControl()}
      {displayPhoto ? (
        <img style={{ height: '200px', width: '325px' }} src={imageSrc} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Photo;
