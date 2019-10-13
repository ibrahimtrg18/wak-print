import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import Sider from '../layout/Sider';
import Navbar from '../layout/Navbar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      display: "flex"
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2)
  },
  rootPesanan: {
    width: '100%',
  },
  paperPesanan: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  tablePesanan: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Dashboard(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(createData('Frozen yoghurt', 159, 6.0, 24, 4.0))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!props.auth) {
      props.history.push('/login')
    }
  })

  return (
    <div className={classes.root}>
      <Navbar handleDrawerToggle={() => handleDrawerToggle()}></Navbar>
      <Sider mobileOpen={mobileOpen} handleDrawerToggle={() => handleDrawerToggle()}></Sider>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} wrap="wrap">
          <Grid item xs={12} sm={12} md={8}>
            <Paper className={classes.paper}>
              <Typography component="h4" variant="p">
                Today
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes.paper}>
              <Typography component="h4" variant="p">
                Saldo
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.rootPesanan}>
              <Paper className={classes.paperPesanan}>
                <Table className={classes.tablePesanan} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  })
}

export default connect(mapStateToProps)(Dashboard);
