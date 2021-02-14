import React from "react";
import styles from './Navbar.module.css'

export const Navicon = (props) => {

    return (
        <img className={styles.img} src={props.icon} alt={props.alt} style={props.invert ? {width:props.width, maxHeight:props.height, filter:'invert(0)'} : {maxHeight:props.height, width:props.width}}/>
    );
}
