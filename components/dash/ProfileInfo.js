import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Form, Grid, Image} from "semantic-ui-react";
import {getLargeImage} from "../utils/imagesManager";
import {userDataUpdate} from "../../redux/actions";

class _profileInfo extends Component {

    state = {
        displayName: this.props.userData ? this.props.userData.displayName || '' : this.props.user.displayName || '',
        position: this.props.userData ? this.props.userData.position : '',
        yearsOfExperience: this.props.userData ? this.props.userData.yearsOfExperience : '',
        email: this.props.user.email,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {userData} = this.props;
        if(nextProps.userData && (!userData || userData.position !== nextProps.userData.position)) {
            this.setState({
                displayName: nextProps.userData ? nextProps.userData.displayName || undefined : nextProps.user.displayName || undefined,
                position: nextProps.userData ? nextProps.userData.position : '',
                yearsOfExperience: nextProps.userData ? nextProps.userData.yearsOfExperience : undefined,
                email: nextProps.user.email,
            })
        }
    }

    updateUserData  = () =>  {
        console.log(this.state)
        debugger;
        const {displayName, position, yearsOfExperience, email} = this.state;
        this.props.userDataUpdate({displayName, position, yearsOfExperience, email});
    };

    positionItems() {
        const positions = ['Front-End Dev', 'Back-End Dev', 'Full-Stack Dev', 'QA'];
        return positions.map((position, index) => (
            <option value={position} key={position + index}/>
        ));
    };



    setDisplayName(value) {this.setState({displayName: value});}
    setPosition(value) {this.setState({position: value});}
    setYearsOfExperience(value) {this.setState({yearsOfExperience: value});}

    render() {
        const {displayName, position, yearsOfExperience } = this.state;
        return (
            <>
                <h1>Profile Info</h1>
                <br/>
                <br/>
                <Form className='attached fluid'>
                    <Grid columns={2}>
                        <Grid.Row stretched>
                            <Grid.Column width={6}>
                                <Image src={this.props.user.photoURL || getLargeImage()} size='medium' circular/>
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <Form.Field disabled={true}>
                                    <label>Email</label>
                                    <input value={this.props.user.email}
                                           placeholder='First Name'
                                           onChange={() => {
                                           }}/>
                                </Form.Field>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid label='Display Name'
                                        placeholder='First & Last Name'
                                        type='text'
                                        value={displayName}
                                        onChange={(e, {value}) => this.setDisplayName(value)}
                                    />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label='Position'
                                        list='position'
                                        placeholder='Position'
                                        type='text'
                                        value={position}
                                        onChange={(e, {value}) => this.setPosition(value)}
                                    />
                                    <datalist id='position'>
                                        {this.positionItems()}
                                    </datalist>
                                    <Form.Input
                                        label='Experience'
                                        list='experience'
                                        placeholder='Years of experience...'
                                        value={yearsOfExperience}
                                        onChange={(e, {value}) => this.setYearsOfExperience(value)}
                                    />
                                    <datalist id='experience'>
                                        <option value='1 Year'/>
                                        <option value='5+ Years'/>
                                        <option value='10+ Years'/>
                                    </datalist>
                                </Form.Group>

                                <Button color='blue' basic loading={this.props.loading}
                                        onClick={() => this.updateUserData()}>
                                    Save
                                </Button>
                            </Grid.Column>
                            <br/>
                        </Grid.Row>
                    </Grid>
                </Form>
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state.auth,
        loading: state.auth.loading || !!state.fireBase.loading,
        userData: state.fireBase.userData
    }
};

export default connect(mapStateToProps, {userDataUpdate})(_profileInfo);