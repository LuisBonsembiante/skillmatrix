import React, {Component} from "react";
import {connect} from "react-redux";
import {Divider, Dropdown, Label, Popup, Rating, Segment} from "semantic-ui-react";
import {onResetTechToSearch, usersFetch} from "../../redux/actions";
import {Accordion} from "semantic-ui-react/dist/commonjs/modules/Accordion";
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table";
import _ from 'lodash';
import {Card} from "semantic-ui-react/dist/commonjs/views/Card";

Card
class EmployeesData extends Component {

    state = {
        selectedTechs: [],
        usersFilter: []
    };

    componentWillMount() {
        this.props.usersFetch();
        this.props.onResetTechToSearch()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let result = [];

        if (nextProps.users)
            result = Object.values(nextProps.users).filter(user => (
                !user.technologies
                    ? null
                    : Object.keys(user.technologies).find(tech => (
                        // Returns true if the user have one o many selectTechToSearch in your technologies and have a levelOfKnowledge != -1
                        nextProps.selectTechToSearch.includes(tech) && user.technologies[tech].levelOfKnowledge && user.technologies[tech].levelOfKnowledge.value !== -1)
                    )
            ));
        result = _.orderBy(result, ['displayName', 'position'], 'asc');

        this.setState({usersFilter: result});
    }

    techLabel(uid, user) {
        const {technologies} = this.props;
        let techs = {};
        technologies.map((val, index) => {
            techs = {...techs, ...val};
        });
        const tech = user.technologies[uid];
        if (!tech || !tech.levelOfKnowledge) return null;
        return (
            <>
                <Divider/>
                <Label as='a' color={tech.levelOfKnowledge.color} key={uid}>
                    {techs[uid].name}
                    <Label.Detail>{tech.levelOfKnowledge.text}</Label.Detail>
                </Label>
            </>
        )
    }

    render() {
        const {usersFilter} = this.state;
        const {selectTechToSearch} = this.props;

        return (
            <>
                <h1>Employess Data</h1>
                <br/>
                <br/>

                <Segment>
                    {usersFilter.map((item, index) => <Popup key={item + index}
                                                             trigger={
                                                                 <Label as='a' color={index % 2 ? 'orange' : 'teal'}
                                                                        image key={item + index}>
                                                                     <img src={item.photoURL}/>
                                                                     {item.displayName || item.email}
                                                                     <Label.Detail>{item.position}</Label.Detail>
                                                                 </Label>
                                                             }
                                                             key={item + index}
                        >
                            <Popup.Header>Details</Popup.Header>
                            <Popup.Content>
                                {selectTechToSearch.map((uid) => {
                                    return this.techLabel(uid, item);
                                })}
                            </Popup.Content>
                        </Popup>
                    )}

                </Segment>
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state.auth,
        users: state.fireBase.users,
        loading: state.auth.loading || !!state.fireBase.loading,
        technologies: !state.fireBase.skills ? [] : _.compact(state.fireBase.skills.map((skill) => skill.technologies)),
        selectTechToSearch: state.fireBase.selectTechToSearch
    }
};

export default connect(mapStateToProps, {usersFetch, onResetTechToSearch})(EmployeesData);
