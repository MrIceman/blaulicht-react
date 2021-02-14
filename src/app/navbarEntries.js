import { Cover } from './components/Map/Cover';
import React from 'react';

export const navbarEntries = [
    {
        name: 'Karte',
        key: '1',
        icon: 'assets/video.svg',
        color: '#00FFB1',
        screen: <Cover />,
    },
    {
        name: 'Impressum',
        key: '2',
        icon:'assets/dish.svg',
        color: '#FFCC03'
    },
    {
        name: 'Datenschutz',
        key: '3',
        icon:'assets/link.svg',
        width: '55%',
        height: '55%',
        color: '#8855FF'
    },
]
