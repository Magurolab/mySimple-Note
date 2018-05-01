import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import { Route, Redirect } from "react-router-dom";

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

class EditUserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        auth.currentUser.updateProfile( { displayName: this.state.name } )
            .then(() => {
                console.log(this.props);
                this.props.updateDisplayName();
                this.props.history.push("/");
            })
            .catch(authError => {
                alert(authError);
            })
    }
    ;
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Edit User Profile</h1>

                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                    type="text"
                                />
                                <br/>

                                <br />
                                <Button variant="raised" color="primary" type="submit">Confirm</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(EditUserProfile));
