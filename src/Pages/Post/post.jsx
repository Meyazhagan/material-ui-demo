import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Box, Breadcrumbs } from "@material-ui/core";
import { AllPost, InfoPost, CreatePost, EditPost } from "../../Pages";
import { capitalize } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  fetchPosts,
  addPost as addPostToServer,
  editPost as editPostToServer,
} from "../../Helper";
import { AlertSnack } from "../../Component";

function PostPage(props) {
  const [posts, setPosts] = useState([]);
  const [prevPost, setPrevPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialize = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };
  useEffect(() => {
    initialize();
  }, []);

  const {
    match: { url },
    location: { pathname },
  } = props;

  let curr = pathname.split("/")[2];

  const addPost = async (post) => {
    setOpen(true);
    setMessage("Adding the Post");
    setPrevPosts([...posts]);
    const resData = await addPostToServer(post);
    setPosts([resData, ...posts]);
  };

  const editPost = (post) => {
    // setPosts([ ...posts]);
    setOpen(true);
    setMessage("Editing the Post");
    setPrevPosts([...posts]);
    editPostToServer(post);
    const index = posts.findIndex((pos) => pos.id === post.id);
    if (index === -1) return;
    posts[index] = post;
    setPosts([...posts]);
  };

  const deletePost = (post) => {
    // setPosts([ ...posts]);
    setOpen(true);
    setMessage("Deleting the Post");
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
    <Box m={3}>
      <Breadcrumbs>
        <Link to={url}>Post</Link>
        <Link to={pathname}>{curr ? capitalize(curr) : ""}</Link>
      </Breadcrumbs>
      <Box display="flex">
        <AllPost posts={posts} deletePost={deletePost} />
        <Switch>
          <Route
            path={`${url}/create`}
            render={() => <CreatePost addPost={addPost} />}
          />
          <Route
            path={`${url}/edit/:id`}
            render={() => <EditPost editPost={editPost} />}
          />
          <Route path={`${url}/:id`} exact component={InfoPost} />
          <Route path={"*"} render={() => <></>} />
        </Switch>
      </Box>
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
