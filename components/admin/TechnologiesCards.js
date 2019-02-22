import React, {Component} from "react";
import {connect} from "react-redux";
import {Card} from 'semantic-ui-react';
import _ from "lodash";
import {onRemoveTechToSearch, onSelectTechToSearch, userTechnologyUpdate} from "../../redux/actions";

class TechnologiesCards extends Component {

    state = {
        technologies: [],
    };

    componentDidMount() {
        const {skillSelected} = this.props;
        this.getSkillTechnologies(skillSelected)

    }

    getSkillTechnologies = (skillSelected, selectedTechs) => {
        const {skills, userTechnologyData} = this.props;

        const _skillSelected = _.find(skills, ['name', skillSelected]);

        const _technologies = (_skillSelected && _skillSelected.technologies)
            ? _.map(_skillSelected.technologies,
                (item, uid) => {
                    if (userTechnologyData[uid]) return {...item, uid, ...userTechnologyData[uid]};
                    return {...item, uid, levelOfKnowledge: {}}
                })
            : [{name: '', meta: '', description: 'Technologies not found'}];

        if (selectedTechs)
            selectedTechs.forEach((selectedTech) => {
                _technologies.forEach((_tech) => {
                    if (_tech.uid === selectedTech) _tech.cardProps = {'color': 'blue'};
                })
            });

        this.setState({technologies: _technologies})
    };


    componentWillReceiveProps(nextProps, nextContext) {

        const {skillSelected} = this.props;
        if (skillSelected !== nextProps.skillSelected) {
            this.getSkillTechnologies(nextProps.skillSelected, nextProps.selectedTechs);
        }
    }

    onClickCard(index) {

        const {technologies} = this.state;
        const {onRemoveTechToSearch, onSelectTechToSearch} = this.props;
        const flag = !!technologies[index].cardProps; // If have the prop, is a removeClick
        const newtechs = technologies.map((t, i) => {
            return (i === index)
                ? (t.cardProps = flag ? null : {'color': 'blue'}, t)
                : t
        });
        this.setState({technologies: newtechs});
        // // flag = true is remove action - flag = false is addAction
        flag
            ? onRemoveTechToSearch(technologies[index].uid) :
            onSelectTechToSearch(technologies[index].uid)
    }


    render() {
        const {technologies} = this.state;

        return (
            <Card.Group itemsPerRow={3} stackable>
                {technologies.map((item, index) =>
                    <Card key={item + index} link onClick={() => this.onClickCard(index)}
                          color={item.cardProps ? item.cardProps.color : 'grey'}
                    >
                        <Card.Content>
                            <Card.Header style={item.cardProps ? {color: 'blue'} : {}}>
                                {item.name}
                            </Card.Header>
                            <Card.Meta>
                                <span className='date'>{item.meta}</span>
                            </Card.Meta>
                            <Card.Description>{item.description}</Card.Description>
                        </Card.Content>
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
        loading: state.fireBase.loading,
        userTechnologyData: state.fireBase.userData ? state.fireBase.userData.technologies || {} : {},
        selectedTechs: state.fireBase.selectTechToSearch
    };
}

export default connect(mapStateToProps,
    {
        userTechnologyUpdate: userTechnologyUpdate,
        onSelectTechToSearch,
        onRemoveTechToSearch,
    }
)(TechnologiesCards);