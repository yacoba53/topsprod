import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CasinoIcon from '@material-ui/icons/Casino';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  logoName: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
   display: 'none',
   [theme.breakpoints.up('md')]: {
     display: 'flex',
   },
 },
 sectionMobile: {
   display: 'flex',
   [theme.breakpoints.up('md')]: {
     display: 'none',
   },
 },
}));

export default function Header() {
  const classes = useStyles();
return(
  <React.Fragment>
    <CssBaseline />
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
      <Link to={'/'} style = {{textDecoration: 'none', color: 'white'}} >
         <IconButton aria-label="add a new url" color="inherit" >
             <CasinoIcon />
         </IconButton>
      </Link>
        <Link to={'/'} className = {classes.title} style = {{textDecoration: 'none', color: 'white', justify: 'right'}} >
          <Typography variant="h5" color="inherit">
            SYCT
          </Typography>
        </Link>
        <div className={classes.sectionDesktop}>
        <Link to={'/add'} style = {{textDecoration: 'none', color: 'white'}} >
           <IconButton aria-label="add a new url" color="inherit" >
               <AddCircle />
           </IconButton>
        </Link>
        </div>
        <div className={classes.sectionMobile}>
        <Link to={'/add'} style = {{textDecoration: 'none', color: 'white'}} >
           <IconButton aria-label="add a new url" color="inherit" >
               <AddCircle />
           </IconButton>
        </Link>
        </div>
      </Toolbar>
    </AppBar>
    </div>
  </React.Fragment>
)
};
