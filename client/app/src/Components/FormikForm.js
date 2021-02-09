import {Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import React from "react";


export default function FormikForm(props) {
  return (
    <div className={classes.heroButtons}>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Formik
            initialValues={{url: ''}}
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
  )
};
