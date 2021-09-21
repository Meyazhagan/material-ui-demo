import {
  Box,
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import { useHistory } from "react-router";

const useStyle = makeStyles((theme) => {
  return {
    form: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "3rem",
      paddingRight: "3rem",
      "&> *": {
        marginBottom: "2rem",
      },
    },
    submit: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
    root: {
      marginBottom: "2rem",
      backgroundColor: "green",
    },
  };
});
function Form({ initialValues, atSubmit, users, heading, disableId }) {
  const history = useHistory();
  const classes = useStyle();
  const validate = (value) => {
    const errors = {};
    if (!value.userId) {
      errors.userId = "please select one";
    } else if (!value.title) {
      errors.title = "requried";
    } else if (value.title.length < 10) {
      errors.title = "title should be atleast 10 characters";
    } else if (!value.body) {
      errors.body = "requried";
    } else if (value.body.length < 20) {
      errors.body = "content should be atleast 20 characters";
    }

    return errors;
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values) => {
        atSubmit(values);
        history.push("/post");
      }}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          className={classes.form}
          classes={{ root: classes.root }}
        >
          <Typography variant="h4" align="center">
            {heading}
          </Typography>
          <TextField
            disabled={disableId}
            id="id"
            label="Id"
            onChange={props.handleChange}
            value={props.values.id}
          />
          <TextField
            name="userId"
            label="User ID"
            select
            onChange={props.handleChange}
            value={props.values.userId}
            error={props.errors.userId}
            helperText={props.errors.userId}
          >
            {users.map((user) => {
              return (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              );
            })}
          </TextField>
          <FormControl className={classes.formcontrol}>
            <TextField
              id="title"
              label="Title"
              onChange={props.handleChange}
              value={props.values.title}
              error={props.errors.title}
              helperText={props.errors.title}
            />
          </FormControl>

          <TextField
            className={classes.formcontrol}
            multiline
            minRows={4}
            id="body"
            label="Content"
            onChange={props.handleChange}
            value={props.values.body}
            error={props.errors.body}
            helperText={props.errors.body}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => history.push("/post")}
              variant="outlined"
              color="secondary"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Form;
