import {SKILL_CREATE, TECHNOLOGIES_CREATE, INIT_FIRE_BASE, FETCH_SKILLS, START_TRANSACTION, SKILL_UPDATE} from "./types";
//import firebase from '@firebase/app';
import firebase from '../../firebase'
import {apiKey, authDomain, databaseURL, messagingSenderId, projectId, storageBucket} from "../../env";

export const skillUpdates = ({prop, value}) => {
    return {
        type: SKILL_UPDATE,
        payload: {prop, value}
    }
};


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

export const skillUpdate = ({name, description, technologies, uid}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/skills/${uid}`)
            .set({name, description,technologies})
            .then(() => {
                dispatch({type: SKILL_CREATE});

            });
    }

};

export const skillDelete = ({uid}) => {
    const {currentUser} = firebase.auth();
    return () => {
        firebase.database().ref(`/skills/${uid}`)
            .remove()
            .then(() => {
            });
    }

};

export const technologiesCreate = ({name, description, meta, uid}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/skills/${uid}/technologies`)
            .push({name, description, meta})
            .then(() => {
                dispatch({type: TECHNOLOGIES_CREATE});

            });
    }

};

export const technologiesDelete = ({uid, tuid}) => {
    const {currentUser} = firebase.auth();
    return () => {
        firebase.database().ref(`/skills/${uid}/technologies/${tuid}`)
            .remove()
            .then(() => {
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