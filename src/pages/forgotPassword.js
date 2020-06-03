import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {firebaseApp}from "../firebase";
import { AuthContext } from "../Auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//MUI design stuff
function Copyright() {
    return (
      <Typography variant="caption" color="textSecondary" align="center">
        {'made with ❤️ from '}
        <Link color="inherit" href="https://www.biust.ac.bw/">
          BIUST
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));



//default export stuff
const ForgotPassword = ({ history}) => {

    const handleForgotPassword = useCallback(
      async event => {
        event.preventDefault();
        const { email } = event.target.elements;
        if (email.value==""){
            window.alert("Please enter your email.")
        }
        else{
            try {
                await firebaseApp
                  .auth()
                  .sendPasswordResetEmail(email.value);
                  window.alert("Done! Please check your email inbox for the email reset link.")
                  history.push("/login");
       
              } catch (error) {
                alert(error);
              }
        }
        
      },
      [history]
    );
  
    //const { currentUser } = useContext(AuthContext);
    const classes = useStyles();
  
    //if (currentUser) {
    //  return <Redirect to="/" />;
    //}
  
    return (
      <div>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <img alt='Botswana coat of arms' width='100px' height='100px' src={"/images/coatOfArms.png"} ></img>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <p></p>
        <Typography variant="caption">
            Please enter your login email below then press 'Reset Password.' A reset email link will be sent to your email inbox. Use it to change your password.
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleForgotPassword}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
      </div>
    );
  };


  export default withRouter(ForgotPassword);