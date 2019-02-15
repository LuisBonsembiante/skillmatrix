import React, {Component} from 'react';
import {Accordion, Button, Form, Icon, Input, Modal, Table, Message} from 'semantic-ui-react';
import {Router} from "../../../routes";
import {skillCreate, skillUpdate} from "../../../redux/actions";
import {connect} from "react-redux";

class SkillModal extends Component {

    state = {
        errorMessage: '',
        loading: false,
        expand: false,
        new: false,
        description: '',
        name: '',
        open: false,
        uid: null,
        technologies: {}
    }

    componentWillMount() {

        this.setState({open: this.props.open, name:this.props.name , description:this.props.description, technologies:this.props.technologies,uid: this.props.uid})
    }

    componentWillReceiveProps(){
        this.setState({open: this.props.open, name:this.props.name , description:this.props.description, technologies:this.props.technologies,uid: this.props.uid})
    }


    onAdd = () => {
        if(this.state.description.length === 0 || this.state.name.length === 0){
            this.setState({errorMessage: 'Complete the fields'});
            return;
        }
        this.setState({loading: true, open: false});


        if(this.state.uid){
            this.props.skillUpdate({
                name: this.state.name,
                description: this.state.description,
                technologies: this.props.technologies,
                uid: this.state.uid
            })

        }else {
            this.props.skillCreate({
                name: this.state.name,
                description: this.state.description
            })
        }



        this.setState({loading: false, open: false});

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


    render() {
        return (
            <Modal open={this.state.open} onClose={() =>{  this.setState({errorMessage: ''}); this.props.onClose();}}>
                <Modal.Header>{this.state.uid ? `Modify skill ${this.state.name}`:'Add new Skill'}</Modal.Header>
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
                                <label>Description</label>
                                <Input
                                    value={this.state.description}
                                    onChange={event => this.setState({description: event.target.value})}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button loading={this.state.loading} color="teal" primary onClick={() => {this.onAdd();}}>
                        {this.state.uid ? `Modify`:'Add'}
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


export default connect(mapStateToProps, {skillCreate, skillUpdate})(SkillModal);