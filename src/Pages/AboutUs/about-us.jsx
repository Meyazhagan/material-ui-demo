import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Button,
} from "@material-ui/core";
import { ReactComponent as AddPost } from "../../Assets/Undraw/developer.svg";

const about = {
  Name: "Meyazhagan C N",
  Education: "B.Sc Electronics",
  Technology: "React, HTML, CSS, JS, Java",
};
const link = {
  github: "https://github.com/Meyazhagan/material-ui-demo",
};
function AboutPage() {
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
          <CardHeader title="About Me"></CardHeader>
          <CardContent>{displayInfo()}</CardContent>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => (window.location.href = link.github)}
            startIcon={
              <Avatar
                alt={"Material Ui"}
                style={{ width: "1rem", height: "1rem" }}
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              ></Avatar>
            }
          >
            Source Code
          </Button>
        </Card>
      </Box>
    </>
  );
}

const displayInfo = () => {
  const infoArr = [];
  for (let info in about) {
    infoArr.push(
      <>
        <Typography variant="h5" align="center" component="span">
          {`${info} : `}
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          align="center"
          component="span"
        >
          {about[info]}
        </Typography>
        <br />
      </>
    );
  }
  return infoArr;
};
export default AboutPage;
