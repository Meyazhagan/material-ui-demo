import {
  BottomNavigation,
  BottomNavigationAction,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const [display, setDisplay] = useState(true);
  const classes = usestyle(display);
  const [active, setActive] = useState("home");
  useEffect(
    () => {
      history.push(`/${active === "home" ? "" : active}`);
      setTimeout(() => setDisplay(false), 2000);
    },
    //eslint-disable-next-line
    []
  );
  useEffect(() => {
    setDisplay(true);
    setTimeout(() => setDisplay(false), 2000);
  }, [active]);
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
      <Paper className={classes.nav}>
        <BottomNavigation
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
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default NavBar;
