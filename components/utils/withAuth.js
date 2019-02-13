import React, {Component} from 'react'
import {Header} from "semantic-ui-react";

export default function withAuth(AuthComponent) {

    return class Authenticated extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: this.props.loading
            };
        }

        componentDidMount () {
            if (!this.props.user) {
                this.props.url.replaceTo('/')
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