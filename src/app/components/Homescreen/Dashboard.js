import React from 'react';
import { Wrapper } from '../../../core/custom-elements';
import { Header } from '../Header/Header';
import * as selectors from '../../selectors';
import { useSelector } from 'react-redux';
import { navbarEntries } from '../../navbarEntries';


export const Dashboard = () => {

    const currentMenu = useSelector(selectors.getCurrMenu)

    return (
        <Wrapper>
            
            <Header name={navbarEntries.find(entry => entry.key === currentMenu).name} />

            {navbarEntries.find(entry => entry.key === currentMenu).screen}
            
        </Wrapper>
    );

};