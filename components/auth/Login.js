import React, {useState} from 'react';
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import {Link} from '../../routes';

export default (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Header as="h2" textAlign="center">
                    Login
                </Header>
                <Segment>
                    <Form size="large">
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Email address"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <Link href="/index">
                            <Button color="blue" fluid size="large"
                                    onClick={() => console.log(email, password)}>
                                Login
                            </Button>
                        </Link>

                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}