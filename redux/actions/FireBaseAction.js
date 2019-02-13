import {FETCH_TECHNOLOGIES, SKILL_CREATE, TECHNOLOGIES_CREATE} from "./types";

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

export const  technologiesCreate = ({name, description,uid}) => {
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
        firebase.database().ref(`/skills`)
            .on('value', snapshot => {
                dispatch({type: FETCH_SKILLS, payload: snapshot.val()})
            });
    };
};