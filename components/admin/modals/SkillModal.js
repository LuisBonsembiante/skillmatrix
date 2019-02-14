import React, {Component} from 'react';
import {Accordion, Button, Form, Icon, Input, Modal, Table, Message} from 'semantic-ui-react';
import {Router} from "../../../routes";
import {skillCreate} from "../../../redux/actions";
import {connect} from "react-redux";

class SkillModal extends Component {

    state = {
        errorMessage: '',
        loading: false,
        expand: false,
        new: false,
        description: '',
        name: '',
        open: false
    }

    componentWillMount() {
        this.setState({open: this.props.open})
    }

    componentWillReceiveProps(){
        this.setState({open: this.props.open})
    }

    component

    onAdd = () => {
        if(this.state.description.length === 0 || this.state.name.length === 0){
            this.setState({errorMessage: 'Complete the fields'});
            return;
        }
        this.setState({loading: true});


        this.props.skillCreate({
            name: this.state.name,
            description: this.state.description
        })

        this.setState({loading: false, open: false});

    };


    render() {
        return (
            <Modal open={this.state.open} onClose={() =>{ this.props.onClose()}}>
                <Modal.Header>Add new Skill</Modal.Header>
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
                        <Message error header="Oops!" content={this.state.errorMessage} />
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button loading={this.state.loading} color="teal" primary onClick={() => this.onAdd()}>
                        Add
                    </Button>
                    <Button loading={this.state.loading} color="green" primary onClick={() => this.setState({open: false})}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
            );

    }
}

const mapStateToProps = state => {

    return {
        ...state

    };
};


export default connect(mapStateToProps, {skillCreate})(SkillModal);