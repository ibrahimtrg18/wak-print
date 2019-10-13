import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';

import { connect } from 'react-redux';

import * as authAction from './redux/actions/authAction'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Wak Print
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [auth, setAuth] = useState({})

  const fetchLogin = async () => {
    const res = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_user: values.email,
        password_user: values.password
      })
    })
    const data = await res.json();
    if (data.status == "success")
      await props.authLogin(data.data);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchLogin();
  }

  const HandleClick = () => {

  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[900],
      },
    },
  });

  useEffect(() => {
    if (props.auth) {
      props.history.push('/')
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(event) => handleSubmit(event)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => handleChange(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => handleChange(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Grid container>
            <Grid item xs>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginBottom: 4 }}
              >
                User
              </Button>
            </Grid>
            <Box m={1}></Box>
            <Grid item xs>
              <ThemeProvider theme={theme}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => HandleClick()}
                >
                  Wak Print
              </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
          <Box mt={1}></Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    authLogin: (data) => { dispatch(authAction.authLogin(data)) }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SignIn);