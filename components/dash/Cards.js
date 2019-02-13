import React from "react";
import {connect} from "react-redux";
import { Card} from 'semantic-ui-react';


const _cards = (props) => {

    const items = [
        {
            header: 'Angular Js',
            meta: 'Addres of Manager',
            description: 'The manager created this campaign and can create request to withdraw money',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: 'React Js',
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei',
            style: {overflowWrap: 'break-word'}
        }
    ]; // TODO Get this items from Redux

    return (
        <Card.Group items={items}/>
    )
};

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(_cards);