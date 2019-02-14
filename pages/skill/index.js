import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import Layout from '../../components/commons/Layout';
import {Link} from '../../routes';
import TechRow from '../../components/dash/TechRow';
import {connect} from "react-redux";
import withAuth from "../../components/utils/withAuth";
import _ from "lodash";

class SkillsIndex extends Component {

    static async getInitialProps(props) {
          return {};
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

    render() {

        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <h3>Skills</h3>

                <Link route={`/skills/new`}>
                    <a>
                        <Button primary  floated="right" style={{ marginBottom: 10 }}>Create Skill</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Name</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Techs</HeaderCell>
                            <HeaderCell>Options</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                         {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {this.props.skills.length} skills.</div>
            </Layout>
        );
    }
}


const mapStateToProps = state => {

    const skills = _.map(state.fireBase.skills, (val, uid) => {
        return {...val, key: uid}; // {shift: 'Monday', name:'s', id:'1j2j34'};
    });

    return {
        ...state,
        skills,
        loading: state.fireBase.loading
    };
};


export default connect(mapStateToProps)(withAuth(SkillsIndex))