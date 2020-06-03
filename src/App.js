import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import { withRouter } from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { render } from '@testing-library/react';
import AuthRoute from './AuthRouteNims';
import {db, firebaseApp} from './firebase';
import verifyApplications from './pages/verifyApplications'
//Components
import Navbar from './components/navbar'

//Pages
{/*import login from './pages/login'
import forgotPassword from './pages/forgotPassword'*/}




const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#00e5ff',
        light:'#33eaff',
        dark:'#00a0b2',
        contrastText:'#ffff'
      },
      secondary: {
        main: '#ff2474',
        light:'#33eaff',
        dark:'#00a0b2',
        contrastText:'#ffff' 
      }
    },
    typography: {
      useNextVariants:true
    }  
  
});
const App =()=>{
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">

         <AuthProvider>
          <Router>
            <Navbar/>
            <div className="container">
             
                <PrivateRoute exact path="/" component={verifyApplications}/>
                <PrivateRoute exact path="/verifyApplications/" component={verifyApplications}/>
                {/*<Route exact path="/login" component={login}/>
                <Route exact path="/forgotPassword" component={forgotPassword}/>*/}
              
            </div>
          </Router>
        </AuthProvider>
        </div>
        </MuiThemeProvider>
    );
  };

export default App;
