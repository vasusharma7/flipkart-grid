import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Lock as LockOutlinedIcon } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as action from "../redux/loginRedux/loginAction";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";
import { Redirect } from "react-router-dom";
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
import back from "../assets/back.jpg";
const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  image: {
    //backgroundImage: "url(https://source.unsplash.com/featured/?trending)",
    backgroundImage: `url(${back})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <Grid container component="main" className={classes.root}>
      {props.notifications && (
        <Notifications notifications={props.notifications} />
      )}
      {props.registered && (
        <Notifications notifications={props.notifications} />
      )}
      {props.loggedIn && <Redirect to="/home" />}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={3} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={data.email}
              onChange={e => {
                e.persist();
                setData(prev => ({ ...prev, email: e.target.value }));
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={data.password}
              onChange={e => {
                e.persist();
                setData(prev => ({ ...prev, password: e.target.value }));
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                e.preventDefault();
                props.login(data);
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body1">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>{/* <Copyright /> */}</Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    registered: state.registerReducer.registered,
    loggedIn: state.loginReducer.loggedIn,
    error: state.loginReducer.error,
    notifications: state.notifications,
    loading: state.loginReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(action.login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
