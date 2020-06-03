import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import {Pie,Line} from 'react-chartjs-2';
import MUIDataTable from "mui-datatables";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chart from '../components/Chart'
import { TextField } from '@material-ui/core';


const columns = ["Name", "studentId", "Omang/passport",
 "contactNum", "email", "physicalAdd", "UG/PG", "department","programme","Accomodation","Temp"];
const data = [
  ["Joe James", "17002009", "451222879", "72342198", 
  "joe@gmail.com","772 Palapye", "UG", "Science", "Mathematics", "Oncampus","36.2"],
  ["King Games", "1700329", "123322879", "74342198", 
  "king@gmail.com","345 Palapye", "PG", "Science", "Computer Science", "Offcampus", "36.8"],
  ["Lizzy Prince", "2202009", "492726361", "72342198", 
  "joe@gmail.com","772 Palapye", "UG", "Science", "Biology", "Oncampus","36.4"],
  ["Joe Kabo", "1327829", "29011897", "7236498", 
  "joe@gmail.com","772 Palapye", "UG", "Engineering", "Chemical Engineering", "Oncampus","36.6"],
  ["John Doe", "1273982", "983111111", "75728132", 
  "joe@gmail.com","772 Palapye", "PG", "Engineering", "Civil Engineering", "Oncampus","36.5"],
  ["Pearl King", "1587292", "812619872", "72039921", 
  "joe@gmail.com","772 Palapye", "UG", "Science", "Physics", "Oncampus","36.2"],
]

const options = {
  filterType: 'checkbox',
};



function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#D6FFF7',
  },  
  paper: {
    height: 240,
    width: 500,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [spacing] = React.useState(2);

  const mystyle = {
    color: "#000000",
    backgroundColor: "#e9faf2",
    padding: "10px",
    fontFamily: "Arial"
  };

  //chart pie dataset
  const [chartData, setChartData]=useState({})

  const chart=()=>{
    setChartData({
      labels:['Monday','Tuesday','Wednesday','Thursday','Friday'],
      datasets:[{
        label:'Number of people Entering the staion',
        data: [55,70,20,50,34],
        backgroundColor:[
          'rgba(75,192,192,0.6)',
          'rgba(50,32,87,0.6)',
          'rgba(75,92,142,0.6)',
          'rgba(75,3,0,0.6)',
          'rgba(64,200,55,0.6)',
        ],
        borderWidth:4
      }]
    })
  }


  useEffect(() => {
    chart()
  }, [])


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs" centered={true} indicatorColor="secondary" variant='fullWidth'>
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Essential Services" {...a11yProps(1)} />
          <Tab label="Transport Of Goods" {...a11yProps(2)} />
          <Tab label="Special Permits" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={9}>
            <Paper className={classes.control}>
              <Grid container>
                <Grid item>
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>

                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}

                    ><MoreVertIcon />
                    </IconButton>
                    Select Station
                  </Button> 

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Caffetiria</MenuItem>
                    <MenuItem onClick={handleClose}>MPH</MenuItem>
                    <MenuItem onClick={handleClose}>Admin Block</MenuItem>
                    <MenuItem onClick={handleClose}>Liabrary</MenuItem>
                    <MenuItem onClick={handleClose}>Old Science Block</MenuItem>
                    <MenuItem onClick={handleClose}>Engineering Block</MenuItem>

                  </Menu>                    

                </Grid>

                <Grid item></Grid>
                <Grid item></Grid>

                <Grid item>
                  <TextField
                    id="datetime-local"
                    label="From"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />                

                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper} elevation={5} style={{height: "350px",width:"450px"}}>
              <h4 style={mystyle}>Total Number of People in the Station This Week</h4>
              <Grid container>
                <Grid item style={{height: "350px",width:"450px", padding:"20px"}}>
                  <Pie data={chartData} type= 'doughnut' 
                  options={{
                    responsive: true,
                    animateRotate: true,   
                  }
                  }/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>  
          <Grid item>
            <Paper className={classes.paper} elevation={3} style={{height: "350px",width:"450px",}}>
              <h4 style={mystyle}>Recorded Tempreatures</h4>
              <Grid container>
                <Grid item style={{height: "450px",width:"450px",paddingTop: "50px", paddingLeft:"20px"}}>
                  <Chart/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>  
          <Grid item>
            <Paper className={classes.paper} elevation={3} style={{height: "350px",width:"450px",}}>
              <h4 style={mystyle}>Total Number of People in the Building</h4>
              <Grid container>
              <Grid item style={{height: "450px",width:"450px",paddingTop: "50px", paddingLeft:"20px"}}>
                  <Line data={chartData} options={{
                    responsive: true,
                    scales: {
                      yAxes:[
                        {
                          ticks:{
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true
                          },
                          gridLines:{
                            display: false
                          }
                        }
                      ],
                      xAxes:[
                        {
                          gridLines:{
                            display: false
                          }
                        }
                      ]

                    }

                  }
                  }/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
          <Paper className={classes.paper} elevation={3} style={{height: "350px",width:"450px",}}>
              <h4 style={mystyle}>Total Number of People in the Building</h4>
              <Grid container>
              <Grid item style={{height: "450px",width:"450px",paddingTop: "50px", paddingLeft:"20px"}}>
                  <Line data={chartData} options={{
                    responsive: true,
                    scales: {
                      yAxes:[
                        {
                          ticks:{
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true
                          },
                          gridLines:{
                            display: false
                          }
                        }
                      ],
                      xAxes:[
                        {
                          gridLines:{
                            display: false
                          }
                        }
                      ]

                    }

                  }
                  }/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.control} paddingLeft="100px">
              <Grid container>
                <Grid item>
                  <MUIDataTable 
                    title={"Students at this Station"} 
                    data={data} 
                    columns={columns} 
                    options={options} 
                  />           

                </Grid>
              </Grid>
            </Paper>
          </Grid>  
          <Grid item xs={12}>
            <Paper className={classes.control} paddingLeft="100px">
              <Grid container>
                <Grid item>
                  <MUIDataTable 
                    title={"Staff at this Station"} 
                    data={data} 
                    columns={columns} 
                    options={options} 
                  />           

                </Grid>
              </Grid>
            </Paper>
          </Grid>  
          <Grid item xs={12}>
            <Paper className={classes.control} paddingLeft="100px">
              <Grid container>
                <Grid item>
                  <MUIDataTable 
                    title={"Visitors at this Station"} 
                    data={data} 
                    columns={columns} 
                    options={options} 
                  />           

                </Grid>
              </Grid>
            </Paper>
          </Grid>  

        </Grid>
      </Grid>

    </Grid>
    </div>
  );
}