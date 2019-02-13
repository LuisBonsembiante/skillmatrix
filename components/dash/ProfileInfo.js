import React from "react";
import {connect} from "react-redux";
import {Button, Form} from "semantic-ui-react";

const _profileInfo = (props) => {

    return (
        <>
            <h1>Profile Info</h1>
            <br/>
            <br/>
            <Form className='attached fluid'>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First Name' placeholder='First Name' type='text' />
                    <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input label='Position' placeholder='Position' type='text' />
                    <Form.Input label='Experience' list='experience' placeholder='Years of experience...' />
                    <datalist id='experience'>
                        <option value='1 Year' />
                        <option value='5+ Years' />
                        <option value='10+ Years' />
                    </datalist>
                </Form.Group>

                <Button color='blue'>Save</Button>
            </Form>
        </>
    )
};

const mapStateToProps = state => {
    return {}
};

export default connect(mapStateToProps, {})(_profileInfo);