import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Finder from './SearchBar'
import Grid from './ImageGrid'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';






class FixedContainer extends React.Component {

    constructor (props) {

        super(props)
        this.goTopage = 1;
        this.state ={
            list: [],
            renderList: false

        }        
        this.fetchUsers = this.fetchUsers.bind(this);
        this.validateFetchParams = this.validateFetchParams.bind(this)
        this.setGotoValue =this.setGotoValue.bind(this)
    }

    /**
     * @description : this function will fetch user data with the given parameters
     * @param {String} Name 
     * @param {Number} page 
     */

    fetchUsers (userName, page) {
        console.log(page, "this is fetch users");
       
        if( this.validateFetchParams(userName, page)){
            fetch(`https://gorest.co.in/public-api/users?name=${userName}&page=${page}`,{
            method:'GET',
            headers: {
                'Authorization': "add your key here",//eg:  "Bearer API_KEY"
                'Content-Type': 'application/json',
                'Accept':"application/json"
            },
        })
        .then( res => res.json())
        .then( res => {
            if(res._meta.code == '200'){
                this.setState({
                list: res.result,
                renderList: true,
                name: userName,
                totalPage: res._meta.pageCount,
                crrentPage: Number(page),
                
            }, ()=>{console.log("state changed",this.state)} );
            } else{
                this.setState({
                    list:[],
                    statusCode: res._meta.message
                },alert(res._meta.message))
            }
            

        })
        .catch(err => console.log(err))
        }else{
            this.setState({
                list:[]
            })
        }
    }


    setGotoValue (event){
        if(event.target.value > this.state.totalPage){
            alert('Exceedds total avilable page');
            event.target.value = "";
        }
        if(event.target.value < 0){
            alert('should be a non-negative number');
            event.target.value = "";
        }
        this.goTopage = event.target.value
        console.log(this.goTopage)
    }


    validateFetchParams (userName){
        let nameVlaidation =false
        if(userName && userName.trim() != "" && userName.length > 0){
            nameVlaidation = true;
        }
        return nameVlaidation;
    }

    render () {

        return (
            <React.Fragment>
              <CssBaseline />

              <Container fixed style={{display: 'flex',alignItems: 'center',justifyContent:'center', marginTop: '5rem'}}>
                <Finder fetchUser = {this.fetchUsers}></Finder>    
              </Container>

              {this.state.list.length ? 
                (<div>
                 <Container fixed style={{display: 'flex', flexWrap:'wrap', flexDirection: 'row',justifyContent:'space-between', marginTop: '4rem'}}>
                
                <ButtonGroup color="primary" aria-label="primary button group">
                        <Button onClick={ ()=>this.fetchUsers(this.state.name, Math.max( this.state.crrentPage - 1 , 1))} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/></svg> 
                                Previous
                        </Button>
                        <Button onClick={()=> this.fetchUsers(this.state.name, Math.min(this.state.crrentPage + 1, this.state.totalPage))}>Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>
                        </Button>
                </ButtonGroup> 
                
                
                <Button size="small" >
                   {this.state.crrentPage } / {this.state.totalPage}
                </Button> 

                <div>
                <Input
                    placeholder="Go to page"
                    onChange = {(event)=> this.setGotoValue(event)}
                    type='number'
                    style = {{marginTop:10}}
                    inputProps={{
                    'aria-label': 'description',
                 }}/>
                
                <Button color="primary" size="small" onClick = { () =>this.fetchUsers(this.state.name, this.goTopage)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>
                </Button> 
                </div>
            
              </Container>
        
              <Container fixed style={{display: 'flex', flexWrap:'wrap', flexDirection: 'row',justifyContent:'space-between', marginTop: '4rem'}}>
               <Grid userList = {this.state.list}/>
              </Container> 

              </div>) 
              : "" }

              {this.state.statusCode ? (<div> {this.state.statusCode}</div>) : ""}

            </React.Fragment>

          );

    }
}

export default FixedContainer;