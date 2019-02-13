import React, {Component} from 'react'
import {Header} from "semantic-ui-react";
import {Router} from '../../routes';

export default function withAuth(AuthComponent) {

    return class Authenticated extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: this.props.loading
            };
        }

        componentDidMount () {
            console.log(this.props)
            if (!this.props.auth.user) {
                Router.replaceRoute('/')
            }
            this.setState({ isLoading: false })
        }

        render() {
            return (
                <div>
                    {this.state.isLoading ? (
                        <Header as="h2" textAlign="center">
                            Loading....
                        </Header>
                    ) : (
                        <AuthComponent {...this.props} />
                    )}
                </div>
            )
        }
    }
}