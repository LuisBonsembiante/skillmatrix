import React, {Component} from 'react';
import {Accordion, Button, Form, Icon, Input, Modal, Table, Grid} from 'semantic-ui-react';
import {Router} from "../../routes";
import {technologiesCreate} from "../../redux/actions";
import {connect} from "react-redux";

class TechRow extends Component {

    state = {
        errorMessage: '',
        loading: false,
        expand: false,
        new: false,
        description: '',
        name: '',
        open: false
    }


    modalNewSkill = () => (
        <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
            <Modal.Header>Add Techno</Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.onAdd}>
                    <Form.Group widths={3}>
                        <Form.Field>
                            <label>Name</label>
                            <Input

                                onChange={event => this.setState({name: event.target.value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <Input

                                onChange={event => this.setState({description: event.target.value})}
                            />
                        </Form.Field>
                    </Form.Group>
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

        this.setState({loading: true});


        this.props.technologiesCreate({
            name: this.state.name,
            description: this.state.description,
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
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Edit</Table.HeaderCell>
                                        <Table.HeaderCell>Delete</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        Object.values(this.props.skill.technologies || {}).map((tech, index) => {

                                            return (

                                                <Table.Row key={index}>
                                                    <Table.Cell>0</Table.Cell>
                                                    <Table.Cell>{tech.name}</Table.Cell>
                                                    <Table.Cell>{tech.description}</Table.Cell>
                                                    <Table.Cell> <Icon name='edit'/></Table.Cell>
                                                    <Table.Cell> <Icon name='delete'/></Table.Cell>
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
    onClickHandler = () => {
        const {expand} = this.state;
        this.setState({expand: !expand})
    }

    render() {
        const {Row, Cell} = Table;
        const {id, skill} = this.props;

        return (
            <>
                <Grid.Row columns='equal' stretched onClick={this.onClickHandler} >
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
                        <Button loading={this.state.loading} color="teal" basic onClick={this.onFinalize}>
                            Edit
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                {this.state.expand && this.props.skill.technologies && this.renderTech()}
                {this.modalNewSkill()}
            </>
        );
    }


}

const mapStateToProps = state => {

    return {
        ...state

    };
};


export default connect(mapStateToProps, {technologiesCreate})(TechRow);