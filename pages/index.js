import React, {Component} from 'react';
import Layout from '../components/commons/Layout';
import {Link} from '../routes';
import withAuth from "../components/utils/withAuth";
import {connect} from "react-redux";
import MainDash from '../components/dash/MainDash'

class SkillmatrixIndex extends Component {



    render() {


        return (

            <Layout>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />

                <MainDash/>

                </div>

            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state};
};

export default connect(mapStateToProps)(withAuth(SkillmatrixIndex))