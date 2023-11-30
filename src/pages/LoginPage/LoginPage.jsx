import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Grid, Header, Icon, Form, Segment, Button, Message } from "semantic-ui-react";

import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";

export default function LoginPage({handleSignUpOrLogin}) {

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // HTTP request to the server
            await userService.login(state);
            navigate('/')
            handleSignUpOrLogin();

        } catch(err) {
            console.log(err);
            setError('Check terminal and console.')
        }
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="black" textAlign="center">
                    <Icon color='red' name='users' />Sign In
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" class="btn">
                            Login
                        </Button>
                        <Message>
                            New to Us? <Link to="/signup">Sign Up</Link>
                        </Message>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )

}