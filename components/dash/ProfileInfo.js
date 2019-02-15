import React from "react";
import {connect} from "react-redux";
import {Button, Form, Grid, Image} from "semantic-ui-react";
import {getLargeImage} from "../utils/imagesManager";
import {userDataUpdate} from "../../redux/actions";

const _profileInfo = (props) => {

    const updateUserData = () =>  {
        const data = {
            name: props.user.displayName || 'No named', // TODO get data from input
            position: 'Master of BlockChain', // TODO add input for that
            yearsOfExperience: 98788, // TODO map this with dropdown
            email: props.user.email,
        };

        props.userDataUpdate(data);
    };

    return (
        <>
            <h1>Profile Info</h1>
            <br/>
            <br/>
            <Form className='attached fluid'>
                <Grid columns={2}>
                    <Grid.Row stretched>
                        <Grid.Column width={6}>
                            <Image src={props.user.photoURL || getLargeImage()} size='medium' circular/>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Form.Field disabled={true}>
                                <label>Email</label>
                                <input value={props.user.email}
                                       placeholder='First Name'
                                       onChange={() => {}}/>
                            </Form.Field>

                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First Name' placeholder='First Name' type='text'/>
                                <Form.Input fluid label='Last Name' placeholder='Last Name' type='text'/>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Position' placeholder='Position' type='text'/>
                                <Form.Input label='Experience' list='experience' placeholder='Years of experience...'/>
                                <datalist id='experience'>
                                    <option value='1 Year'/>
                                    <option value='5+ Years'/>
                                    <option value='10+ Years'/>
                                </datalist>
                            </Form.Group>

                            <Button color='blue' basic loading={props.loading}
                                    onClick={updateUserData}>
                                Save
                            </Button>
                        </Grid.Column>
                        <br/>
                    </Grid.Row>
                </Grid>
            </Form>
        </>
    )
};

const mapStateToProps = state => {
    return {
        ...state.auth,
        loading: state.auth.loading || state.fireBase.loading,
        userData: state.fireBase.userData
    }
};

export default connect(mapStateToProps, {userDataUpdate})(_profileInfo);