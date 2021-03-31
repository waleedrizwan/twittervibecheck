import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const CustomFooter = (props) => {
  const classes = useStyles();
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">MIT License</Typography>
          
          {/*  <a href="https://github.com/waleedrizwan/tweet_scope"> Github⭐</a> */}
          <a href="https://www.twittervibecheck.com">TwitterVibeCheck.com </a>
         {new Date().getFullYear()}
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};
export default CustomFooter;
