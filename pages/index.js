import React from 'react';
import Layout from '../components/commons/Layout';
import {Link} from '../routes';

export default class CampaignIndex extends React.Component {



    // Initial PROPS
    static async getInitialProps() {

        return {};
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