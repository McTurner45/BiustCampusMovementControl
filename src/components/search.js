import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {db, firebaseApp} from '../firebase';
import Grid from '@material-ui/core/Grid';
import InfoDisplaySearch from './InfoDisplaySearch'
import { Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles={
    card:{
        display: 'flex',
        margin: '100px',
        alignItems:'center',
        justifyContent:'center',
    searchIcon:{
        gridRowEnd: 1,
        order:2,
        gridColum:2,
    },
    searchBar:{
        gridRow: 1,
        order:1,
        gridColum:1,
    }

    },
}

export class search extends Component {

    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            searchId:'',
            applicationInfo: null,
            exists:'',
            pressEnter: '',
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        var searchId = this.state.searchId;
        console.log(searchId);

        db.collection("applicants")
        .where('identificationNum','==',`${this.state.searchId}`)
        .get()
        .then((querySnapshot,doc) =>{

            if (querySnapshot.empty){
                this.setState({exists: 'ID Not Found.'})
                console.log("document empty?: ", querySnapshot.empty)
                this.setState({pressEnter: ''});
            }
            console.log(querySnapshot);
            var permitDetails={};
            var dataItems=[];
            querySnapshot.forEach((doc)=> {
               
            
            //for each applicant, find matching permits
            var applicantId = doc.id;
            db.collection("permits").where('applicantId','==',`${applicantId}`).get()
            .then(querySnapshot =>{
                querySnapshot.forEach((doc)=>{
                    permitDetails={
                        permitId: doc.id,
                        applicantId: doc.data().applicantId,
                        type: doc.data().type,
                        organisation: doc.data().organisation,
                        contactPerson: doc.data().contactPerson,
                        contactPersonDesignation: doc.data().contactPersonDesignation,
                        contactPersonNum: doc.data().contactPersonNum,
                        startDate: doc.data().startDate,
                        endDate: doc.data().endDate,
                        endTime: doc.data().endTime,
                        departureLocation: doc.data().departureLocation,
                        destination: doc.data().destination,
                        reason: doc.data().reason,
                        applyDate: doc.data().applyDate,
                        status: doc.data().status,
                        householdMember1Fullname: doc.data().householdMember1Fullname,
                        householdCharacteristics: doc.data().householdCharacteristics,
                        householdMember1Phone: doc.data().householdMember1Phone,
                        householdMember2Fullname: doc.data().householdMember2Fullname,
                        householdMember2Phone: doc.data().householdMember2Phone,
                        toiletTypes: doc.data().toiletTypes,
                    };
                    return permitDetails;
                })
                return permitDetails;
            })
            .then(permitDetails=>{

                dataItems.push({
                    fullname: doc.data().fullname,
                    gender: doc.data().gender,
                    identificationNum: doc.data().identificationNum,
                    nationality: doc.data().nationality,
                    dateOfBirth: doc.data().dateOfBirth,
                    physicalAddress: doc.data().physicalAddress,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    applicantId: doc.id,
                    location: doc.data().location,
                    permitId: permitDetails.permitId,
                    applicantId: doc.data().applicantId,
                    type: permitDetails.type,
                    organisation: permitDetails.organisation,
                    contactPerson: permitDetails.contactPerson,
                    contactPersonDesignation: permitDetails.contactPersonDesignation,
                    contactPersonNum: permitDetails.contactPersonNum,
                    startDate: permitDetails.startDate,
                    endDate: permitDetails.endDate,
                    endTime: permitDetails.endTime,
                    departureLocation: permitDetails.departureLocation,
                    destination: permitDetails.destination,
                    reason: permitDetails.reason,
                    applyDate: permitDetails.applyDate,
                    status: permitDetails.status,
                    householdMember1Fullname: permitDetails.householdMember1Fullname,
                    householdCharacteristics: permitDetails.householdCharacteristics,
                    householdMember1Phone: permitDetails.householdMember1Phone,
                    householdMember2Fullname: permitDetails.householdMember2Fullname,
                    householdMember2Phone: permitDetails.householdMember2Phone,
                    toiletTypes: permitDetails.toiletTypes,
                })
                return dataItems;
            })
            .then(dataItems=>{
                this.setState({applicationInfo: dataItems});
                if (this._isMounted){this.setState({isLoading: false})}
            })
            .catch(err=>console.log(err));
        })
        })
        .catch(err=>console.log(err));
    }

    componentDidMount(){
        var searchId = this.state.searchId;
        console.log(searchId);  
    };

    handleChange=(event)=>{
        this.setState({
            searchId: event.target.value
        });
    }

    render() {

        //Sending Data to Info Display component
        let completePermitMarkup=this.state.applicationInfo?(
        this.state.applicationInfo.map(
            (info) => <InfoDisplaySearch key={info.permitId} info={info}/>)
        ) : <Typography variant="captioned">{this.state.pressEnter}</Typography>

        return (
            <div>
            <Grid container className="container" >
                <Grid item>
                    <Typography variant = 'h5' color="primary"> <u>Search Permits Using Applicant's ID</u></Typography>
                    <p></p>
                    <p></p>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">

                            <Grid item xs={8}>
                                <TextField
                                id="searchId"
                                label="Omang or Passport Number" 
                                variant="outlined" 
                                onChange={this.handleChange}
                                fullWidth
                                
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/*<IconButton type ="submit" edge='end' size = 'medium' onClick={this.handleSubmit} on color="primary" aria-label="home">
                                        <SearchIcon/>
                                </IconButton> */}
                                <Button
                                    type ="submit" 
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon />}
                                >
                                    SEARCH
                                </Button>
                            </Grid>

                        </Grid>
                        
                    </form>
                    <p></p>
                    <p></p>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Typography variant="button">{this.state.exists}</Typography>
                    {completePermitMarkup} 
                </Grid>
            </Grid>
    
            </div>
        )
    }
}

export default search
