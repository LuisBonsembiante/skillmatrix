import React, {Component} from "react";
import {connect} from "react-redux";
import {Divider, Dropdown, Label, Popup, Rating, Segment} from "semantic-ui-react";
import {usersFetch} from "../../redux/actions";
import {Accordion} from "semantic-ui-react/dist/commonjs/modules/Accordion";
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table";
import _ from 'lodash';
import {Card} from "semantic-ui-react/dist/commonjs/views/Card";


class EmployeesData extends Component {

    state = {
        selectedTechs: [],
        usersFilter: []
    };

    componentWillMount() {
        this.props.usersFetch();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({selectedTechs: nextProps.selectedTechs});

        let result = [];

        if (nextProps.users)
            result = Object.values(nextProps.users).filter(user => (!user.technologies ? null : Object.keys(user.technologies).find(tech => nextProps.selectedTechs.includes(tech))));

        this.setState({usersFilter: result});
    }

    techLabel(uid, user) {
        const {technologies} = this.props;
        const techs = _.extend.apply(null, technologies);
        const tech = user.technologies[uid];
        if (!tech) return null;
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
        const {usersFilter, selectedTechs} = this.state;

        return (
            <>
                <h1>Employess Data</h1>
                <br/>
                <br/>

                <Segment>
                    {usersFilter.map((item, index) => <Popup
                            trigger={
                                <Label as='a' color={index % 2 ? 'orange' : 'teal'} image key={item + index}>
                                    <img src={item.photoURL}/>
                                    {item.displayName}
                                    <Label.Detail>{item.position}</Label.Detail>
                                </Label>
                            }
                        >
                            <Popup.Header>Details</Popup.Header>
                            <Popup.Content>
                                {selectedTechs.map((uid) => {
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
        technologies: !state.fireBase.skills ? [] : _.compact(Object.values(state.fireBase.skills).map((skill) => skill.technologies))

    }
};

export default connect(mapStateToProps, {usersFetch})(EmployeesData);
