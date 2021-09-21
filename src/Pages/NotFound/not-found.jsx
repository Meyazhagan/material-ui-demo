import { Box } from "@material-ui/core";
import { ReactComponent as ServerDown } from "../../Assets/Undraw/pageNotFound.svg";
const server = {
  maxWidth: "60%",
};
function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <ServerDown style={server} />
    </Box>
  );
}

export default NotFound;
