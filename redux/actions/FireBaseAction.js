import {
    SKILL_CREATE,
    TECHNOLOGIES_CREATE,
    FETCH_SKILLS,
    START_TRANSACTION,
    SKILL_UPDATE,
    FETCH_USER_DATA, UPDATE_USER_DATA, EMPTY_ACTION, END_TRANSACTION
} from "./types";
import firebase from '../../firebase'

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

export const skillUpdate = ({name, description, uid}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/skills/${uid}`)
            .update({name, description})
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
    return (dispatch) => {
        dispatch({type: START_TRANSACTION});
        firebase.database().ref(`/skills`)
            .on('value', snapshot => {
                dispatch({type: FETCH_SKILLS, payload: snapshot.val()});
                dispatch({type: END_TRANSACTION})
            });
    };
};


export const userDataFetch = () => {
    const {currentUser} = firebase.auth();
    if (!currentUser) return {type: EMPTY_ACTION};
    return (dispatch) => {
        dispatch({type: START_TRANSACTION});
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({type: FETCH_USER_DATA, payload: snapshot.val()})
                dispatch({type: END_TRANSACTION})
            });
    };
};

export const userTechnologyUpdate = (technology, tuid) => {
    const {currentUser} = firebase.auth();
    if (!currentUser) return {type: EMPTY_ACTION};
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/technologies/${tuid}`)
            .update(technology)
            .then(() => {
                dispatch({type: UPDATE_USER_DATA});
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

export const userDataUpdate = (data) => {
    const {currentUser} = firebase.auth();
    if (!currentUser) return {type: EMPTY_ACTION};
    return (dispatch) => {
        dispatch({type: START_TRANSACTION});
        firebase.database().ref(`/users/${currentUser.uid}`)
            .update(data)
            .then(() => {
                dispatch({type: UPDATE_USER_DATA});
            })
            .finally(() => {
                dispatch({type: END_TRANSACTION});
            });
    }
};