import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import { ReactComponent as AddPost } from "../../Assets/Undraw/quickchart.svg";

const useStyle = makeStyles((theme) => {
  return {
    button: {
      margin: theme.spacing(3),
    },
  };
});
const buttons = [
  {
    label: "React",
    avatar:
      "https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png",
    link: "https://reactjs.org/",
  },
  {
    label: "React Routers",
    link: "https://reactrouter.com/",
    avatar:
      "https://seeklogo.com/images/R/react-router-logo-AB5BFB638F-seeklogo.com.png",
  },
  {
    label: "Material UI",
    link: "https://v4.mui.com/",
    avatar: "https://material-ui.com/static/logo.png",
  },
  {
    label: "Material Icon",
    link: "https://v4.mui.com/components/material-icons/",
    avatar: "https://material-ui.com/static/logo.png",
  },
];
function HomePage() {
  const classes = useStyle();
  return (
    <>
      <Box
        display="flex"
        flexDirection="row-reverse"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <AddPost style={{ width: "30em", height: "30em" }} />
        <Card elevation={0}>
          <CardContent>
            <Typography variant="h3" align="center">
              POST APP
            </Typography>
            <Typography variant="body1" align="center">
              This app is made using
            </Typography>
            <Typography variant="h3" align="center">
              <Grid container justifyContent="center">
                {buttons.map((button) => (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => (window.location.href = button.link)}
                      className={classes.button}
                      startIcon={
                        <Avatar
                          alt={button.label}
                          style={{ width: "1rem", height: "1rem" }}
                          src={button.avatar}
                        ></Avatar>
                      }
                    >
                      {button.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default HomePage;
