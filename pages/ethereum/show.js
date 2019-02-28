import React, {Component} from 'react';
import Layout from '../../components/commons/Layout'
import {Link, Router} from '../../routes';
import _ from "lodash";
import {Card, Feed, Icon} from "semantic-ui-react";
import career from '../../ethereum/career'

export default class TechnoShow extends Component {

    static async getInitialProps(props) {
        debugger
        const uid = props.query.key;
        const {fireBase} = props.reduxStore.getState();

        const career = await career.methods.getTokenByEmployee(uid).call();

        return {
            uid: uid,
            users: fireBase.users,
            career: career,
            technologies: !fireBase.skills ? [] : _.compact(fireBase.skills.map((skill) => skill.technologies)),
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    renderCards() {

        const user = _.find(this.props.users, (item, uid) => {
            return uid === this.props.uid
        })

        const _technologies = [];
         this.props.technologies.map( techs =>
            _.map(techs,
                (item, uid) => {
                    if (user.technologies[uid]) _technologies.push( {...item, uid, ...user.technologies[uid]});
                    return {...item, uid, levelOfKnowledge: {}}
                })
        );

        return (
            <Card.Group itemsPerRow={3} stackable>
                {
                    _.map(_technologies,
                        (item, uid) => {
                            return (
                                <Card key={item + uid}>
                                    <Card.Content>
                                        <Feed>
                                            <Feed.Event>
                                                <Feed.Label>{item.name}</Feed.Label>
                                                <Feed.Content>
                                                    <Feed.Date content={item.meta}/>
                                                    <Feed.Summary>
                                                        {user.displayName}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='check'/>
                                            Validate
                                        </a>
                                    </Card.Content>
                                </Card>
                            );

                        })
                }
            </Card.Group>
        )
    }

    render() {
        return (
            <Layout>
                <h3>Technos Show</h3>

                {this.renderCards()}

            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        users: state.fireBase.users || [],
        loading: state.auth.loading || !!state.fireBase.loading
    }
};

