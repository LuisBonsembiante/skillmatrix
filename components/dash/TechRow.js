import React, {Component} from 'react';
import {Accordion, Button, Form, Icon, Input, Modal, Table, Grid, Message} from 'semantic-ui-react';
import {Router} from "../../routes";
import {technologiesCreate, technologiesDelete} from "../../redux/actions";
import {connect} from "react-redux";
import _ from "lodash";
import SkillModal from '../admin/modals/SkillModal';

class TechRow extends Component {

    state = {
        errorMessage: '',
        loading: false,
        expand: false,
        new: false,
        description: '',
        name: '',
        meta: '',
        open: false,
        openModalUpdateSkill: false

    }


    modalNewSkill = () => (
        <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
            <Modal.Header>Add Techno to {this.props.skill.name}</Modal.Header>
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
    )


    onAdd = () => {

        if(this.state.description.length === 0 || this.state.name.length === 0 || this.state.meta.length === 0){
            this.setState({errorMessage: 'Complete the fields'});
            return;
        }

        this.setState({loading: true});


        this.props.technologiesCreate({
            name: this.state.name,
            description: this.state.description,
            meta:this.state.meta,
            uid: this.props.skill.key
        })

        this.setState({loading: false, open: false});

        //Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };

    onApprove = async () => {

        this.setState({loading: true});


        this.setState({loading: false});

        //Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };

    onFinalize = async () => {

        this.setState({loading: true});

        this.setState({openModalNewSkill: true});

        this.setState({loading: false});

        //Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };


    delete = (key) => {

        this.setState({loading: true});

        this.props.technologiesDelete({
            uid: this.props.skill.key,
            tuid:key
        })

        this.setState({loading: false});

        //Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };

    panels = [{
        key: 'panelTech',
        title: 'Techs',
        content: {content: this.dataTech}
    }];


    dataTech = (<h1>Hola</h1>);


    renderTech() {

        return (
            <Grid.Row>
                <Grid.Column>
                    <Accordion.Accordion>
                        <Accordion.Content>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Meta</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='right'>Options</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                       _.map(this.props.skill.technologies,(val, uid) => {

                                            return (

                                                <Table.Row key={uid}>
                                                    <Table.Cell>{val.name}</Table.Cell>
                                                    <Table.Cell>{val.description}</Table.Cell>
                                                    <Table.Cell>{val.meta}</Table.Cell>
                                                    <Table.Cell textAlign='right'>
                                                        <Button.Group>
                                                            <Button color='blue' icon="edit"
                                                                     loading={this.state.loading}/>
                                                            <Button.Or />
                                                            <Button color='red' icon="trash alternate outline"
                                                                    loading={this.state.loading} onClick={() => this.delete(uid)}/>
                                                        </Button.Group>
                                                     </Table.Cell>
                                                </Table.Row>

                                            );
                                        })
                                    }

                                </Table.Body>
                            </Table>
                        </Accordion.Content>
                    </Accordion.Accordion>
                </Grid.Column>
            </Grid.Row>
        );

    }

    renderModalUpdateSkill = () => {
          return (<SkillModal open={this.state.openModalUpdateSkill} uid={this.props.skill.key} name={this.props.skill.name}
                              description={this.props.skill.description} technologies={this.props.skill.technologies}
                            onClose={ () => this.setState({openModalUpdateSkill: false})}/>);
    }

    addTech() {
        const {Row, Cell} = Table;
        return (
            <Table.Row>
                <Accordion as={Form.Field}>
                    <Accordion.Content content={this.techForm}/>
                </Accordion>
            </Table.Row>

        );
    }
    onClickHandler = (event) => {
        event.stopPropagation();
        const {expand} = this.state;
        this.setState({expand: !expand})
    }

    render() {
        const {Row, Cell} = Table;
        const {id, skill} = this.props;

        return (
            <>
                <Grid.Row columns='equal' stretched >
                    <Grid.Column width={1}  onClick={(event) => this.onClickHandler(event)}>
                        <p>{this.props.skill.technologies ? '+':'-'}</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <p>{id}</p>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p>{skill.name}</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>{skill.description}</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button loading={this.state.loading} color="green" basic
                                onClick={(() => this.setState({open: true}))}>
                            Add
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button loading={this.state.loading} color="teal" basic onClick={ (event) => {event.stopPropagation(); this.setState({openModalUpdateSkill: true})}}>
                            Edit
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                {this.state.expand && this.props.skill.technologies && this.renderTech()}
                {this.modalNewSkill()}
                {this.renderModalUpdateSkill()}
            </>
        );
    }


}

const mapStateToProps = state => {

    return {
        ...state

    };
};


export default connect(mapStateToProps, {technologiesCreate, technologiesDelete})(TechRow);