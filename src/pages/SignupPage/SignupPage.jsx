import { useState } from "react";
import { Grid, Header, Form, Segment, Button, Icon, Image } from "semantic-ui-react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function SignUpPage({handleSignUpOrLogin}) {

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: ''
    });

    const [loading, setLoading] = useState(false)

    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        // since there is a profile photo - need to convert the data into a FormData object
        const formData = new FormData();
        formData.append('photo', photo)
        
        // adds all key-value pairs to the FormData object in preparation to send to the Express Server
        for (let key in state) {
            formData.append(key, state[key])
        }

        try {
            await userService.signup(formData);
            handleSignUpOrLogin();
            setLoading(false)
            navigate('/')
        } catch(err) {
            console.log(err.message)
            setError('Try signing up again!')
        }
    }

    function handleChange(e) {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput(e) {
        console.log(e.target.files)
        setPhoto(e.target.files[0])
    }

    if (loading) {
        return (
            <header>
                <Loading />
            </header>
        )
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src="https://i.imgur.com/94MZOzLl.png" centered size="large"/>
                <Header as="h2" color="black" textAlign="center">
                <Icon color='red' name='users' />Sign Up
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input
                            type="username"
                            name="username"
                            placeholder="Username"
                            value={state.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type="password"
                            name="passwordConf"
                            placeholder="Confirm Password"
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                        />
                        <Form.Field>
                            <Form.Input
                                type="file"
                                name="photo"
                                placeholder="upload image"
                                onChange={handleFileInput}
                            />
                        </Form.Field>
                        <Button type="submit" className="btn">
                            Signup!
                        </Button>
                    </Segment>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
            </Grid.Column>
        </Grid>
    )
}
