import React, {Component} from 'react';
import {Button, Form, Input, Message, Modal} from 'semantic-ui-react';
import {Router} from "../../../routes";
import {technologiesCreate} from "../../../redux/actions";
import {connect} from "react-redux";
import ModalDefault from './Modal';

class TechnologyModal extends Component {

    state = {
        errorMessage: '',
        loading: false,
        expand: false,
        new: false,
        description: '',
        name: '',
        meta: '',
        open: false,
        skillName: '',
        skillKey: '',
        openForUpdate: false,
        uid: null,
        technologies: {}
    }



    componentWillMount() {

        this.setState({open: this.props.open, skillName:this.props.skillName, skillKey: this.props.skillKey})
    }



    componentWillReceiveProps(){
        this.setState({open: this.props.open, skillName:this.props.skillName, skillKey: this.props.skillKey})
    }

    onAdd = () => {

        if (this.state.description.length === 0 || this.state.name.length === 0 || this.state.meta.length === 0) {
            this.setState({errorMessage: 'Complete the fields'});
            return;
        }

        this.setState({loading: false, open: false, errorMessage:''});


        this.props.technologiesCreate({
            name: this.state.name,
            description: this.state.description,
            meta: this.state.meta,
            uid: this.state.skillKey
        })

        this.setState({loading: false, open: false, errorMessage:''});
        this.props.onClose();
    };

    render(){
        return (
            <ModalDefault closeIcon open={this.state.open} onClose={() =>{ this.setState({errorMessage: ''}); this.props.onClose();}}>
                <Modal.Header>Add Techno to {this.state.skillName}</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.onAdd} error={!!this.state.errorMessage}>
                        <Form.Group widths={3}>
                            <Form.Field required>
                                <label>Name</label>
                                <Input
                                    onChange={event => this.setState({name: event.target.value})}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Description</label>
                                <Input
                                    onChange={event => this.setState({description: event.target.value})}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths={2}>
                            <Form.Field required>
                                <label>Meta</label>
                                <Input
                                    onChange={event => this.setState({meta: event.target.value})}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={this.state.loading} color="teal" primary onClick={() => this.onAdd()}>
                        Add
                    </Button>
                    <Button loading={this.state.loading} color="green" primary
                            onClick={() => this.setState({open: false})}>
                        Close
                    </Button>
                </Modal.Actions>
            </ModalDefault>
        )
    }
}

const mapStateToProps = state => {

    return {
        ...state

    };
};


export default connect(mapStateToProps, {technologiesCreate})(TechnologyModal);