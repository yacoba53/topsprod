import React, {useMemo, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Formik} from 'formik';
import axios from "axios";
import ActivityForm from "../Components/ActivityForm";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function AddActivity() {
  const classes = useStyles();
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };
  const handleOnSubmit = (values, actions) => {
    console.log(values)
    axios({
      method: "POST",
      url: "/api/activity",
      data: values
    })
      .then(response => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Thanks!");
      })
      .catch(error => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
              So Tell Me...
            </Typography>
            <ActivityForm onSubmit={{handleOnSubmit}}/>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
