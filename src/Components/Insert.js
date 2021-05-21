import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
function Insert(props) {
    const classes = useStyles();
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)
    const [name, setname] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const resetform=()=>{
                setname("");
                setstart("");
                setend("");
    }
    const handleClick = () => {
      console.log("data",start);
    const gapi = window.gapi
    const CLIENT_ID = "639100172651-75tnqt7k8b64d75n8en3ghosh8jnh9d9.apps.googleusercontent.com"
    const API_KEY = "AIzaSyBChZ90Wv3zs6WMlkgW75EZbobmbsO8ePs"
    const SCOPES = "https://www.googleapis.com/auth/calendar.events"
        gapi.load('client:auth2', () => {
          console.log('loaded client')
    
          gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          })
    
    
          if(props.isSignedIn){
            const event = {
              'summary': name,
              'start': {
                'date': start,
                'timeZone': 'Asia/Kolkata'
              },
              'end': {
                'date': end,
                'timeZone': 'Asia/Kolkata'
              },
           }
           const request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
            })
    
            request.execute(event => {
              if(event && event.hasOwnProperty('error'))
              {
                  console.log('-error-',event)
                  seterror(true)
              }
              else{
              console.log('-added-',event)
              setsuccess(true)
              }
            })
          }
        })
      }
    const history=useHistory()
    return (
        
        <div>
           {props.isSignedIn && <form data-testid="insert form" onSubmit={(event)=>{
                event.preventDefault();
                handleClick();
                resetform();
            }} className={classes.root}>
        <TextField data-testid="Input event name" value={name} id="outlined-basic" placeholder="Event Name" label="Event Name" variant="outlined" onChange={(e)=>setname(e.target.value)} required/><br/>
        {/* <TextField id="outlined-basic" value={start} label="Start Date  yyyy-MM-dd" placeholder="Input Start Date" variant="outlined" onChange={(e)=>setstart(e.target.value)}required/><br/> */}
        {/* <TextField id="outlined-basic" value={end} label="End Date  yyyy-MM-dd" placeholder="Input End Date" variant="outlined" onChange={(e)=>setend(e.target.value)}required/> */}
        <TextField id="outlined-basic" variant="outlined" label="Start date" type="date" placeholder="Input Start Date" value={start} InputLabelProps={{shrink: true,}} onChange={(e)=>setstart(e.target.value)} required/><br/>
        <TextField id="outlined-basic" variant="outlined" label="End date" type="date" placeholder="Input End Date" value={end} InputLabelProps={{shrink: true,}} onChange={(e)=>setend(e.target.value)} required/>
        <div><Button variant="contained" size="large" color="primary" type="submit" className="button" >Add Event</Button></div>
      </form>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="contained" size="large" color="primary" onClick={()=>{history.push("/")}}>Go back</Button><br/><br/>
      {!props.isSignedIn&&<Alert variant="filled" severity="error">Sorry! make sure that you are logged in for adding events</Alert>}
      {success && <Alert onClose={() => {setsuccess(false)}}>Added event successfully</Alert>}
      {error && <Alert onClose={() => {seterror(false)}} severity="error">Sorry some error occured please try after some time</Alert>}
        </div>
    )
}
const mapStateToProps=(state)=>{
  //console.log('map',state);
  return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps)(Insert)