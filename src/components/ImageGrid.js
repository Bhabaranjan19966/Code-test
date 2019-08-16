import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexDirection: "col",
    justifyContent: 'space-between'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
      {props.userList.map( (userData , index) => {          
        return (
            <Grid item xs={9} sm={6} md ={4} lg={4} key={index}>
                <Card key= {index} userData={userData}/>         
            </Grid>
          )
      })}
        
        
      </Grid>
    </div>
  );
}
