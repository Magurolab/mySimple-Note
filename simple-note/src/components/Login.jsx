import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth,FacebookProvider,GoogleProvider } from '../firebase';


import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.onFacebookLogin = this.onFacebookLogin.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
            .then(authUser => {
                if(!auth.currentUser.emailVerified){
                    alert("verify your email, and try again.")
                    return;
                }
                // alert(authUser.displayName)
            })
            .catch(authError => {
                alert(authError);
            })
    }

    onFacebookLogin = (event) => {

        event.preventDefault();
        // alert("hellooooooooooooo")
        var provider = FacebookProvider;
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
        // this.props.history.push("/");
    }
    onGoogleLogin = (event) =>{
        event.preventDefault();
        // alert("hellooooooooooooo")
        var provider = GoogleProvider;
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
        // this.props.history.push("/");

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Log in</h1>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                type="email"
                            />
                            <br />
                            <TextField
                                id="password"
                                label="Password"
                                className={classes.textField}
                                value={password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                type="password"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="submit">Log in</Button>
                        </form>

                        <form onSubmit={ this.onFacebookLogin } >
                            <br/>
                            <Button type="submit"  variant="raised" color="primary" >Log in With Facebook</Button>
                        </form>
                        <form onSubmit={ this.onGoogleLogin } >
                            <br/>
                            <Button type="submit"  variant="raised" color="secondary" >Log in With Google</Button>
                        </form>

                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                        <p>Forget your password? <Link to="/forgetpassword">Reset your password here</Link></p>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
