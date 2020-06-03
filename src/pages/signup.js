import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {db, firebaseApp} from "../firebase";

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from '@material-ui/core';


const styles={
    form:{
        textAlign: 'center'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '15px auto 15px auto'
    },
    textField:{
        margin:'15px auto 15px auto'
    },
    button:
    {
        marginTop: 20,
        position: 'reletive'
    },
    customError:{
        color:'red',
        fontSize:'0.8rem',
        marginTop: '10'
    },
    progress:{
        position: 'absolute'
    }
};


export class signup extends Component {

    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            email:'',
            password: '',
            omang: '',
            fullname:'',

            loading: false,
            errors: {}
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.setState({
           loading : true
        });
        const userData={
            email:this.state.email,
            password:this.state.password,
            fullname:this.state.fullname,
            omang:this.state.omang,
            location:this.state.location
        };

        console.log('user data', userData);

        firebaseApp.auth().createUserWithEmailAndPassword(userData.email,userData.password).then((u)=>{
            console.log("U is: " , u);
            db.collection("users").doc(`${userData.omang}`).set({
                fullname:userData.fullname,
                email:userData.email,
                omang:userData.omang,
                location:userData.location
                })
                .then(function(){
                    console.log("document created successfully")
                })
                .catch(function(error){
                    console.error("Error while creating user:", error)
                });
        })
        .catch(err=>{
            if (err.code === 'auth/email-already-in-use'){
                return console.log('Email already in use.'); //res.status(400).json({email: 'Email already in use.'});
            }
            else{
                return console.log('error: ', err); //res.status(500).json({error: err.code});
            }
        }); 
        
        
        
    }
        
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {

        const{classes}=this.props;
        const{errors,loading}=this.state;
        

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography 
                    variant='h2' 
                    className={classes.pageTitle}
                    disabled={this.state.loading}> 
                        Register
                    </Typography>

                    <Typography 
                    variant='subtitle2' 
                    className={classes.pageTitle}
                    disabled={this.state.loading}> 
                        Create Your Account Here
                        <br></br>
                        *Please Give Correct Information
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField 
                        id="fullname" 
                        name="fullname" 
                        type="text" 
                        label="Full Names" 
                        className={classes.textField}
                        value={this.state.fullname} 
                        onChange={this.handleChange} 
                        fullWidth/>
                        
                        <TextField 
                        id="omang" 
                        name="omang" 
                        type="text" 
                        label="Identity No.(Omang)/Passport No." 
                        className={classes.textField}
                        value={this.state.omang} 
                        onChange={this.handleChange} 
                        fullWidth/>

                        <TextField 
                        id="location" 
                        name="location" 
                        type="text" 
                        label="Location" 
                        className={classes.textField}
                        value={this.state.location} 
                        onChange={this.handleChange} 
                        fullWidth/>    

                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth/>

                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>

                        <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="Password" 
                        label="Confirm Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth/>


                        {errors.general && (
                            <Typography 
                            variant="body2"
                            className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}


                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        //onClick={()=>this.handleSubmit()}
                        className={classes.button}>
                            <Link to="/inside">Register</Link>
                            
                            {
                            loading &&(
                                <CircularProgress 
                                size={30}
                                className={classes.progress}/>
                            )
                        }
                        </Button>
                        <br></br>
                        <small>
                            Already have an account?
                            <Link to="/login">Login Here</Link>
                        </small>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)