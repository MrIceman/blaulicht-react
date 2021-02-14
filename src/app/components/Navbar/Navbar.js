import React from "react";
import { Navicon } from "./Navicon";
import styles from './Navbar.module.css'
import { navbarEntries } from '../../navbarEntries';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const Navbar = () => {

  const dispatch = useDispatch()
  const currentMenu = useSelector(selectors.getCurrMenu)

  const select = (item) => {
    dispatch(actions.setCurrMenu(item.key))
  };

  return (
    <div className={styles.navbar}>
      {navbarEntries.map((entry) => (
          <div key={entry.key} onClick={() => select(entry)} className={styles.navicon} style={ currentMenu === entry.key ? {backgroundColor:entry.color} : null}>
            <Navicon alt={entry.name} invert={currentMenu === entry.key ? true : false} icon={entry.icon} width={entry.width} height={entry.height}/>
          </div>
        ))}
    </div>
  );
}
