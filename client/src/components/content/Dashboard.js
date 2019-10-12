import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Sider from '../layout/Sider';
import Navbar from '../layout/Navbar';
import { Paper, Box, Divider } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  rootPesanan: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  tablePesanan: {
    minWidth: 450,
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

  return (
    <div className={classes.root}>
      <Navbar handleDrawerToggle={() => handleDrawerToggle()}></Navbar>
      <Sider mobileOpen={mobileOpen} handleDrawerToggle={() => handleDrawerToggle()}></Sider>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper>
              <Typography variant="h6">
                E-Wallet
              </Typography>
              <Typography variant="h6">
                E-Wallet
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper>
              <Typography variant="h6">
                E-Wallet
              </Typography>
              <Typography variant="h6">
                E-Wallet
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper>
              <Typography variant="h6">
                E-Wallet
              </Typography>
              <Typography variant="h6">
                E-Wallet
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper>
              <Typography variant="h6">
                E-Wallet
              </Typography>
              <Typography variant="h6">
                E-Wallet
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider />
            <Typography variant="h6" component="h6">
              Pesanan
              </Typography>
            <Paper className={classes.rootPesanan}>
              <Table className={classes.tablePesanan}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Jumlah Halaman</TableCell>
                    <TableCell align="right">Jumlah Rangkap</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
