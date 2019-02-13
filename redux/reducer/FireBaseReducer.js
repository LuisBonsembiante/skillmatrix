import {FETCH_TECHNOLOGIES, INIT_FIRE_BASE, FETCH_SKILLS} from "../actions/types";

const INITIAL_STATE = { skills: null, error:'', loading: false, instance: null};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_SKILLS:
            return {...state, skills: action.payload};
        case INIT_FIRE_BASE:
            return {...state, instance: action.payload};
        case FETCH_TECHNOLOGIES:
            return {...state, technologies: action.payload};
        default:
            return state;
    }
};