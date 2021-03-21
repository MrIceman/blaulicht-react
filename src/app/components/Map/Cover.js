import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { Button, Card } from "antd";
import { LogoutOutlined, ShareAltOutlined, UpOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import styles from './Cover.module.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const Cover = () => {

  const dispatch = useDispatch()
  const [event, setEvent] = useState()
  //const [showItems, setShowItems] = useState(50)
  const [map, setMap] = useState()
  const sliderRef = useRef(null)
  const [bottomNavBarVisible, setBottomNavBarVisible] = useState(true)

  const settings = {
    infinite: false,
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
    lazyLoad: true,
  }

  useEffect(() => {
    api.get('/external').then(res => {
        setEvent(res.data.result)
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

  const openMarker = (lat, lng) => {
    map.flyTo({lat, lng})
  }

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

  /*const fireLocationEvent = () => {
    map.locate()
  }*/

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
    <div>
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

      <div className={styles.parent}>
        <div className={styles.testSection} style={!bottomNavBarVisible ? {bottom:'0px'} : {bottom:'-220px'}}>
        <Button className={styles.testSection__button} onClick={() => setBottomNavBarVisible(!bottomNavBarVisible)} type="primary" shape="round" style={!bottomNavBarVisible ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg'}} icon={<UpOutlined />} size="large"/>
          <div className={styles.bottomNavBar}>
            <Slider className={styles.slider} {...settings} ref={sliderRef}>
              {event && event/*.slice(0, showItems)*/.map((entry) => (
                <Card key={entry.id} className={styles.card} onClick={() => openMarker(entry.lat, entry.lng)}>
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
        </div>
      </div>
  </div>
  );
}
