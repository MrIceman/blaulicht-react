import * as types from './action-types';

export const setCurrMenu = (key) => 
    ({ type: types.SET_CURR_MENU, payload: key });