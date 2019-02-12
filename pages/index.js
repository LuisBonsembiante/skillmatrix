import React from 'react';
import {Card, Button, Confirm} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';
import factory from '../ethereum/factory';

export default class CampaignIndex extends React.Component {


    // Initial PROPS
    static async getInitialProps() {


    }

    render() {
        return (

            < Layout >
            < div >
            < link
        rel = "stylesheet"
        href = "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            / >

            < h3 > Home < /h3>

            < /div>

            < /Layout>
    )
        ;
    }
}