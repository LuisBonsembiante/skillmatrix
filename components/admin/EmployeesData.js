import React, {Component} from "react";
import {connect} from "react-redux";
import {Label, Segment} from "semantic-ui-react";
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
        this.setState({selectedTechs: nextProps.selectedTechs})

        let result = [];

        if(nextProps.users)
            result = Object.values(nextProps.users).filter(user => (!user.technologies ? null: Object.keys(user.technologies).
            find(tech => nextProps.selectedTechs.includes(tech))));

        this.setState({usersFilter: result});
    }


    render() {
        const {usersFilter} = this.state;

        return (
            <>
                <h1>Employess Data</h1>
                <br/>
                <br/>

                <Segment>
                   {usersFilter.map((item, index) =>

                        <Label as='a' color='blue' image key={item + index}>
                            <img src={item.photoURL}/>
                              {item.displayName}
                            <Label.Detail>{item.position}</Label.Detail>
                        </Label>
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
        loading: state.auth.loading || !!state.fireBase.loading

    }
};

export default connect(mapStateToProps, {usersFetch})(EmployeesData);
