import {
  Avatar,
  Box,
  Button,
  capitalize,
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
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
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
    userContent: {
      display: "flex",
      justifyContent: "space-evenly",
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

  const { username, phone, website, name, email, address, company } = user;
  return (
    <Box display="flex" flexDirection="column" ml={4}>
      <Box mb={3}>
        <Card>
          <CardHeader
            avatar={<Avatar>{name && name[0].toUpperCase()}</Avatar>}
            title={name}
            subheader={email}
          />
          <CardContent className={classes.userContent}>
            <Box>
              <Typography component="p" variant="body2" color="textPrimary">
                UserName : {username}
              </Typography>
              <Typography component="p" variant="body2" color="textPrimary">
                Phone : {phone}
              </Typography>
              <Typography component="p" variant="body2" color="textPrimary">
                Website : {website}
              </Typography>
              <Typography component="p" variant="body2" color="textPrimary">
                Company Name : {company && company.name}
              </Typography>
            </Box>
            <Box>{renderAddress(address)}</Box>
          </CardContent>
        </Card>
      </Box>
      <form onSubmit={(e) => handleComments(e)}>
        <Box ml={2} width="100%" display="flex" flexDirection="column" mb={3}>
          <TextField
            multiline
            placeholder="Leave the Comments"
            value={newComment}
            onChange={({ target: { value } }) => setNewComment(value)}
          />
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button onClick={() => setNewComment("")}>
              <ClearRoundedIcon fontSize="small" />
            </Button>
            <Button type="submit">
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </form>
      <List dense>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
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

const renderAddress = (address) => {
  const arrObj = [];
  for (let detail in address) {
    detail !== "geo" &&
      arrObj.push(
        <Typography
          key={detail}
          component="p"
          variant="body2"
          color="textPrimary"
        >
          {`${capitalize(detail)} : ${address[detail]}`}
        </Typography>
      );
  }
  return arrObj;
};

export default InfoPost;
