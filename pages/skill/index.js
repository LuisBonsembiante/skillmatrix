import React, {Component} from 'react';
import {Button, Grid, Label, Table} from 'semantic-ui-react';
import Layout from '../../components/commons/Layout';
import {Link} from '../../routes';
import TechRow from '../../components/dash/TechRow';
import {connect} from "react-redux";
import withAuth from "../../components/utils/withAuth";
import _ from "lodash";
import SkillModal from '../../components/admin/modals/SkillModal';

class SkillsIndex extends Component {

    state = {
        openModalNewSkill: false
    }



    renderRow() {
        return this.props.skills.map((skill, index) => {
            return <TechRow
                id={index}
                key={index}
                skill={skill}
            />
        });
    }

    renderModalNewSkill = () => {
        return (<SkillModal open={this.state.openModalNewSkill} onClose={ () => this.setState({openModalNewSkill: false})}/>);
    }

    render() {

        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                />

                <h3>Skills</h3>



                <Button primary  floated="right" onClick={() => this.setState({openModalNewSkill: true})} style={{ marginBottom: 10 }}>Create Skill</Button>


                <Grid centered celled columns='equal'>
                    <Grid.Row color='grey' columns={6}>
                        <Grid.Column textAlign='center'  width={1}>
                            <h3>+/-</h3>
                        </Grid.Column>
                        <Grid.Column textAlign='center'  width={2}>
                            <h3>ID</h3>
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={3}>
                            <h3>Name</h3>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <h3>Description</h3>
                        </Grid.Column>
                        <Grid.Column textAlign='center'  width={2}>
                            <h3>Edit</h3>
                        </Grid.Column>
                        <Grid.Column textAlign='center'  width={2}>
                            <h3>Delete</h3>
                        </Grid.Column>
                    </Grid.Row>
                    {this.renderRow()}
                </Grid>
                <Label color='teal'>
                    Found Skills:
                    <Label.Detail>{this.props.skills.length}</Label.Detail>
                </Label>

                {this.state.openModalNewSkill && this.renderModalNewSkill()}
            </Layout>
        );
    }
}


const mapStateToProps = state => {

    return {
        ...state,
        skills: state.fireBase.skills,
        loading: state.fireBase.loading
    };
};


export default connect(mapStateToProps)(withAuth(SkillsIndex))
