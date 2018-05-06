import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import HomeIcon from '@material-ui/icons/Home';
import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from "./ForgetPassword";
import { withStyles } from 'material-ui/styles'
import EditUserProfile from "./EditUserProfile";
const theme = createMuiTheme();

const styles = theme => ({
    root:{
        flexGrow:1,

    },
    button:{
        flex:1,
        direction: 'row',
        justify: 'flex-end',
        alignItems: 'flex-start',
        textAlign: 'right',
    }


})
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            currentUser: null,
            displayName: "",
        };

    }

    updateDisplayName = (name) => {
        this.setState({
            displayName: name,
        })
    }

    componentWillMount() { auth.onAuthStateChanged(user => {

        if (user) {
            if(user.emailVerified ||  (user.providerData[0].providerId === 'facebook.com')){
                this.setState({
                        authenticated: true,
                        currentUser: user,
                        loading: false ,
                        displayName: user.displayName
                    },
                    () => { this.props.history.push('/') })
            }
            else{
                alert("something is wrong! with user authentication")
            }

        } else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            },() => { this.props.history.push('/login') })
        }
    });
    }

    render () {
        const { authenticated, loading } = this.state;
        const { classes } = this.props
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>

                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    displayName={this.state.displayName}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgetpassword" component={ForgetPassword} />
                <Route exact path="/edituserprofile" component={() => <EditUserProfile updateDisplayName={this.updateDisplayName} />}  />
            </div>
        );
        return (
           <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Simple Note
                            </Typography>
                            { authenticated &&
                                <div className={classes.button} >
                                    <Button variant="raised" color="primary" onClick={() => this.props.history.push('/')}> <HomeIcon/> </Button>
                                    <Button variant="raised" color="default"
                                            onClick={() => this.props.history.push("/edituserprofile") }
                                    > Edit Profile </Button>
                                    <Button variant="raised" color="default" onClick={() => auth.signOut() }>Log out</Button>
                                </div>
                            }
                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(styles)(App));
