import * as types from './action-types';


const initialState = {
    key: "1",
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        

        case types.SET_CURR_MENU: {
            return {
                ...state,
                key: action.payload,
            }
        }


        default:
            return state;
    }
};