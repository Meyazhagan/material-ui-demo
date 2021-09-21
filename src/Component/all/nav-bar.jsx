import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";

const usestyle = makeStyles((theme) => {
  return {
    nav: {
      // position: "fixed",
      // bottom: "0",
      width: "100vw",
    },
    bottom: {
      // height: 50,
      background: "white",
      opacity: "1",
    },
    bar: {},
    prog: {
      background: theme.palette.grey[50],
    },
  };
});
function NavBar() {
  const location = useLocation();
  const history = useHistory();
  const [display, setDisplay] = useState(true);
  const classes = usestyle(display);
  const [active, setActive] = useState("home");
  useEffect(
    () => {
      setActive(location.pathname.split("/")[1].toLowerCase() || "home");
      setTimeout(() => setDisplay(false), 2000);
    },
    //eslint-disable-next-line
    []
  );
  useEffect(() => {
    setDisplay(true);
    setTimeout(() => setDisplay(false), 2000);
  }, [active]);

  const handleClick = (action) => {
    setActive(action);
    history.push(`/${action === "home" ? "" : action}`);
  };
  const handleActive = (action) => {
    if (active === action) {
      return "secondary";
    }
    return "primary";
  };
  return (
    <>
      {display ? (
        <LinearProgress
          className={classes.prog}
          variant="indeterminate"
          classes={{ bar: classes.bar }}
        />
      ) : (
        <></>
      )}
      <Paper className={classes.nav} elevation={0}>
        <Box display="flex" justifyContent="flex-start" mt={2} ml={5}>
          <Button
            onClick={() => handleClick("home")}
            color={handleActive("home")}
            // startIcon={<HomeRoundedIcon fontSize="small" />}
          >
            Home
          </Button>
          <Button
            onClick={() => handleClick("post")}
            color={handleActive("post")}
            // startIcon={<LibraryBooksIcon fontSize="small" />}
          >
            Post
          </Button>
          <Button
            onClick={() => handleClick("about")}
            color={handleActive("about")}
            // startIcon={<InfoRoundedIcon fontSize="large" />}
          >
            About
          </Button>
        </Box>
        {/* <BottomNavigation
          className={classes.bottom}
          value={active}
          onChange={(e, value) => {
            setActive(value);
            history.push(`/${value === "home" ? "" : value}`);
          }}
        >
          <BottomNavigationAction
            icon={<HomeRoundedIcon />}
            value="home"
            label="Home"
          />
          <BottomNavigationAction
            icon={<LibraryBooksIcon />}
            value="post"
            label="Post"
          />
          <BottomNavigationAction
            icon={<InfoRoundedIcon />}
            value="about"
            label="About"
          />
        </BottomNavigation> */}
      </Paper>
    </>
  );
}

export default NavBar;
