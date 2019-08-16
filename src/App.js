import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar'
import Body from './components/container'
function App() {
  const [value,setValues] = React.useState({
    name:"",
    result:[],
    meta:{}
});



  return (
    <React.Fragment> 

      <AppBar />
      <Body />
       
    </React.Fragment>
  );
}

export default App;
