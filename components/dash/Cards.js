import React from "react";
import {connect} from "react-redux";
import {Card, Icon, Label, Popup} from 'semantic-ui-react';
import {getSmallImage} from "../utils/imagesManager";

const _cards = (props) => {

    const items = [
        {
            header: 'Angular Js',
            meta: 'Addres of Manager',
            description: 'The manager created this campaign and can create request to withdraw money',
            validated: false,
            validator: {
                name: 'Helen',
                position: 'Co-Worker'
            },
            style: {overflowWrap: 'break-word'}
        },
        {
            header: 'React Js',
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei',
            validated: true,
            validator: {
                name: 'Shuan',
                position: 'Teacher'
            },
            style: {overflowWrap: 'break-word'}
        }
    ]; // TODO Get this items from Redux


    return (
        <Card.Group itemsPerRow={4}>
            {items.map((item, index) =>
                <Card key={item + index}>
                    <Card.Content>
                        <Card.Header>{item.header}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{item.meta}</span>
                        </Card.Meta>
                        <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Popup trigger={
                            <Label as='a' color={item.validated ? 'green' : 'yellow'} image>
                                <img src={getSmallImage()} />
                                {item.validator.name}
                                <Label.Detail>{item.validator.position}</Label.Detail>
                            </Label>
                        }  content={item.validated ? 'Validated!' : 'Pending for validation'} />
                    </Card.Content>
                </Card>
            )}
        </Card.Group>
    )
};

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(_cards);