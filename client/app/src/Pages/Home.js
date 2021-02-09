import React, {useMemo, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CasinoIcon from '@material-ui/icons/Casino';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from "axios";
import ActivityTable from "../Components/ActivityTable";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Top[s]Productions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));


export default function Home() {
  const classes = useStyles();
  const [activities, setActivities] = useState(null)
  const [newActivity, setNewActivity] = useState(null)
  const [location, setLocation] = useState(null)
  const [activitiesFound, setActivitiesFound] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleOnSubmit = () => {
    console.log(newActivity)
    axios({
      method: "POST",
      url: "/api/activity",
      data: newActivity
    })
      .catch(error => {
        console.log('there was an error marking it inactive')
      });
    window.location.reload();
  };

  const fetchActivities = useMemo(() => {
    var activitiesList = axios({
      method: "GET",
      url: "/api/activities"
    }).then((results) => {
      console.log("res:", results.data.length)
      if (results.data.length > 0) {
        setActivities(results.data)
        setActivitiesFound(true)
      } else {
        setActivitiesFound(false)
      }
    }).catch(error => {
      alert("there was an error accessing the API");
    });
  }, []);

  const getLocation = useMemo(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation(position);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            {!clicked &&
            <div>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                So You've Come To...
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" style={{marginBottom: 5}} paragraph>
                find something to do! - shuffle me
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" style={{marginBottom: 5}} paragraph>
                It's on the tip of my tongue... - form shuffle
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" style={{marginBottom: 5}} paragraph>
                Browse my options. - filterable search
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" style={{marginBottom: 5}} paragraph>
                Find something new! - search
              </Typography>
            </div>
            }
            <div className={classes.heroButtons} style={{marginTop: 0, marginBottom: 10}}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {activitiesFound && !clicked &&
                  <div>
                    <ActivityTable title={"Activities"} data={activities}/>
                  </div>
                  }
                  {!activitiesFound && !clicked &&
                  <Typography variant="h5" align="center" style={{marginBottom: 5}} paragraph>
                    No Activities Found, Consider Adding Yours!
                  </Typography>
                  }
                </Grid>
              </Grid>
            </div>
            <div className={classes.heroButtons} style={{marginTop: 0, marginBottom: 10}}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {clicked &&
                  <Button variant="contained" color="primary" onClick={handleOnSubmit}>
                    inactive
                  </Button>
                  }
                </Grid>
              </Grid>
            </div>
            {clicked &&
            <Typography variant="h5" align="center" style={{marginBottom: 5}} paragraph>
              we rely on user input to continue running, if this link
              is no longer active please click here to report and reload.<br></br>
              If you just want a new link please just refresh the page.
            </Typography>
            }
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              To add new activities,<br></br> please click the + in the nav bar above.
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
