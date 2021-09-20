import { Button, TextField, makeStyles, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50vw",
    "& > *": {
      marginBottom: "2rem",
    },
  },
});

function CreatePost({ addPost }) {
  const history = useHistory();
  const classes = useStyle();
  const formik = useFormik({
    initialValues: {
      userId: "2",
      title: "test",
      body: "test Content",
    },
    onSubmit: (values) => {
      console.log(values);
      addPost(values);

      history.push("/post");
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <Typography variant="h4" align="center">
          Create Post
        </Typography>
        <TextField
          id="userId"
          label="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
        />
        <TextField
          id="title"
          label="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <TextField
          id="body"
          label="content"
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default CreatePost;
