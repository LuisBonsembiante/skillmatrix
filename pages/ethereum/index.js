import React, {Component} from 'react';
import Layout from '../../components/commons/Layout';
import {Link} from '../../routes';
import withAuth from "../../components/utils/withAuth";
import {connect} from "react-redux";
import {usersFetch} from "../../redux/actions";
import {Card, Feed, Icon} from "semantic-ui-react";
import _ from "lodash";

class EthereumIndex extends Component {

    state = {};


    componentWillMount() {
        this.props.usersFetch();
    }

    renderEmployees() {

        return (
            <Card.Group itemsPerRow={3} stackable>
                {
                    _.map(this.props.users,
                        (item, uid) => {
                            return (
                                <Card key={item + uid}>
                                    <Card.Content>
                                        <Feed>
                                            <Feed.Event>
                                                <Feed.Label image={item.photoURL}/>
                                                <Feed.Content>
                                                    <Feed.Date content={item.displayName}/>
                                                    <Feed.Summary>
                                                        {item.email}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Link route={`/ethereum/${uid}`}>
                                            <a>
                                                <Icon name='coffee'/>
                                                {item.technologies ? Object.keys(item.technologies).length : '0'}
                                            </a>
                                        </Link>
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


                <h3>Employees to validate</h3>


                {this.renderEmployees()}


            </Layout>
        );
    }
}


const
    mapStateToProps = state => {
        return {
            ...state,
            users: state.fireBase.users || [],
            loading: state.auth.loading || !!state.fireBase.loading
        }
    };


export default connect(mapStateToProps, {usersFetch})

(
    withAuth(EthereumIndex)
)