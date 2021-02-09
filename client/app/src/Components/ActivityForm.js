import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
// Picker
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from "axios";
import Slider from "@material-ui/core/Slider";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.firstName = 'Required';
  }
  else {
    console.log(axios({
      method: "GET",
      url: `/api/activity/${values.name}`,
    })
      .catch(error => {
        console.log('there was an error marking it inactive')
      }));
  }
  return errors;
};
const reset = () => {

}

export default function ActivityForm(props) {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={props.onSubmit}
        // initialValues={}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="Name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="At Home Activity?"
                    control={
                      <Field
                        name="at_home"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Hungry?"
                    control={
                      <Field
                        name="hungry"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field name="hunger">
                    {props => (
                      <div>
                        <Slider
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={0}
                          max={100}
                          value={props.input.value}
                          name={props.input.name}
                          onChange={props.input.onChange}
                        />
                      </div>
                    )}
                  </Field>

                </Grid>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Acceptable Weather</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        label="Sunny"
                        control={
                          <Field
                            name="weather"
                            component={Checkbox}
                            type="checkbox"
                            value="Sunny"
                          />
                        }
                      />
                      <FormControlLabel
                        label="High Wind"
                        control={
                          <Field
                            name="weather"
                            component={Checkbox}
                            type="checkbox"
                            value="high_wind"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Rain"
                        control={
                          <Field
                            name="weather"
                            component={Checkbox}
                            type="checkbox"
                            value="rain"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Snow"
                        control={
                          <Field
                            name="weather"
                            component={Checkbox}
                            type="checkbox"
                            value="snow"
                          />
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="notes"
                    component={TextField}
                    multiline
                    label="Notes"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="Weather"
                    component={Select}
                    label="Select Weather"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="Sunny">Sunny</MenuItem>
                    <MenuItem value="Paris">Paris</MenuItem>
                    <MenuItem value="Budapest">
                      A city with a very long Name
                    </MenuItem>
                  </Field>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}
