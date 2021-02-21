import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { Button, Card } from "antd";
import { Wrapper } from "../../../core/custom-elements"
import { LogoutOutlined, ShareAltOutlined } from '@ant-design/icons';
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
  const sliderRef = useRef(null)

  useEffect(() => {
    api.get('/external').then(res => {
        setEvent(res.data.result)
        console.log(res.data.result)
    })
  }, [dispatch])

  const scroll = useCallback(
    y => {
      if (y > 0) {
        return sliderRef?.current?.slickNext();
      } else {
        return sliderRef?.current?.slickPrev();
      }
    },
    [sliderRef]
  );
 useEffect(() => {
    window.addEventListener("wheel", e => {
      scroll(e.deltaY);
    });
  }, [scroll]);

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

  const getDate = (test) => {
    const date = new Date(test*1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).substr(-2);
    const day = ("0" + date.getDate()).substr(-2);
    const hour = ("0" + date.getHours()).substr(-2);
    const minutes = ("0" + date.getMinutes()).substr(-2);
    const seconds = ("0" + date.getSeconds()).substr(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
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
        <Slider className={styles.slider} {...settings} ref={sliderRef}>
          {event && event.map((entry) => (
            <Card key={entry.id} className={styles.card}>
              <div className={styles.card__title}>{entry.title}</div>
              <div className={styles.card__description}>
                {entry.classification_name}
                <br/>
                {entry.street}, {entry.city}
                <br/>
                {getDate(entry.date)}
              </div>
              <div className={styles.card__controls}>
                <Button className={styles.card__controls__button} type="primary" shape="round" icon={<LogoutOutlined />} size="middle">Details</Button>
                <Button className={styles.card__controls__button} type="default" shape="round" icon={<ShareAltOutlined />} size="middle">Share</Button>
              </div>
            </Card>
          ))}
        </Slider>
      </div>
  </Wrapper>
  );
}
