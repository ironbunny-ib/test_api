import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Image from 'material-ui-image'
import { useState,useEffect} from 'react';
const axios = require('axios');

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

function App() {
  const classes = useStyles();
  const [page,setPage] = useState(1);
  const [users,setUsers] = useState([[],[]]);

  useEffect(
    ()=>{
      getData(page);
    },[page]);

  function getData(){
    if(users[page-1].length!==0){
      return;
    }
    axios.get(`https://reqres.in/api/users?page=${page}`)
    .then((response)=>{
      let x = [...users];
      x[page-1]=response.data.data;
      setUsers(x);
      console.log(users[0][1].email);
    }).catch((error)=>{
      console.log(error);
    })
  }

  async function handlePageChange(event,page){
    setPage(page);
  }


  return (
    <div className="App">
      <title>API Test</title>
      <body>
        <div>
          <p>Here is the list of users:</p>
        </div>
        {
          users[page-1].map((user)=>
          <div>
          <Image height={200} width={200} src={user.avatar}/>
          <Card className={classes.root}>
            <CardContent className={classes.details}>
                <div className={classes.root}>
                  <Typography component="h6" variant="h6">
                    {user.first_name}
                  </Typography>
                  <Typography variant="h6">
                    {user.last_name}
                  </Typography>
                </div>
                <Typography variant="subtitle1" color="textSecondary">
                  {user.email}
                </Typography>
            </CardContent>
          </Card>
          </div>
          )
        }
        <div style={{padding: 10}}>
          <Pagination onChange={handlePageChange} count={2} hidePrevButton hideNextButton />
        </div>
        <div><div style={{paddingBottom: 10}}>There are only two pages</div></div>
      </body>
    </div>
  );
}

export default App;
