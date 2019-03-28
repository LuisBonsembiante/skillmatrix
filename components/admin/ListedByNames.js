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
    Label
} from "semantic-ui-react";
import _ from "lodash";

class EmployeesSkills extends React.Component {

    state = {
        selectedEmployee: '', // TODO Set the first one for default
        isLoading: false,
        value: '', // Value of the search Field
        selectedUser: []
    };

    componentDidMount() {
        this.props.usersFetch();
        this.props.skillsFetch();
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
                || Object.values(result.displayName ? result.displayName : {}).some((tech) => re.test(tech.displayName));
            this.setState({
                isLoading: false,
                results: _.filter(users, isMatch).slice(0, 10),
            })
        }, 300)
    };

    // techLabel(uid, user) {
    //     const {technologies} = this.props.users;
    //     let techs = {};
    //     technologies.map((val, uid) => {
    //         techs = {...techs, ...val};
    //     });
    //     const tech = user.technologies[uid];
    //     if (!tech || !tech.levelOfKnowledge) return null;
    //     return (
    //         <>
    //             <Divider/>
    //             <Label as='a' color={tech.levelOfKnowledge.color} key={uid}>
    //                 {techs[uid].name}
    //                 <Label.Detail>{tech.levelOfKnowledge.text}</Label.Detail>
    //             </Label>
    //         </>
    //     )
    // }


    render() {
        const {isLoading, results, value, selectedEmployee} = this.state;
        const {users} = this.props;

        const usersToRender = selectedEmployee.length > 2
            ? _.filter(users, {'displayName': selectedEmployee})
            : users;

        const resultRenderer = ({displayName, position}) =>
            <div key='content' className='content'>
                <Label
                    content={
                        (<>
                            {displayName}
                            <Label.Detail>{position}</Label.Detail>
                        </>)}
                    color='grey'
                    onClick={this.handleItemClick}/>
            </div>
        ;

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
                                           trigger={

                                               <Card key={item + uid}>
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
                                           key={item + uid}
                                    >

                                        <Popup.Header>Details</Popup.Header>
                                        {/* <Popup.Content>
                                            {Object.values(item.technologies).map((uid) => {
                                                return this.techLabel(uid, item);
                                            })}
                                        </Popup.Content>  */}

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
        selectedUser: state.fireBase.selectUserToSearch
    }
}

export default connect(mapStateToProps, {skillsFetch, usersFetch})(EmployeesSkills)
