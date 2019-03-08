import React, {Component} from 'react';
import {Button, Form, Input, Message, Modal, TextArea} from 'semantic-ui-react';
import {Router} from "../../../routes";
import {technologiesCreate, technologiesUpdate} from "../../../redux/actions";
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
         this.setState({open: this.props.open, skillName:this.props.skillName, skillKey: this.props.skillKey, name: this.props.name || '', description: this.props.description || '', meta: this.props.meta || '',  openForUpdate: this.props.openForUpdate, uid: this.props.uid})
    }



    componentWillReceiveProps(){
         this.setState({open: this.props.open, skillName:this.props.skillName, skillKey: this.props.skillKey, name: this.props.name || '', description: this.props.description || '', meta: this.props.meta || '',  openForUpdate: this.props.openForUpdate, uid: this.props.uid})
    }

    onAdd = () => {

        if (this.state.description.length === 0 || this.state.name.length === 0 || this.state.meta.length === 0) {
            this.setState({errorMessage: 'Complete the fields'});
            return;
        }

        this.setState({loading: false, open: false, errorMessage:''});

        if(this.state.uid){
            debugger
            this.props.technologiesUpdate({
                name: this.state.name,
                description: this.state.description,
                meta: this.state.meta,
                uidSkill: this.state.skillKey,
                uid: this.state.uid
            });

        }else {
            this.props.technologiesCreate({
                name: this.state.name,
                description: this.state.description,
                meta: this.state.meta,
                uid: this.state.skillKey
            })
        }



        this.setState({loading: false, open: false, errorMessage:''});
        this.props.onClose();
    };

    renderUI() {
        return (

            <Form.Field required disabled>
                <label>UID</label>
                <Input
                    value={this.state.uid}
                />
            </Form.Field>
        );
    }

    render(){
        return (
            <ModalDefault closeIcon open={this.state.open || this.state.openForUpdate} onClose={() =>{ this.setState({errorMessage: ''}); this.props.onClose();}}>
                <Modal.Header>{this.state.uid ? `Modify ${this.state.name}`:`Add new Techno to ${this.state.skillName}` }</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.onAdd} error={!!this.state.errorMessage}>
                        <Form.Group widths={3}>
                            {this.state.uid && this.renderUI() }
                            <Form.Field required>
                                <label>Name</label>
                                <Input
                                    value={this.state.name}
                                    onChange={event => this.setState({name: event.target.value})}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Meta</label>
                                <Input ty
                                       value={this.state.meta}
                                       onChange={event => this.setState({meta: event.target.value})}
                                />{this.state.openModalUpdateTechnology && this.renderModalUpdateTech(uid, val)}
                            </Form.Field>

                        </Form.Group>
                        <Form.Group widths={2}>

                            <Form.Field required style={{width:'100%'}}>
                                <label>Description</label>
                                <TextArea
                                    value={this.state.description}
                                    onChange={event => this.setState({description: event.target.value})}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                    </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button loading={this.state.loading} color="teal" primary onClick={() => this.onAdd()}>
                        {this.state.uid ? `Modify`:'Add'}
                    </Button>
                    <Button loading={this.state.loading} color="green" primary
                            onClick={() => this.setState({loading: false, open: false, openForUpdate: false})}>
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


export default connect(mapStateToProps, {technologiesCreate, technologiesUpdate})(TechnologyModal);