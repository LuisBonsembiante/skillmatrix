import React, {Component} from 'react';
import {Menu, Segment, Label, Search, Divider, Dimmer, Loader} from 'semantic-ui-react';
import {Link} from '../../routes';
import _ from 'lodash'
import Cards from "./Cards";
import MenuItems from "./MenuItems";
import {connect} from 'react-redux';
import {skillsFetch, userDataFetch} from "../../redux/actions";
import ProfileInfo from "./ProfileInfo";

class MainDash extends Component {

    state = {
        activeItem: '',
        isLoading: false,
        value: '' // Value of the search Field
    };

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
    };

    componentDidMount() {
        this.props.userDataFetch();
        this.props.skillsFetch();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {skills} = this.props;
        const {activeItem} = this.state;

        if (skills.length === 0 && nextProps.skills.length > 0) {
            this.setState({activeItem: nextProps.skills[0].name})
        }
        if (skills.length > 0 && activeItem === '') {
            this.setState({activeItem: skills[0].name})
        }
    }


    handleResultSelect = (e, {result}) => this.setState({activeItem: result.name, value: result.name});
    resetComponent = () => this.setState({isLoading: false, results: [], value: ''});
    handleSearchChange = (e, {value}) => {
        const {skills} = this.props;
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.name) || Object.values(result.technologies).some( (tech) => re.test(tech.name))
skillsFetch,
            this.setState({
                isLoading: false,
                results: _.filter(skills, isMatch),
            })
        }, 300)
    };

    render() {
        const {isLoading, results, value, activeItem} = this.state;
        const {skills} = this.props;
        const resultRenderer = ({name}) => <Label content={name} color='blue' onClick={this.handleItemClick}/>;

        return (
            <div>
                <ProfileInfo/>
                <Divider/>
                <Menu attached='top' pointing secondary pagination>
                    <MenuItems
                        items={skills}
                        activeItem={activeItem}
                        handleItemClick={this.handleItemClick}
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
                    {!this.props.loading && <Cards skillSelected={activeItem}/>}
                </Segment>
            </div>
        );
    }

}

const mapStateToProps = state => {

    return {
        skills: state.fireBase.skills,
        loading: !!state.fireBase.loading
    };
};

export default connect(mapStateToProps, {skillsFetch, userDataFetch})(MainDash);



