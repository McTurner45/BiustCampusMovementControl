import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; //import higher order styles component
import {db, firebaseApp} from '../firebase';
import { alert } from 'react-alert';
import Snackbar from '@material-ui/core/Snackbar';
import Input from '@material-ui/core/Input';


//MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HomeIcon from '@material-ui/icons/Home';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PersonIcon from '@material-ui/icons/Person';
import TravelIcon from '@material-ui/icons/EmojiTransportation';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';




//setting style using jsx and higher order components
const styles={
    card:{
        display: 'flex',
        margin: '0px auto 40px auto',
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        minwidth:200,
        
    },
    content:{
        padding: 25
    },
    centerText:{
        textAlign:'center'
    },
    denyButton:{
        color:'#ffffff',
        backgroundColor:'#ff1919'
    },
    approveButton:{
        color:'#ffffff',
        backgroundColor:'#63FF00'
    },
    table:{
        minwidth:650
    }
};



export class InfoDisplay extends Component {

    
    state= {
        openDeny: false,
        setOpenDeny: false,
        openApprove: false,
        setOpenApprove: false,
        moreDetails: false,
        setMoreDetails: false,
        openList1:false,
        setopenList1:false,
        openList2:false,
        openList3:false,
        setOpenList2:false,
        comment: '',
        
    };

    //comment section in deny button

   //for buttons
    constructor(props) {
        super(props);
        this.approve = this.approve.bind(this);
        this.deny = this.deny.bind(this);
        this.toggleShowApproved =this.toggleShowApproved.bind(this);
        this.toggleShowDenied =this.toggleShowDenied.bind(this);  
        this.state={
            ShowApproved: false,
            showDenied: false,
            cardStatus: "Pending",
        };
    };
    
    approve(permitId) {
        
        this.handleCloseApprove();
        this.toggleShowApproved();
        this.setState({cardStatus: "Approved"});
        var verifierDetails={};
        var verifierEmail = firebaseApp.auth().currentUser.email;
        db.collection("verifiers").doc(`${verifierEmail}`)
        .get()
        .then(function(doc){
            
            verifierDetails={
                verifierName: doc.data().verifierName,
                verifierDesignation: doc.data().verifierDesignation,
                authPhone: doc.data().authPhone,
                authLocation: doc.data().authLocation,
                authOrganisation: doc.data().authOrganisation
            }
            console.log(verifierDetails.verifierName)
            return verifierDetails;
        })
        .then(verifierDetails=>{
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var today  = new Date();
            today.toLocaleDateString("en-US", options)
            var docRef=db.collection("permits").doc(`${permitId}`);
            return docRef.update({
                status: "Approved",
                comment: "",
                verifierName: verifierDetails.verifierName,
                verifierDesignation: verifierDetails.verifierDesignation,
                authPhone: verifierDetails.authPhone,
                authLocation: verifierDetails.authLocation,
                authOrganisation: verifierDetails.authOrganisation,
                verifierDate: today
            })
        })
        .then(function(){
            console.log("Approve Successfully Updated");
        })
        .catch(function(error){
            console.error("Error updating document: ", error);
        });
    };
    
    deny(permitId) {

        this.handleCloseDeny();
        this.toggleShowDenied();
        this.setState({cardStatus: "Denied"});
        var verifierDetails={};
        var verifierEmail = firebaseApp.auth().currentUser.email;
        db.collection("verifiers").doc(`${verifierEmail}`)
        .get()
        .then(function(doc){
            
            verifierDetails={
                verifierName: doc.data().verifierName,
                verifierDesignation: doc.data().verifierDesignation,
                authPhone: doc.data().authPhone,
                authLocation: doc.data().authLocation,
                authOrganisation: doc.data().authOrganisation
            }
            console.log(verifierDetails.verifierName)
            return verifierDetails;
        })
        .then(verifierDetails=>{
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var today  = new Date();
            today.toLocaleDateString("en-US", options)
            var docRef=db.collection("permits").doc(`${permitId}`);
            return docRef.update({
                status: "Denied",
                comment: this.state.comment,
                verifierName: verifierDetails.verifierName,
                verifierDesignation: verifierDetails.verifierDesignation,
                authPhone: verifierDetails.authPhone,
                authLocation: verifierDetails.authLocation,
                authOrganisation: verifierDetails.authOrganisation,
                verifierDate: today
            })
        })
        .then(function(){
            console.log("Deny Successfully Updated");
        })
        .catch(function(error){
            console.error("Error updating document: ", error);
        })

    };


    handleClickOpenDeny(){
        this.setState({openDeny:true});
    };
    
    handleCloseDeny(){
        this.setState({openDeny:false});
        
    };

    handleClickOpenApprove() {
        this.setState({openApprove:true});
    };
    
    handleCloseApprove(){
        this.setState({openApprove:false});
    };

    //for showing more details
    handleChange(){
        this.setState({setChecked: true});
    };
    handleChangeText=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    //FOr List Dropdown
    handleClickList1(){
        this.setState({openList1: !(this.state.openList1)});
    };
    handleClickList2(){
        this.setState({openList2: !(this.state.openList2)});
    };
    handleClickList3(){
        this.setState({openList3: !(this.state.openList3)});
    };

    //approved or denied stamps
    toggleShowApproved=()=>{
        const {showApproved} = this.state;
        this.setState({showDenied: false});
        this.setState({showApproved: true});      
    };
    toggleShowDenied=()=>{
        const {showDenied} = this.state;
        this.setState({showApproved: false});
        this.setState({showDenied: true});   
           
    };

    render() {
        const {classes, info:{fullname,gender,permitId,phone,dateOfBirth,identificationNum,nationality,physicalAddress,email,organisation,contactPerson,contactPersonDesignation,contactPersonNum,location,departureLocation,destination,reason,startDate,startTime,endDate,endTime,status,applyDate, type, householdMember1Fullname,householdCharacteristics,householdMember1Phone,householdMember2Fullname,householdMember2Phone,toiletTypes}} 
            = this.props; //same as const classes = this.props.classes;

        const {styles} = this.props;
        //this.setState({cardStatus: {status}});
                
        return (
            <Card className={classes.card} varient="outlined" raised={true}>
                
                <CardContent className={classes.content} varient="outlined">
                    <Typography variant="h4" color="primary"> {fullname}</Typography>
                    
                    <div>
                        <Typography variant="caption">Application ID: <strong>{permitId}</strong></Typography>
                        <br/>
                        <Typography variant="caption">Submitted On: {applyDate}</Typography>
                        <br/>
                        <Typography variant="overline">Application Status: <strong>{status}</strong></Typography>
                        <br/>
                        <Typography variant="overline">Permit Type: <strong>{type}</strong></Typography>
                        </div>
                    <p></p>

        {/*Listing Items*/}
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >
                        <ListItem button onClick={()=>this.handleClickList1()} button="true">
                            <ListItemIcon>
                                <PersonIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="PERSONAL DETAILS" />
                            {this.state.openList1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={this.state.openList1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <Card className={classes.card} varient="outlined" raised={true}>
                                    <CardContent className={classes.content}>

                                        <TableContainer>
                                            <Table className={classes.table} aria-label='personal details'>
                                                <TableBody>
                                                    <TableRow hover='true' >
                                                        <TableCell align="left">National ID:</TableCell>
                                                        <TableCell align="right">{identificationNum}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Gender:</TableCell>
                                                        <TableCell align="right">{gender}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Date of Birth:</TableCell>
                                                        <TableCell align="right">{dateOfBirth}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Nationality:</TableCell>
                                                        <TableCell align="right">{nationality}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Phone Number:</TableCell>
                                                        <TableCell align="right">{phone}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Email:</TableCell>
                                                        <TableCell align="right">{email}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Physical Address:</TableCell>
                                                        <TableCell align="right">{physicalAddress}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Location:</TableCell>
                                                        <TableCell align="right">{location}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        
                                    </CardContent>
                                </Card>
                            </ListItem>
                            </List>
                        </Collapse>
                    </List>

                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >
                        <ListItem button onClick={()=>this.handleClickList3()} button="true">
                            <ListItemIcon>
                                <HomeIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="HOUSEHOLD DETAILS" />
                            {this.state.openList3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={this.state.openList3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <Card className={classes.card} varient="outlined" raised={true}>
                                    <CardContent className={classes.content}>

                                        <TableContainer>
                                            <Table className={classes.table} aria-label='personal details'>
                                                <TableBody>
                                                    <TableRow hover='true' >
                                                        <TableCell align="left">Characteristics:</TableCell>
                                                        <TableCell align="right">{householdCharacteristics}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Toilet Types:</TableCell>
                                                        <TableCell align="right">{toiletTypes}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Member 1's Name:</TableCell>
                                                        <TableCell align="right">{householdMember1Fullname}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Member 1's Phone:</TableCell>
                                                        <TableCell align="right">{householdMember1Phone}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Member 2's Name:</TableCell>
                                                        <TableCell align="right">{householdMember2Fullname}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Memeber 2's Phone:</TableCell>
                                                        <TableCell align="right">{householdMember2Phone}</TableCell>
                                                    </TableRow>
                                                
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        
                                    </CardContent>
                                </Card>
                            </ListItem>
                            </List>
                        </Collapse>
                    </List>

                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >
                        <ListItem button onClick={()=>this.handleClickList2()} button="true" >
                            <ListItemIcon>
                                <TravelIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="TRAVEL DETAILS" />
                            {this.state.openList2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={this.state.openList2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <Card className={classes.card} varient="outlined" raised={true}>
                                    <CardContent className={classes.content}>

                                    <TableContainer>
                                            <Table className={classes.table} aria-label='personal details'>
                                                <TableBody>
                                                    <TableRow hover='true' >
                                                        <TableCell align="left">Organisation:</TableCell>
                                                        <TableCell align="right">{organisation}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Contact Person:</TableCell>
                                                        <TableCell align="right">{contactPerson}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Designation:</TableCell>
                                                        <TableCell align="right">{contactPersonDesignation}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Phone Number:</TableCell>
                                                        <TableCell align="right">{contactPersonNum}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Departure:</TableCell>
                                                        <TableCell align="right">{departureLocation}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Destination:</TableCell>
                                                        <TableCell align="right">{destination}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">From:</TableCell>
                                                        <TableCell align="right">{startDate}, {startTime}hrs</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">To:</TableCell>
                                                        <TableCell align="right">{endDate}, {endTime}hrs</TableCell>
                                                    </TableRow>
                                                    <TableRow hover='true'>
                                                        <TableCell align="left">Reason:</TableCell>
                                                        <TableCell align="right">{reason}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </CardContent>
                                </Card>
                            </ListItem>
                            </List>
                        </Collapse>
                    </List>
            {/*List Items Done*/}

            {/*Approve/Deny Buttons Start*/}

                    <div>
                    <Typography variant="button"><strong>Action:</strong></Typography>
                    <p></p>
                    <Grid container spacing={3} className="container">
                        <Grid item >
                            <Button
                                id="APPROVE"
                                variant="contained"
                                size="large"
                                className={classes.approveButton}
                                startIcon={<CheckIcon />}
                                onClick={()=>this.handleClickOpenApprove()}
                            >
                                APPROVE
                            </Button>
                            <Dialog
                                open={this.state.openApprove}
                                onClose={()=>this.handleCloseApprove()}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Please Confirm Your Action"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                         Are you sure you want to <h3><strong>APPROVE</strong></h3> application for <h4><strong>{fullname}</strong></h4>?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>this.handleCloseApprove()} color="primary">
                                        Cancel
                                    </Button>
                                <Button onClick={()=>this.approve(permitId)} color="primary" autoFocus>
                                        Approve
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>

                        <Grid item >
                            <Button
                                id="DENY"
                                variant="contained"
                                size="large"
                                className={classes.denyButton}
                                startIcon={<CloseIcon />}
                                onClick={()=>this.handleClickOpenDeny()}
                            >
                                DENY
                            </Button>
                            <Dialog
                                open={this.state.openDeny}
                                onClose={()=>this.handleCloseDeny()}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Please Confirm Your Action"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to <h5><strong>DENY</strong></h5> application for <h4><strong>{fullname}</strong></h4>?
                                    </DialogContentText>

                                    <form noValidate autoComplete="off">
                                        <div>
                                            <TextField
                                            id="comment"
                                            name='comment'
                                            label="Enter Comment Here"
                                            helperText="*Comment is required."
                                            variant="outlined"
                                            color='primary'
                                            multiline='true'
                                            fullWidth='ture'
                                            value={this.state.comment} 
                                            onChange={this.handleChangeText} 
                                            />
                                        </div>
                                    </form>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>this.handleCloseDeny()} color="primary">
                                        Cancel
                                    </Button>
                                <Button onClick={()=>this.deny(permitId)} color="primary" autoFocus>
                                        Deny
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </div>
    {/*Approve/Deny Buttons END*/}

            </CardContent>
            <CardContent>
                {this.state.showApproved && <ShowApprovedStamp/>}
                {this.state.showDenied && <ShowDeniedStamp/>}
            </CardContent>
    </Card>   
    )
}}


{/**Show Approved Stamp*/}

export class ShowApprovedStamp extends Component {
    render() {
        return (
            <div>
               <img src="/images/imgApproved.png" alt="approved image" with="251" height="75" ></img>
            </div>
        )
    }
}

export class ShowDeniedStamp extends Component {
    render() {
        return (
            <div>
               <img src="/images/imgDenied.png" alt="denied image" with="251" height="75" ></img>
            </div>
        )
    }
}



export default withStyles(styles)(InfoDisplay);
