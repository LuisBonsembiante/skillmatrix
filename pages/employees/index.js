import React, {Component} from 'react';
import Layout from '../../components/commons/Layout';
import withAuth from "../../components/utils/withAuth";
import {connect} from "react-redux";
import {Menu} from "semantic-ui-react";
import _ from "lodash";
import {skillsFetch, userDataFetch} from "../../redux/actions"
import ListedByTechnologies from "../../components/admin/ListedByTechnologies";
import ListedByNames from "../../components/admin/ListedByNames";

class EmployeesIndex extends Component {

    state = {
        activeItem: 'Listed by Names',
    };

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
    };

    componentDidMount() {
        this.props.userDataFetch();
        this.props.skillsFetch();
    }

    render() {

        const {activeItem} = this.state;

        return (

            <Layout>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />

                    <Menu tabular>
                        <Menu.Item name='Listed by Technologies' active={activeItem === 'Listed by Technologies'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item name='Listed by Names' active={activeItem === 'Listed by Names'}
                                   onClick={this.handleItemClick}/>
                    </Menu>

                    {activeItem === 'Listed by Technologies' &&
                    <ListedByTechnologies/>
                    }
                    {activeItem === 'Listed by Names' &&
                    <ListedByNames/>
                    }

                </div>

            </Layout>
        );
    }
}


const mapStateToProps = state => {

    return {
        ...state,
        skills: state.fireBase.skills,
        loading: !!state.fireBase.loading
    };
};


export default connect(mapStateToProps, {skillsFetch, userDataFetch})(withAuth(EmployeesIndex))
