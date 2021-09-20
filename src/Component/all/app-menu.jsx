import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

function AppMenu() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          //   className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Post App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppMenu;
