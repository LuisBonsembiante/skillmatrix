import React, {useState} from "react";
import {connect} from "react-redux";
import {Button, Form, Grid, Image} from "semantic-ui-react";
import {getLargeImage} from "../utils/imagesManager";
import {userDataUpdate} from "../../redux/actions";

const _profileInfo = (props) => {

    const {userData} = props;
    // console.log(props);
    const [position, setPosition] = useState(userData ? userData.position : '');
    const [yearsOfExperience, setYearsOfExperience] = useState(userData ? userData.yearsOfExperience : undefined);


    const updateUserData = () => {
        const data = {
            name: props.user.displayName || 'No named', // TODO get data from input
            position: position || 'Master of BlockChain', // TODO add input for that
            yearsOfExperience: yearsOfExperience, // TODO map this with dropdown
            email: props.user.email,
        };

        props.userDataUpdate(data);
    };

    const positionItems = () => {
        const positions = ['Front-End Dev', 'Back-End Dev', 'Full-Stack Dev', 'QA'];
        return positions.map((position, index) => (
            <option value={position} key={position + index}/>
        ));
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
                                       onChange={() => {
                                       }}/>
                            </Form.Field>

                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Name' placeholder='First & Last Name' type='text'/>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Position'
                                    list='position'
                                    placeholder='Position'
                                    type='text'
                                    value={position}
                                    onChange={(e, {value}) => setPosition(value)}
                                />
                                <datalist id='position'>
                                    {positionItems()}
                                </datalist>
                                <Form.Input
                                    label='Experience'
                                    list='experience'
                                    placeholder='Years of experience...'
                                    value={yearsOfExperience}
                                    onChange={(e, {value}) => setYearsOfExperience(value)}
                                />
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
        loading: state.auth.loading || !!state.fireBase.loading,
        userData: state.fireBase.userData
    }
};

export default connect(mapStateToProps, {userDataUpdate})(_profileInfo);