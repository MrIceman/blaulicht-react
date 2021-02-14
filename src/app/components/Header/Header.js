import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { navbarEntries } from "../../navbarEntries";
import * as selectors from '../../selectors';
import * as actions from '../../actions';
import styles from './Header.module.css'

export const Header = (props) => {

  const dispatch = useDispatch()
  const currentMenu = useSelector(selectors.getCurrMenu)

  const select = (item) => {
    dispatch(actions.setCurrMenu(item.key))
  };

  return (
    <div className={styles.header}>
      {navbarEntries.map((entry) => (
        <div className={styles.title} key={entry.key} onClick={() => select(entry)} style={ currentMenu === entry.key ? {borderBottom:`5px solid ${entry.color}`} : null}>{entry.name}</div>
      ))}
    </div>
  );
}
