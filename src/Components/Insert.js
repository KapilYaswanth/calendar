import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
export default function Insert() {
    const classes = useStyles();
    const [name, setname] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const handleClick = () => {
    var gapi = window.gapi
    var CLIENT_ID = "639100172651-75tnqt7k8b64d75n8en3ghosh8jnh9d9.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBChZ90Wv3zs6WMlkgW75EZbobmbsO8ePs"
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
        gapi.load('client:auth2', () => {
          console.log('loaded client')
    
          gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          })
    
    
          gapi.auth2.getAuthInstance().signIn()
          .then(() => {
            var event = {
              'summary': name,
              'start': {
                'date': start,
                'timeZone': 'Asia/Kolkata'
              },
              'end': {
                'date': end,
                'timeZone': 'Asia/Kolkata'
              },
              'hangoutLink': 'https://meet.google.com/rph-dxck-cxu',
           }
            var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
            })
    
            request.execute(event => {
              console.log(event)
              
            })
          })
        })
      }
    
    return (
        
        <div>
            <form data-testid="insert form" onSubmit={(event)=>{
                event.preventDefault();
                handleClick();
                setname("");
                setstart("");
                setend("");
            }} className={classes.root}>
        <TextField data-testid="Input event name" value={name} id="outlined-basic" placeholder="Event Name" label="Event Name" variant="outlined" onChange={(e)=>setname(e.target.value)} required/><br/>
        <TextField id="outlined-basic" value={start} label="Start Date  yyyy-MM-dd" placeholder="Input Start Date" variant="outlined" onChange={(e)=>setstart(e.target.value)}required/><br/>
        <TextField id="outlined-basic" value={end} label="End Date  yyyy-MM-dd" placeholder="Input End Date" variant="outlined" onChange={(e)=>setend(e.target.value)}required/>
        <div><button type="submit" className="button" >Add Event</button></div>
      </form>
      
        </div>
    )
}
