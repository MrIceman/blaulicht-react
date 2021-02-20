import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { Button, Card } from "antd";
import { Wrapper } from "../../../core/custom-elements"
import Slider from "react-slick";
import styles from './Cover.module.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const settings = {
  infinite: false,
  slidesToShow: 1,
  arrows: false,
  centerMode: true,
}

export const Cover = () => {

  const dispatch = useDispatch()
  const [event, setEvent] = useState()
  const [map, setMap] = useState()

  useEffect(() => {
    api.get('/external').then(res => {
        setEvent(res.data.result)
        console.log(res.data.result)
    })
  }, [dispatch])

  const LocationMarker = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
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

  const fireLocationEvent = (map) => {
    map.locate()
  }

  return (
    <Wrapper>
      <MapContainer
      center={{ lat: 52.373920, lng: 9.73 }}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={setMap}>
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


      <div className={styles.bottomNavBar}>
        <Slider className={styles.slider} {...settings} >
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className={styles.card}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Slider>
      </div>
  </Wrapper>
  );
}
