import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  ListItem,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyle = makeStyles((theme) => {
  return {
    fab: {
      position: "fixed",
      zIndex: 100,
      bottom: theme.spacing(4),
      right: theme.spacing(2),
      margin: theme.spacing(2),
    },
    list: {
      // width: "50%",
    },
    root: {
      // width: "50%",
      margin: "0.5rem",
    },
  };
});
function AllPost({ posts, deletePost, users, curr }) {
  const history = useHistory();
  const classes = useStyle();
  const [page, setPage] = useState(1);
  const [currPosts, setCurrPosts] = useState([]);

  const handlePage = (e, page) => {
    updatePage(page);
    setPage(page);
  };

  const updatePage = (pageNo) => {
    const curr = posts.filter((post, index) => {
      const end = pageNo * 10;
      const start = end - 10;
      return index >= start && index < end;
    });

    setCurrPosts(curr);
  };
  useEffect(
    () => {
      let isMount = true;
      isMount && updatePage(page);
      return () => {
        isMount = false;
      };
    },
    // eslint-disable-next-line
    [posts]
  );
  return (
    <Box display="flex" flexDirection="column">
      <Grid container spacing={3}>
        {currPosts.map((post, index) =>
          post ? (
            <Grid item xs={12} key={post.id + index}>
              <Card>
                <CardHeader
                  avatar={<Avatar>{post.title[0].toUpperCase()}</Avatar>}
                  action={
                    <>
                      <Button
                        onClick={() => {
                          history.push(`/post/edit/${post.id}`);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Button>
                      <Button onClick={() => deletePost(post)}>
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </Button>
                    </>
                  }
                  title={users[post.userId - 1] && users[post.userId - 1].name}
                  // title={"hello"}
                  subheader={
                    users[post.userId - 1] && users[post.userId - 1].email
                  }
                />
                <ListItem
                  button
                  size="small"
                  onClick={() => {
                    history.push(`/post/${post.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" color="textPrimary">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.body}
                    </Typography>
                  </CardContent>
                </ListItem>
              </Card>
            </Grid>
          ) : (
            <span key={index}></span>
          )
        )}
      </Grid>
      <Tooltip title="Create Post" placement="left" arrow>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            history.push("/post/create");
            window.scroll(0, 0);
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Box mt={4}>
        <Pagination
          color="primary"
          count={posts ? Math.ceil(posts.length / 10) : 10}
          page={page}
          onChange={handlePage}
        />
      </Box>
    </Box>
  );
}

export default AllPost;
