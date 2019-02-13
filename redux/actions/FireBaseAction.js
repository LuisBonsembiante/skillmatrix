import {SKILL_CREATE, TECHNOLOGIES_CREATE, INIT_FIRE_BASE, FETCH_SKILLS, START_TRANSACTION} from "./types";
//import firebase from '@firebase/app';
import firebase from '../../firebase'
import {apiKey, authDomain, databaseURL, messagingSenderId, projectId, storageBucket} from "../../env";


export const skillCreate = ({name, description}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/skills/`)
            .push({name, description})
            .then(() => {
                dispatch({type: SKILL_CREATE});

            });
    }

};

export const technologiesCreate = ({name, description, uid}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/skills/${uid}/technologies`)
            .push({name, description})
            .then(() => {
                dispatch({type: TECHNOLOGIES_CREATE});

            });
    }

};

export const skillsFetch = () => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        dispatch({type: START_TRANSACTION});
        firebase.database().ref(`/skills`)
            .on('value', snapshot => {

                dispatch({type: FETCH_SKILLS, payload: snapshot.val()})
            });
    };
};