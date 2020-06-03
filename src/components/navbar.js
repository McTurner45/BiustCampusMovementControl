import React from 'react';
import { useCallback, useContext } from "react";
import {Link} from 'react-router-dom/'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles} from '@material-ui/core/styles';
import {firebaseApp} from '../firebase';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Search from './search';
import Dialog from '@material-ui/core/Dialog';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    align:"center"
  },
  card:{
    display: 'flex',
    margin: '0px auto 40px auto',
    alignItems:'center',
    justifyContent:'center',
},
  
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'relative',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }


  function SearchDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    
    console.log("search dialogie")
  
    return (
      <div>
        <Dialog className={classes.card} onClose={handleClose} aria-labelledby="search dialogue" open={open} maxWidth='xl' fullWidth={true} >
          <Search />
       </Dialog>
      </div>

    );
  }

  SearchDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //for search
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  function handleRefresh() {
    window.location.reload(false);
  };

  

  return (
    <div className={classes.root}>
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar >
            <Toolbar>
              <LightTooltip title="REFRESH" arrow>
                <IconButton edge="start" onClick={handleRefresh} className={classes.menuButton} color="inherit" aria-label="home">
                    <RefreshIcon/>
                </IconButton>
              </LightTooltip>
                <div style={{ 
                    float       : 'none', 
                    marginLeft  : 'auto',
                    marginRight : 'auto'
                }} centered>
                    <Typography variant="h5" className={classes.title} href="./" >
                       <strong>Biust Campus Movement Control</strong>
                    </Typography>
                </div>

                <LightTooltip title="Seach By ID" arrow>
                <IconButton edge="start" onClick={handleClickOpen} className={classes.menuButton} color="inherit" aria-label="home">
                    <SearchIcon/>
                </IconButton>
              </LightTooltip>
              <SearchDialog  open={open} onClose={handleClose} />

                {auth && (
                    <div>
                      <LightTooltip title="ACCOUNT" arrow>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        //onClick={handleMenu}
                        color="inherit"
                        
                    >
                        <AccountCircle />
                    </IconButton>
                    </LightTooltip>
                    </div>
                )}
                
                <LightTooltip title="SIGN OUT" arrow>
                <IconButton
                   edge="start" 
                   className={classes.menuButton} 
                   color="inherit" 
                   aria-label="home"
                   onClick={()=>firebaseApp.auth().signOut()}
                   >
                  <SignOutIcon/>
                </IconButton>
                </LightTooltip>
            </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      </React.Fragment>
    </div>
  
    );
}
