import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Form, Grid, Image, Label, Segment} from "semantic-ui-react";
import {getLargeImage} from "../utils/imagesManager";
import {userDataUpdate} from "../../redux/actions";
import {Accordion} from "semantic-ui-react/dist/commonjs/modules/Accordion";
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table";
import _ from "lodash";
import Layout from "../../pages/skill";

class EmployeesData extends Component {

    state = {

    };

    componentWillReceiveProps(nextProps, nextContext) {

    }


    render() {

        return (
            <>
                <h1>Employess Data</h1>
                <br/>
                <br/>

                    <Segment>
                        <Label as='a' color='blue' image>
                            <img src='/images/avatar/small/veronika.jpg' />
                            Veronika
                            <Label.Detail>Friend</Label.Detail>
                        </Label>
                    </Segment>
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state.auth,
        loading: state.auth.loading || !!state.fireBase.loading

    }
};

export default connect(mapStateToProps, {})(EmployeesData);