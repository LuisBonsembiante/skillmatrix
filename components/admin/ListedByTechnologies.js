import {Dimmer, Divider, Label, Loader, Menu, Search, Segment} from "semantic-ui-react";
import MenuItems from "../dash/MenuItems";
import _ from "lodash";
import TechnologiesCards from "./TechnologiesCards";
import EmployeesData from "./EmployeesData";
import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../utils/withAuth";


class ListedByTechnologies extends Component {

    state = {
        activeSkill: 'JavaScript', // TODO Set the first one for default
        isLoading: false,
        value: '', // Value of the search Field
        selectedTechs: []
    };


    handleSkillItemClick = (e, {name}) => {
        this.setState({activeSkill: name})
    };
    handleResultSelect = (e, {result}) => this.setState({activeSkill: result.name, value: result.name});
    resetComponent = () => this.setState({isLoading: false, results: [], value: ''});
    handleSearchChange = (e, {value}) => {
        const {skills} = this.props;
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result =>
                re.test(result.name)
                || Object.values(result.technologies ? result.technologies : {}).some((tech) => re.test(tech.name));
            this.setState({
                isLoading: false,
                results: _.filter(skills, isMatch),
            })
        }, 300)
    };

    render() {
        const {isLoading, results, value, activeSkill} = this.state;

        const resultRenderer = ({name}) => <Label content={name} color='blue' onClick={this.handleSkillItemClick}/>;
        return (
            <>

                <Menu attached='top' pointing secondary pagination>
                    <MenuItems
                        items={this.props.skills}
                        activeItem={activeSkill}
                        handleItemClick={this.handleSkillItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Search
                                loading={isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                                results={results}
                                resultRenderer={resultRenderer}
                                value={value}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached='bottom' style={{marginLeft: 0}}>
                    <Dimmer active={this.props.loading}>
                        <Loader/>
                    </Dimmer>
                    {!this.props.loading &&
                    <TechnologiesCards
                        skills={this.props.skills}
                        skillSelected={activeSkill}
                    />
                    }
                </Segment>

                <Divider/>
                <EmployeesData selectedTechs={this.state.selectedTechs}/>
            </>
        )
    }
}

const mapStateToProps = state => {

    return {
        ...state,
        skills: state.fireBase.skills,
        loading: !!state.fireBase.loading
    };
};


export default connect(mapStateToProps, {})(withAuth(ListedByTechnologies))
