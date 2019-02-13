import {FETCH_TECHNOLOGIES} from "../actions/types";

const INITIAL_STATE = { technologies: null, error:'', loading: false};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_TECHNOLOGIES:
            return {...state, technologies: action.payload};
        default:
            return state;
    }
};