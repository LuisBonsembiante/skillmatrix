import {
    FETCH_TECHNOLOGIES,
    INIT_FIRE_BASE,
    FETCH_SKILLS,
    START_TRANSACTION,
    SKILL_UPDATE,
    FETCH_USER_DATA, UPDATE_USER_DATA, END_TRANSACTION, CLEAN_DATA
} from "../actions/types";

const INITIAL_STATE = {skills: null, error: '', loading: 0, instance: null, userData: null};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SKILL_UPDATE:
            return {...state, [action.payload.prop]: action.payload.value, loading: false};
        case START_TRANSACTION:
            return {...state, loading: state.loading + 1};
        case END_TRANSACTION:
            return {...state, loading: state.loading <= 0 ? 0 :state.loading - 1};
        case FETCH_SKILLS:
            return {...state, skills: action.payload};
        case INIT_FIRE_BASE:
            return {...state, instance: action.payload};
        case FETCH_TECHNOLOGIES:
            return {...state, technologies: action.payload};
        case FETCH_USER_DATA:
            return {...state, userData: action.payload};
        case UPDATE_USER_DATA:
            return {...state};
        case CLEAN_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};