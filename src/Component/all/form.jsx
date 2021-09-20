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
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
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
          >
            {users.map((user, index) => {
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
