import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { fetchPost, fetchUsers } from "../../Helper";
import {
  Button,
  makeStyles,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";

const useStyle = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50vw",
    "&> *": {
      marginBottom: "2rem",
    },
    select: {
      width: "10rem",
    },
  },
});
function EditPost({ editPost }) {
  const classes = useStyle();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
  const initialize = async () => {
    const data = await fetchPost(id);
    const userData = await fetchUsers();
    setPost(data);
    setUsers(userData);
  };
  const history = useHistory();
  useEffect(
    () => initialize(),
    // eslint-disable-next-line
    [editPost]
  );

  // const handleChange = ({ target }) => {
  //   setPost({ ...post, [target.id]: target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   editPost(post);
  //   history.push("/post");
  // };

  window.onloadeddata = () => {
    console.log("loaded");
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: post.id || "",
          userId: post.userId || "",
          title: post.title || "",
          body: post.body || "",
        }}
        onSubmit={(values) => {
          console.log(values);
          editPost(values);
          history.push("/post");
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <Typography variant="h4" align="center">
              Edit Post
            </Typography>
            <TextField
              id="id"
              label="id"
              onChange={props.handleChange}
              value={props.values.id}
            />
            <TextField
              id="userId"
              name="userId"
              label="User ID"
              select
              onChange={props.handleChange}
              value={props.values.userId}
            >
              {users.map((user, index) => {
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {user.id} .{user.name}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              id="title"
              label="Title"
              onChange={props.handleChange}
              value={props.values.title}
            />
            <TextField
              multiline
              minRows={4}
              id="body"
              label="Content"
              onChange={props.handleChange}
              value={props.values.body}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default EditPost;
