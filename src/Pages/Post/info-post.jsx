import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SendIcon from "@material-ui/icons/Send";
import { fetchCommands, fetchUser, addComments, fetchPost } from "../../Helper";

const useStyle = makeStyles((theme) => {
  return {
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: 16,
    },
    paper: {
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
  };
});
function InfoPost(props) {
  const classes = useStyle();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [comments, setCommand] = useState([]);
  const [newComment, setNewComment] = useState("");

  const initialize = async () => {
    if (!id) {
      return;
    }
    const post = await fetchPost(id);
    const comments = await fetchCommands(id);
    const user = await fetchUser(post.userId);
    setCommand(comments);
    setUser(user);
    console.log(user);
  };
  useEffect(
    () => initialize(),
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => initialize(),
    // eslint-disable-next-line
    [id]
  );

  const handleComments = (e) => {
    e.preventDefault();
    addComments(newComment, id);
    setNewComment("");
    initialize();
  };

  
  const { username, phone, website, name, email } = user;
  return (
    <Box display="flex" flexDirection="column" ml={4}>
      <Box mb={3}>
        <Card>
          <CardHeader
            avatar={<Avatar>{name && name[0].toUpperCase()}</Avatar>}
            title={name}
            subheader={email}
          />
          <CardContent>
            {[username, phone, website].map((item) => (
              <Typography component="p" variant="body2" color="textPrimary">
                {item}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Box>
      <form onSubmit={(e) => handleComments(e)}>
        <Box ml={2} width="100%" display="flex" mb={3}>
          <TextField
            placeholder="Leave the Comments"
            value={newComment}
            onChange={({ target: { value } }) => setNewComment(value)}
          />
          <Button type="submit">
            <SendIcon fontSize="small" />
          </Button>
        </Box>
      </form>
      <List dense>
        {comments.map((comment) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.small}>
                {comment.body && comment.body[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.email}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    //  className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.body}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    //  className={classes.inline}
                    color="textSecondary"
                  >
                    {" — Read More"}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


export default InfoPost;
