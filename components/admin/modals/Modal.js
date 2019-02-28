import {Router} from "../../../routes";
import {Modal} from 'semantic-ui-react'
import {Component} from "react";
import React from "react";

class ModalDefault extends Component {

    state ={
        open: false
    }

    componentWillMount() {

        this.setState({open: this.props.open});
    }

    componentWillReceiveProps(nextProp){

        this.setState({open: nextProp.open})
    }


    render() {
        return (
            <Modal  inverted={true} open={this.state.open}
                    onUnmount={ () =>
                    {this.setState({open: false});
                        this.props.onClose();
                    }}
                    onClose={() => {
                this.setState({open: false});
                this.props.onClose();
            }}>
                {this.props.children}

            </Modal>
        );
    }

}


export default ModalDefault;