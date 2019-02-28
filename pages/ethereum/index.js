import React, {Component} from 'react';
import Layout from '../../components/commons/Layout';
import {Link} from '../../routes';
import withAuth from "../../components/utils/withAuth";
import {connect} from "react-redux";
import {skillsFetch, userDataFetch} from "../../redux/actions";

class EthereumIndex extends Component {

    state = {};


    componentDidMount() {

    }


    render() {


        return (

            <Layout>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />


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


export default connect(mapStateToProps, {skillsFetch, userDataFetch})(withAuth(EthereumIndex))