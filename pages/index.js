import React from 'react';
import Layout from '../components/commons/Layout';
import {Link} from '../routes';
import withAuth from "../components/utils/withAuth";
import {connect} from "react-redux";

class SkillmatrixIndex extends React.Component {



    // Initial PROPS
    static getInitialProps ({ reduxStore, req }) {
        const isServer = !!req

        return {}
    }

    render() {
        return (

            <Layout>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />

                    <h3>Home</h3>

                </div>

            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state};
};

export default connect(mapStateToProps)(withAuth(SkillmatrixIndex))