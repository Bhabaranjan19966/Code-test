import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600, 
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  let value;
  
  const inputChanged =(e) =>{
      console.log('input changed',e, e.which)
      value = e.target.value;
  }

  const makeCall =()=>{
      props.fetchUser(value,1);
  }
  
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Your Name"
        onChange = {(e) => inputChanged(e)}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider className={classes.divider} />
      <IconButton className={classes.iconButton} onClick={makeCall} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
