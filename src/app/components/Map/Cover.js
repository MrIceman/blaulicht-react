import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const Cover = () => {

  const dispatch = useDispatch()
  const [event, setEvent] = useState()

  useEffect(() => {
    api.get('/external').then(res => {
        setEvent(res.data.result)
        console.log(res.data.result)
    })
  }, [dispatch])

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      mouseover() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <MapContainer
    center={{ lat: 52.373920, lng: 9.73 }}
    zoom={13}
    scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <LocationMarker />

      {event && event.map((entry) => (
        <Marker key={entry.id} position={{ lat: `${entry.lat}`, lng: `${entry.lng}` }}>
          <Popup>
            {entry.title}
          </Popup>
        </Marker>
      ))}

  </MapContainer>
  );
}
