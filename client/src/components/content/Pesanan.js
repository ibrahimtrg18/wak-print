import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Sider from '../layout/Sider';
import Navbar from '../layout/Navbar';

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
  // card: {
  //   maxWidth: 400
  // },
  cardAction: {
    float: "right",
  },
}));

const pesanan = [
  {
    user: "ibrahim",
    page: "200",
    rangkap: "2",
    date: "10:00, 12 Jun 2019"
  },
  {
    user: "ibrahim",
    page: "200",
    rangkap: "2",
    date: "10:00, 12 Jun 2019"
  },
  {
    user: "ibrahim",
    page: "200",
    rangkap: "2",
    date: "10:00, 12 Jun 2019"
  },
]

function Dashboard(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Navbar handleDrawerToggle={() => handleDrawerToggle()}></Navbar>
      <Sider mobileOpen={mobileOpen} handleDrawerToggle={() => handleDrawerToggle()}></Sider>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={1}>
          {pesanan.map((value, index) => {
            return (
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {value.user}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardAction}>
                    <Button size="small" color="primary">
                      Detail
                    </Button>
                    <Button size="small" color="secondary">
                      Hapus
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>

      </main>
    </div>
  );
}

export default Dashboard;
