import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const google = window.google;
    new google.maps.Map(this.mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 8
    });
  }

  render() {
    return (
      <div ref={this.mapRef} style={{ height: '100%', width: '100%' }} />
    );
  }
}

export default Map;