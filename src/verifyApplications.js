import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const EssentialServicesPromise=import('../components/essentialServices');
const EssentialServices=React.lazy(()=>(EssentialServicesPromise));

const TransportPromise=import('../components/transport');
const Transport=React.lazy(()=>(TransportPromise));

const SpecialPromise=import('../components/special');
const Special=React.lazy(()=>(SpecialPromise));

const UsefulDataPromise=import('../components/usefulData');
const UsefulData=React.lazy(()=>(UsefulDataPromise));



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
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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