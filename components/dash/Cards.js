import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Dropdown, Icon, Label, Popup} from 'semantic-ui-react';
import {getSmallImage} from "../utils/imagesManager";
import _ from "lodash";
import {userTechnologyUpdate} from "../../redux/actions";

class Cards extends Component {

    state = {
        technologies: []
    };

    componentDidMount() {
        const {skillSelected} = this.props;
        this.getSkillTechnologies(skillSelected)
    }

    getSkillTechnologies = (skillSelected) => {
        const {skills, userTechnologyData} = this.props;

        const _skillSelected = _.find(skills, ['name', skillSelected]);

        const _technologies = (_skillSelected && _skillSelected.technologies)
            ? _.map(_skillSelected.technologies,
                (item, uid) => {
                    if (userTechnologyData[uid]) return {...item, uid, ...userTechnologyData[uid]};
                    return {...item, uid, levelOfKnowledge: {}}
                })
            : [{name: '', meta: '', description: 'Technologies not found'}];

        this.setState({technologies: _technologies})
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {skillSelected} = this.props;
        if (skillSelected !== nextProps.skillSelected) {
            this.getSkillTechnologies(nextProps.skillSelected);
        }
    }

    onOptionClick = (index, value) => {
        const {technologies} = this.state;
        this.setState((state) => {
            return {
                ...state,
                technologies: state.technologies.map(
                    (content, i) => i === index
                        ? {...content, levelOfKnowledge: value}
                        : content
                )
            }
        });
        this.props.userTechnologyUpdate(
            {
                validated: technologies[index].validated || false,
                validator: technologies[index].validator || {name: 'Not assigned', position: '', uid: ''},
                levelOfKnowledge: value
            }
            , technologies[index].uid
        )
    };

    render() {
        const {technologies} = this.state;

        return (
            <Card.Group itemsPerRow={3}>
                {technologies.map((item, index) =>
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
                                                       this.onOptionClick(index, {text, value, color: label.color})
                                                   }
                                    />
                                    <Dropdown.Item label={{color: 'teal', empty: true, circular: true}}
                                                   text='Basic' value={1}
                                                   onClick={(e, {text, value, label}) =>
                                                       this.onOptionClick(index, {text, value, color: label.color})
                                                   }
                                    />
                                    <Dropdown.Item label={{color: 'blue', empty: true, circular: true}}
                                                   text='Intermediate' value={2}
                                                   onClick={(e, {text, value, label}) =>
                                                       this.onOptionClick(index, {text, value, color: label.color})
                                                   }
                                    />
                                    <Dropdown.Item label={{color: 'violet', empty: true, circular: true}}
                                                   text='Advanced' value={3}
                                                   onClick={(e, {text, value, label}) =>
                                                       this.onOptionClick(index, {text, value, color: label.color})
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
    }
};

function mapStateToProps(state) {
    const skills = _.map(state.fireBase.skills, (val, uid) => {
        return {...val, key: uid, title: ''}; // {shift: 'Monday', name:'s', id:'1j2j34'};
    });

    return {
        skills,
        loading: state.fireBase.loading,
        userTechnologyData: state.fireBase.userData ? state.fireBase.userData.technologies || {} : {}
    };
}

export default connect(mapStateToProps, {userTechnologyUpdate: userTechnologyUpdate})(Cards);