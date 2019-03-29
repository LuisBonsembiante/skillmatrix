import React from 'react';
import {connect} from 'react-redux';
import {skillsFetch, usersFetch} from "../../redux/actions";
import {
    Popup,
    Menu,
    Card,
    Feed,
    Search,
    Segment,
    Label,
    Grid
} from "semantic-ui-react";
import _ from "lodash";

class ListedByNames extends React.Component {

    state = {
        selectedEmployee: '', // TODO Set the first one for default
        isLoading: false,
        value: '', // Value of the search Field
        selectedUser: [],
        allTechnologiesFlatten: {}
    };

    componentDidMount() {
        this.props.skillsFetch();
        this.props.usersFetch();
    }

    handleItemClick = (e, {name}) => {
        this.setState({selectedEmployee: name})
    };

    handleResultSelect = (e, {result}) => this.setState({
        selectedEmployee: result.displayName,
        value: result.displayName
    });

    resetComponent = () => this.setState({isLoading: false, results: [], value: '', selectedEmployee: ''});
    handleSearchChange = (e, {value}) => {
        const {users} = this.props;
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result =>
                re.test(result.displayName)
                || re.test(result.email);
            this.setState({
                isLoading: false,
                results: _.filter(users, isMatch).slice(0, 10),
            })
        }, 300)
    };

    techLabel(uid, user) {
        const {technologies} = this.props;
        let techs = {};
        technologies.map((val, uid) => {
            techs = {...techs, ...val};
        });
        const tech = user.technologies[uid];
        if (!tech || !tech.levelOfKnowledge || tech.levelOfKnowledge.value < 0) return null;
        return (
            <>
                <Label as='a' style={{marginTop: '0.25rem', marginBottom: '0.5rem'}}
                       color={tech.levelOfKnowledge.color}>
                    {techs[uid] ? techs[uid].name : null}
                    <Label.Detail>{tech.levelOfKnowledge.text}</Label.Detail>
                </Label>
            </>
        )
    }


    render() {
        const {isLoading, results, value, selectedEmployee} = this.state;
        const {users} = this.props;

        const usersToRender = selectedEmployee.length > 2
            ? _.filter(users, {'displayName': selectedEmployee})
            : users;

        const resultRenderer = ({displayName, position}) => {
            if (!displayName) return null;
            return <Label
                        content={
                            (<>
                                {displayName}
                                <Label.Detail>{position}</Label.Detail>
                            </>)}
                        color='grey'
                        onClick={this.handleItemClick}/>

        };

        return (
            <>
                <Menu attached='top' pointing secondary pagination>
                    <Menu.Item style={{textAlign: 'centered'}}>
                        {'Total Employees: ' + Object.keys(users).length}
                    </Menu.Item>

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
                    <Card.Group itemsPerRow={3} stackable>
                        {!this.props.loading &&
                        _.map(usersToRender,
                            (item, uid) => {
                                return (
                                    <Popup key={item + uid}
                                           position='bottom center'
                                           flowing
                                           size='huge'
                                           style={{maxWidth: 700}}
                                           trigger={
                                               <Card>
                                                   <Card.Content>
                                                       <Feed>
                                                           <Feed.Event>
                                                               <Feed.Label image={item.photoURL}/>
                                                               <Feed.Content>
                                                                   <Feed.Date content={item.displayName}/>
                                                                   <Feed.Summary>
                                                                       {item.email}
                                                                   </Feed.Summary>
                                                               </Feed.Content>
                                                           </Feed.Event>
                                                       </Feed>
                                                   </Card.Content>
                                               </Card>

                                           }
                                    >
                                        <Popup.Header>Details</Popup.Header>
                                        <br/>
                                        <Popup.Content>
                                            <Grid centered columns={2}>
                                                {
                                                    item.technologies
                                                        ? Object.keys(item.technologies).map(
                                                        (uid) => this.techLabel(uid, item))
                                                        : null
                                                }
                                            </Grid>
                                        </Popup.Content>

                                    </Popup>
                                );
                            })
                        }
                    </Card.Group>
                </Segment>
            </>
        )
    }

}


const mapStateToProps = state => {
    return {
        skills: state.fireBase.skills,
        users: state.fireBase.users || [],
        technologies: !state.fireBase.skills ? [] : _.compact(state.fireBase.skills.map((skill) => skill.technologies))

    }
}

export default connect(mapStateToProps, {skillsFetch, usersFetch})(ListedByNames)
