import React, {Component} from 'react';
import {Accordion, Button, Form, Grid, Icon, Popup, Table} from 'semantic-ui-react';
import {Router} from "../../routes";
import {technologiesCreate, technologiesDelete} from "../../redux/actions";
import {connect} from "react-redux";
import _ from "lodash";
import SkillModal from '../admin/modals/SkillModal';
import TechnologyModal from "../admin/modals/TechnologyModal";

class TechRow extends Component {

    state = {
        errorMessage: '',
        loading: false,
        expand: false,
        new: false,
        description: '',
        name: '',
        meta: '',
        openModalUpdateSkill: false,
        openModalTechnology: false,
        openModalUpdateTechnology: false,
        uidTech: '',
        val: null
    }

    style = {
        borderRadius: 0,
        opacity: 0.7,
        padding: '2em',
    }


    delete = (key) => {

        this.setState({loading: true, openModalUpdateSkill: false, openModalTechnology: false});

        this.props.technologiesDelete({
            uid: this.props.skill.key,
            tuid: key
        })

        this.setState({loading: false, openModalUpdateSkill: false, openModalTechnology: false});
    };

    renderModalUpdateTech = () => {

        return (
            <TechnologyModal openForUpdate={this.state.openModalUpdateTechnology} uid={this.state.uidTech}
                             name={this.state.val.name}
                             skillKey={this.props.skill.key}
                             description={this.state.val.description} meta={this.state.val.meta}
                             onClose={() => this.setState({
                                 openModalUpdateSkill: false,
                                 openModalTechnology: false,
                                 openModalUpdateTechnology: false
                             })}/>
        );
    }


    onClickHandler = (event) => {
        const {expand} = this.state;
        this.setState({expand: !expand, openModalUpdateSkill: false, openModalTechnology: false})
    }

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
                                        _.map(this.props.skill.technologies, (val, uid) => {

                                            return (

                                                <Table.Row key={uid}>
                                                    <Table.Cell>{val.name}</Table.Cell>
                                                    <Table.Cell>
                                                        {val.description.slice(0, 80)}
                                                        {(val.description.length > 80) ?
                                                            <Popup style={this.style}
                                                                   inverted
                                                                   trigger={
                                                                       <span style={{color: 'blue'}}>
                                                                           ...Ver mas
                                                                       </span>
                                                                   } content={val.description}/>
                                                            :''}
                                                    </Table.Cell>
                                                    <Table.Cell>{val.meta}</Table.Cell>
                                                    <Table.Cell textAlign='right'>
                                                        <Button.Group>
                                                            <Button color='blue' icon="edit"
                                                                    loading={this.state.loading}
                                                                    onClick={() => this.setState({
                                                                        val: val,
                                                                        uidTech: uid,
                                                                        openModalTechnology: false,
                                                                        openModalUpdateSkill: false,
                                                                        openModalUpdateTechnology: true
                                                                    })}/>
                                                            <Button.Or/>
                                                            <Button color='red' icon="trash alternate outline"
                                                                    loading={this.state.loading}
                                                                    onClick={() => this.delete(uid)}/>
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
        return (
            <SkillModal openForUpdate={this.state.openModalUpdateSkill} uid={this.props.skill.key}
                        name={this.props.skill.name}
                        description={this.props.skill.description} technologies={this.props.skill.technologies}
                        onClose={() => this.setState({openModalUpdateSkill: false, openModalTechnology: false})}/>
        );
    }


    modalNewTechnology = () => {

        return (
            <TechnologyModal open={this.state.openModalTechnology} skillKey={this.props.skill.key}
                             skillName={this.props.skill.name}
                             onClose={() => this.setState({openModalUpdateSkill: false, openModalTechnology: false})}/>
        );
    }


    render() {
        const {id, skill} = this.props;
        const {expand} = this.state;
        return (
            <>
                <Grid.Row columns='equal' stretched>
                    <Grid.Column width={1} style={{margin: 'auto'}}>
                        {expand ?
                            (<Icon size={'large'} onClick={(event) => this.onClickHandler(event)}
                                  name={'arrow up'}/>) :
                            (<Icon size={'large'} onClick={(event) => this.onClickHandler(event)}
                                  name={'arrow down'}/>)
                        }
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <p>{id}</p>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p>{skill.name}</p>
                    </Grid.Column>
                    <Grid.Column>
                        {skill.description.slice(0, 80)}
                        {(skill.description.length > 80) ?
                        <Popup style={this.style}
                               inverted
                               trigger={
                                   <span style={{color: 'blue'}}>
                                       ...Ver mas
                                   </span>
                               } content={skill.description}/>
                        :''}
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button loading={this.state.loading} color="green" basic
                                onClick={(() => this.setState({
                                    openModalTechnology: true,
                                    openModalUpdateSkill: false,
                                    openModalUpdateTechnology: false
                                }))}>
                            Add
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button loading={this.state.loading} color="teal" basic
                                onClick={() => this.setState({
                                    openModalUpdateSkill: true,
                                    openModalTechnology: false,
                                    openModalUpdateTechnology: false
                                })}>
                            Edit
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                {this.state.expand && this.props.skill.technologies && this.renderTech()}
                {this.state.openModalUpdateSkill && this.renderModalUpdateSkill()}
                {this.state.openModalTechnology && this.modalNewTechnology()}
                {this.state.openModalUpdateTechnology && this.renderModalUpdateTech()}


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