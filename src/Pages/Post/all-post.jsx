import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyle = makeStyles((theme) => {
  return {
    fab: {
      position: "fixed",
      zIndex: 100,
      bottom: theme.spacing(4),
      right: theme.spacing(2),
      margin: theme.spacing(2),
    },
  };
});
function AllPost({ posts, deletePost }) {
  const history = useHistory();
  const classes = useStyle();
  const [page, setPage] = useState(1);
  const [currPosts, setCurrPosts] = useState([]);
  const handlePage = (e, page) => {
    updatePage(page);
    setPage(page);
  };

  const updatePage = (pageNo) => {
    const curr = [];
    for (let i = 1; i <= 10; i++) {
      curr.push(posts[i + (pageNo - 1) * 10 - 1] || null);
    }
    setCurrPosts(curr);
  };
  useEffect(
    () => {
      updatePage(page);
    },
    // eslint-disable-next-line
    [posts]
  );
  return (
    <Box display="flex" flexDirection="column">
      <List>
        {currPosts.map((post, index) =>
          post ? (
            <Fragment key={post.id}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture">
                    {post.userId}
                    {post.title[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={post.title} secondary={post.body} />
              </ListItem>
              <Button onClick={() => history.push(`/post/edit/${post.id}`)}>
                Edit
              </Button>
              <Button onClick={() => deletePost(post)}>delete</Button>
            </Fragment>
          ) : (
            <span key={index}></span>
          )
        )}
      </List>
      <Tooltip title="Create Post" placement="left" arrow>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => history.push("/post/create")}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Pagination
        color="primary"
        count={posts ? Math.ceil(posts.length / 10) : 10}
        page={page}
        onChange={handlePage}
      />
    </Box>
  );
}

export default AllPost;
