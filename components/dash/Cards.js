import React from "react";
import {connect} from "react-redux";
import {Card, Icon, Label, Popup} from 'semantic-ui-react';
import {getSmallImage} from "../utils/imagesManager";
import _ from "lodash";

const _cards = (props) => {


    const skillSelected = _.find(props.skills, ['name', props.skillSelected]);

    const technologies = (skillSelected && skillSelected.technologies)
        ? Object.values(skillSelected.technologies).map(
            (item, index) => {
                return { // TODO get the real user information an put the approve state into technologies
                    ...item,
                    validated: !(index % 2),
                    validator: {
                        name: 'Helen',
                        position: 'Co-Worker'
                    }
                }
            })
        : [{name: '', meta: '', description: 'Technologies not found'}];

    return (
        <Card.Group itemsPerRow={4}>
            {technologies.map((item, index) =>
                <Card key={item + index}>
                    <Card.Content>
                        <Card.Header>{item.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{item.meta}</span>
                        </Card.Meta>
                        <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                    {   item.validator &&
                        <Card.Content extra>
                            <Popup trigger={
                                <Label as='a' color={item.validated ? 'green' : 'yellow'} image>
                                    <img src={getSmallImage()}/>
                                    {item.validator.name}
                                    <Label.Detail>{item.validator.position}</Label.Detail>
                                </Label>
                            } content={item.validated ? 'Validated!' : 'Pending for validation'}/>
                        </Card.Content>
                    }
                </Card>
            )}
        </Card.Group>
    )
};

function mapStateToProps(state) {
    const skills = _.map(state.fireBase.skills, (val, uid) => {
        return {...val, key: uid, title: ''}; // {shift: 'Monday', name:'s', id:'1j2j34'};
    });

    return {
        skills,
        loading: state.fireBase.loading
    };
}

export default connect(mapStateToProps, {})(_cards);