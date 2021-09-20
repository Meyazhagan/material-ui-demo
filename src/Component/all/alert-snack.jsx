import {
  Box,
  Button,
  // IconButton,
  LinearProgress,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// import { useEffect, useState } from "react";
// import CloseIcon from "@material-ui/icons/Close";
// import CheckIcon from "@material-ui/icons/Check";
// import { Palette } from "@material-ui/icons";

const useStyle = makeStyles((theme) => {
  return {
    prog: {
      width: "100%",
      backgroundColor: "transparent",
    },
    alert: {
      borderRadius: 0,
      color: "black",
      backgroundColor: "transparent",
    },
    meyazhagan: {
      background: "#f1f1f1",
      borderRadius: 5,
      width: "fit-content",
      overflow: "hidden",
    },
    bar: {
      background: "#f26c4a",
    },
  };
});
function AlertSnack({ message, handleUndo, open, onClose }) {
  const classes = useStyle();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Box
          display="flex"
          flexDirection="column"
          boxShadow={3}
          className={classes.meyazhagan}
        >
          <Alert
            icon={<></>}
            size="small"
            severity="info"
            className={classes.alert}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => handleUndo(onClose)}
              >
                Undo
              </Button>
            }
          >
            {message}
          </Alert>
          <LinearProgress
            color="secondary"
            className={classes.prog}
            classes={{ bar: classes.bar }}
          />
        </Box>
      </Snackbar>
      <div></div>
    </>
  );
}

export default AlertSnack;
