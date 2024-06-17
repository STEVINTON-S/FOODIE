import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = '4Z0F7zxXclJyUkI9DphL'; // Your MapTiler access token

const OrderTracking = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=4Z0F7zxXclJyUkI9DphL',
      center: [76.9629, 11.0168], // Coimbatore coordinates
      zoom: 12,
    });

    const locations = [
      { lng: 76.9629, lat: 11.0168, name: 'Coimbatore' },
      { lng: 76.9366, lat: 11.0109, name: 'Peelamedu' },
      { lng: 76.9676, lat: 10.9808, name: 'Podanur' },
      { lng: 76.9558, lat: 11.0162, name: 'Saibaba Colony' },
      { lng: 76.9672, lat: 11.0440, name: 'Ganapathy' },
    ];

    locations.forEach(location => {
      new mapboxgl.Marker({ color: '#FF0000' }) // Red color for highlighted pins
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(location.name)) // Add popups to markers
        .addTo(map);
    });

    // Clean up map on unmount
    return () => map.remove();
  }, []);

  return (
    <div className="map-container">
      <h1>Order Tracking</h1>
      <div className="map-box">
        <div ref={mapContainerRef} className="map-inner"></div>
      </div>
    </div>
  );
};

export default OrderTracking;
