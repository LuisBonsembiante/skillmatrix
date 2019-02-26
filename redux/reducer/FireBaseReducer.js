import {
    FETCH_TECHNOLOGIES,
    INIT_FIRE_BASE,
    FETCH_SKILLS,
    START_TRANSACTION,
    SKILL_UPDATE,
    FETCH_USERS,
    FETCH_USER_DATA,
    UPDATE_USER_DATA,
    END_TRANSACTION,
    CLEAN_DATA,
    REMOVE_TECH_TO_SEARCH,
    SELECT_TECH_TO_SEARCH,
    RESET_TECH_TO_SEARCH
} from "../actions/types";

const INITIAL_STATE = {
    skills: [],
    error: '',
    loading: 0,
    instance: null,
    userData: null,
    users: null,
    selectTechToSearch: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SKILL_UPDATE:
            return {...state, [action.payload.prop]: action.payload.value, loading: false};
        case START_TRANSACTION:
            return {...state, loading: state.loading + 1};
        case END_TRANSACTION:
            return {...state, loading: state.loading <= 0 ? 0 : state.loading - 1};
        case FETCH_SKILLS:
            return {...state, skills: action.payload};
        case FETCH_USERS:
            return {...state, users: action.payload};
        case INIT_FIRE_BASE:
            return {...state, instance: action.payload};
        case FETCH_TECHNOLOGIES:
            return {...state, technologies: action.payload};
        case FETCH_USER_DATA:
            return {...state, userData: action.payload};
        case UPDATE_USER_DATA:
            return {...state};
        case SELECT_TECH_TO_SEARCH:
            return {...state, selectTechToSearch: [...state.selectTechToSearch, action.payload]};
        case REMOVE_TECH_TO_SEARCH:
            let newSelectedTechs = [...state.selectTechToSearch];
            newSelectedTechs.splice(newSelectedTechs.findIndex((uid) => uid === action.payload), 1);
            return {...state, selectTechToSearch: newSelectedTechs};
        case RESET_TECH_TO_SEARCH:
            return {...state, selectTechToSearch: []};
        case CLEAN_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};