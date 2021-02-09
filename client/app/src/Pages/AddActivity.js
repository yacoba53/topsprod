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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Formik } from 'formik';
import axios from "axios";



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

export default function AddActivity () {
  const classes = useStyles();
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
          setServerState({ok, msg});
        };
  const handleOnSubmit = (values, actions) => {
    console.log(values)
         axios({
           method: "POST",
           url: "/api/record",
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
              Enter your zoom url
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <Formik
      initialValues={{ url: ''}}
      validate={values => {
        const errors = {};
        if (!values.url) {
          errors.url = 'Required';
        } else if (
          !/^(ftp|http|https)(:\/\/)(.*)(\.zoom\.)(.*)(\/j\/)([^ "]+)$/i.test(values.url)
        ) {
          errors.url = 'Invalid url';
        }
        return errors;
      }}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url}
          />
          {errors.url && touched.url && errors.url}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
                </Grid>
              </Grid>
            </div>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             Enter your zoom url here to allow anyone from this site to access it.
             It will only be entered into circulation for 1 hour.
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
