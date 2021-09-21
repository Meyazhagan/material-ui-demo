import { Route, Switch } from "react-router";
import { Box, Breadcrumbs, Button, Grid } from "@material-ui/core";
import { AllPost, InfoPost, CreatePost, EditPost } from "../../Pages";
import { capitalize } from "@material-ui/core";
import { useEffect, useState } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  fetchPosts,
  addPost as addPostToServer,
  fetchUsers,
} from "../../Helper";
import { AlertSnack } from "../../Component";
import { ReactComponent as Meditate } from "../../Assets/Undraw/post.svg";

function PostPage(props) {
  const [posts, setPosts] = useState([]);
  const [prevPost, setPrevPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [users, setUsers] = useState([]);

  const initialize = async () => {
    const data = await fetchPosts();
    const userData = await fetchUsers();
    setPosts(data);
    setUsers(userData);
  };
  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify([...posts]));
  }, [posts]);

  const {
    history,
    match: { url },
    location: { pathname },
  } = props;

  let curr = pathname.split("/")[2];

  const addPost = async (post) => {
    setOpen(true);
    setMessage({ title: "Adding the Post", desc: post.title });
    setPrevPosts([...posts]);
    const resData = await addPostToServer(post);
    setPosts([resData, ...posts]);
  };

  const editPost = (post) => {
    // setPosts([ ...posts]);
    setOpen(true);
    setMessage({ title: "Editing the Post", desc: post.title });
    setPrevPosts([...posts]);
    // editPostToServer(post);
    const index = posts.findIndex((pos) => pos.id === post.id);
    if (index === -1) return;
    posts[index] = post;
    setPosts([...posts]);
  };

  const deletePost = (post) => {
    // setPosts([ ...posts]);
    setOpen(true);
    setMessage({ title: "Deleting the Post", desc: post.title });
    setPrevPosts([...posts]);
    const index = posts.findIndex((pos) => pos.id === post.id);
    if (index === -1) return;
    posts.splice(index, 1);
    setPosts([...posts]);
  };
  const handleUndo = (close) => {
    close();
    setPosts([...prevPost]);
    setOpen(false);
  };
  return (
    <Box m={4}>
      <Box mb={2}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Button size="small" onClick={() => history.push(url)}>
            Post
          </Button>
          {curr ? (
            <Button size="small" onClick={() => history.push(pathname)}>
              {capitalize(curr)}
            </Button>
          ) : (
            ""
          )}
        </Breadcrumbs>
      </Box>

      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid container item xs={12} md={6}>
          <Switch>
            <Route
              path={`${url}/edit/:id`}
              render={() => <EditPost editPost={editPost} />}
            />

            <Route
              path={`${url}/create`}
              render={() => <CreatePost addPost={addPost} />}
            />
            <Route
              path={`${url}/:id`}
              exact
              render={() => <InfoPost posts={posts} users={users} />}
            />
            <Route
              path={`${url}/`}
              exact
              render={() => (
                <Meditate style={{ width: "80%", margin: "0 auto" }} />
              )}
            />
          </Switch>
        </Grid>
        <Grid item xs={12} md={6}>
          <Route
            path={`${url}`}
            render={() => (
              <AllPost
                posts={posts}
                deletePost={deletePost}
                editPost={editPost}
                users={users}
                curr={typeof curr === "number" ? curr : -1}
              />
            )}
          />
        </Grid>
      </Grid>

      <AlertSnack
        open={open}
        onClose={(event, res) => {
          if (res === "clickaway") return;
          setOpen(false);
        }}
        message={message}
        handleUndo={handleUndo}
      />
    </Box>
  );
}

export default PostPage;
