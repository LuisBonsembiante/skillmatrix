import React, {useReducer} from "react";
import {connect} from "react-redux";
import {Card, Dropdown, Icon, Label, Popup} from 'semantic-ui-react';
import {getSmallImage} from "../utils/imagesManager";
import _ from "lodash";

const _cards = (props) => {


    const skillSelected = _.find(props.skills, ['name', props.skillSelected]);

    const technologies = (skillSelected && skillSelected.technologies)
        ? Object.values(skillSelected.technologies).map(
            (item, index) => {
                return { // TODO get the real user information an put the approve state into technologies
                    ...item,
                    validated: !(index % 2),
                    validator: {
                        name: 'Helen',
                        position: 'Co-Worker'
                    },
                    levelOfKnowledge: {}
                }
            })
        : [{name: '', meta: '', description: 'Technologies not found'}];

    //Init state with the selected Technologies
    const [state, dispatch] = useReducer(reducer, {technologies});

    const onOptionClick = (index, value) => {
        dispatch({type: 'update_knowledge', payload: value, index: index});
    };

    console.log(state)
    return (
        <Card.Group itemsPerRow={4}>
            {state.technologies.map((item, index) =>
                <Card key={item + index}>
                    <Card.Content>
                        <Card.Header>{item.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{item.meta}</span>
                        </Card.Meta>
                        <Card.Description>{item.description}</Card.Description>

                        <br/>
                        {item.levelOfKnowledge &&
                        <Dropdown text={item.levelOfKnowledge.text || 'Level of knowledge'}
                                  icon='certificate' className={'icon ' + (item.levelOfKnowledge.color || 'grey')}
                                  floating labeled button basic
                                  value={item.levelOfKnowledge.value}>
                            <Dropdown.Menu>
                                <Dropdown.Item label={{color: 'green', empty: true, circular: true}}
                                               text='I want to learn this' value={0}
                                               onClick={(e, {text, value, label}) =>
                                                   onOptionClick(index, {text, value, color: label.color})
                                               }
                                />
                                <Dropdown.Item label={{color: 'teal', empty: true, circular: true}}
                                               text='Basic' value={1}
                                               onClick={(e, {text, value, label}) =>
                                                   onOptionClick(index, {text, value, color: label.color})
                                               }
                                />
                                <Dropdown.Item label={{color: 'blue', empty: true, circular: true}}
                                               text='Intermediate' value={2}
                                               onClick={(e, {text, value, label}) =>
                                                   onOptionClick(index, {text, value, color: label.color})
                                               }
                                />
                                <Dropdown.Item label={{color: 'violet', empty: true, circular: true}}
                                               text='Advanced' value={3}
                                               onClick={(e, {text, value, label}) =>
                                                   onOptionClick(index, {text, value, color: label.color})
                                               }
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                        }

                    </Card.Content>
                    {item.validator &&
                    <Card.Content extra>
                        <Popup trigger={
                            <Label as='a' color={item.validated ? 'green' : 'yellow'} image>
                                <img src={getSmallImage()}/>
                                {item.validator.name}
                                <Label.Detail>{item.validator.position}</Label.Detail>
                            </Label>
                        } content={item.validated ? 'Validated!' : 'Pending for validation'}/>
                    </Card.Content>
                    }
                </Card>
            )}
        </Card.Group>
    )
};

/**
 * Redux Pattern implemented to managed the state
 */

const initialState = {technologies: []};

function reducer(state, action) {
    switch (action.type) {
        case 'reset':
            return initialState;
        case 'update_knowledge':
            return {
                ...state,
                technologies: state.technologies.map(
                    (content, i) => i === action.index
                        ? {...content, levelOfKnowledge: action.payload}
                        : content
                )
            };
        default:
            return state;
    }
}

/**
 * End Redux Pattern
 */


function mapStateToProps(state) {
    const skills = _.map(state.fireBase.skills, (val, uid) => {
        return {...val, key: uid, title: ''}; // {shift: 'Monday', name:'s', id:'1j2j34'};
    });

    return {
        skills,
        loading: state.fireBase.loading
    };
}

export default connect(mapStateToProps, {})(_cards);