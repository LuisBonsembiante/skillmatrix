import {
    SKILL_CREATE,
    TECHNOLOGIES_CREATE,
    FETCH_SKILLS,
    START_TRANSACTION,
    SKILL_UPDATE,
    FETCH_USERS,
    FETCH_USER_DATA,
    UPDATE_USER_DATA,
    EMPTY_ACTION,
    END_TRANSACTION,
    CLEAN_DATA,
    SELECT_TECH_TO_SEARCH,
    REMOVE_TECH_TO_SEARCH, RESET_TECH_TO_SEARCH, NOT_NEW_USER
} from "./types";
import firebase from '../../firebase'
import "firebase/auth"
import _ from "lodash";


export const skillUpdates = ({prop, value}) => {
    return {
        type: SKILL_UPDATE,
        payload: {prop, value}
    }
};


export const skillCreate = ({name, description}) => {
    return (dispatch) => {
        firebase.database().ref(`/skills/`)
            .push({name, description})
            .then(() => {
                dispatch({type: SKILL_CREATE});
            });
    }

};

export const skillUpdate = ({name, description, uid}) => {
    return (dispatch) => {
        firebase.database().ref(`/skills/${uid}`)
            .update({name, description})
            .then(() => {
                dispatch({type: SKILL_CREATE});

            });
    }

};

export const skillDelete = ({uid}) => {
    return () => {
        firebase.database().ref(`/skills/${uid}`)
            .remove()
            .then(() => {
            });
    }

};

export const technologiesCreate = ({name, description, meta, uid}) => {
    return (dispatch) => {
        firebase.database().ref(`/skills/${uid}/technologies`)
            .push({name, description, meta})
            .then(() => {
                dispatch({type: TECHNOLOGIES_CREATE});
            });
    }

};

export const technologiesUpdate = ({name, description, meta, uidSkill, uid}) => {
    return (dispatch) => {
        firebase.database().ref(`/skills/${uidSkill}/technologies/${uid}`)
            .update({name, description, meta})
            .then(() => {
                dispatch({type: TECHNOLOGIES_CREATE});
            });
    }

};

export const technologiesDelete = ({uid, tuid}) => {
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
                const skills = _.map(snapshot.val(), (val, uid) => {
                    return {...val, key: uid, title: ''}; // {shift: 'Monday', name:'s', id:'1j2j34'};
                });
                dispatch({type: FETCH_SKILLS, payload: skills});
                dispatch({type: END_TRANSACTION})
            });
    };
};


export const userDataFetch = () => {
    return (dispatch, getState) => {
        const currentUser = getState().auth.user;
        dispatch({type: START_TRANSACTION});
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({type: FETCH_USER_DATA, payload: snapshot.val()})
                dispatch({type: END_TRANSACTION})
            });
    };
};

export const userTechnologyUpdate = (technology, tuid) => {
    return (dispatch, getState) => {
        const currentUser = getState().auth.user;
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
    return (dispatch, getState) => {
        const currentUser = getState().auth.user;
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

export const usersFetch = () => {
    return (dispatch) => {
        dispatch({type: START_TRANSACTION});
        firebase.database().ref(`/users`)
            .on('value', snapshot => {
                dispatch({type: FETCH_USERS, payload: snapshot.val()});
                dispatch({type: END_TRANSACTION})
            });

    }
};

export const onSelectTechToSearch = (uid) => {
    return (dispatch) => {
        dispatch({type: SELECT_TECH_TO_SEARCH, payload: uid})
    }
};

export const onRemoveTechToSearch = (uid) => {
    return (dispatch) => {
        dispatch({type: REMOVE_TECH_TO_SEARCH, payload: uid})
    }
};
export const onResetTechToSearch = () => {
    return (dispatch) => {
        dispatch({type: RESET_TECH_TO_SEARCH})
    }
};

