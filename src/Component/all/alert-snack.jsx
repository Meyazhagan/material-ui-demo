import {
  Box,
  Button,
  // IconButton,
  LinearProgress,
  makeStyles,
  Slide,
  Snackbar,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
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
      background: "#ffffff",
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
        TransitionComponent={Transition}
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
            <AlertTitle>{message.title}</AlertTitle>
            Details : {message.desc}
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

function Transition(props) {
  return <Slide {...props} direction="up" />;
}

export default AlertSnack;
