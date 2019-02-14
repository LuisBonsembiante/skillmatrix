import React from "react";
import {connect} from "react-redux";
import {Button, Form, Grid, Image} from "semantic-ui-react";

const _profileInfo = (props) => {

    const defaultImage = 'static/images/avatar/large/elyse.png';
    return (
        <>
            <h1>Profile Info</h1>
            <br/>
            <br/>
            <Form className='attached fluid'>
                <Grid columns={2}>
                    <Grid.Row stretched>
                        <Grid.Column width={6}>
                            <Image src={props.user.photoURL || defaultImage} size='medium' circular/>
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

                            <Button color='blue' basic loading={props.loading}>Save</Button>
                        </Grid.Column>
                        <br/>
                    </Grid.Row>
                </Grid>
            </Form>
        </>
    )
};

const mapStateToProps = state => {
    return {...state.auth}
};

export default connect(mapStateToProps, {})(_profileInfo);