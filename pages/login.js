import React from 'react';
import Layout from '../components/commons/Layout';
import {Link} from '../routes';
import Login from "../components/auth/Login";
import {connect} from "react-redux";

class LoginIndex extends React.Component {


    render() {
        return (

            <Layout hideHeader>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />
                    <Login/>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state};
};

export default connect(mapStateToProps, {})(LoginIndex)