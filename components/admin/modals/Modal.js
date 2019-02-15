import {Router} from "../../../routes";
import {Modal} from 'semantic-ui-react'
import {Component} from "react";

class ModalDefault extends Component {

    state ={
        open: false
    }

    componentWillMount() {

        this.setState({open: this.props.open});
    }

    componentWillReceiveProps(){


        this.setState({open: this.props.open})
    }


    render() {
        return (
            <Modal  inverted={true} open={this.state.open}
                    onUnmount={ () =>
                    {this.setState({open: false});
                        console.log('close pop')
                        this.props.onClose();
                    }}
                    onClose={() => {
                this.setState({open: false});
                console.log('close pop')
                this.props.onClose();
            }}>
                {this.props.children}

            </Modal>
        );
    }

}


export default ModalDefault;