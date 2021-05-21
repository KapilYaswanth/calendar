import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Update from './Update'
import {connect} from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
function Calendar(props) {
  const classes = useStyles();
const [events, setevents] = useState([])
const [open, setopen] = useState(false)
const [status, setstatus] = useState(false)
      const handleEventClick=()=>{
        
        const gapi = window.gapi 
        const CLIENT_ID = "639100172651-75tnqt7k8b64d75n8en3ghosh8jnh9d9.apps.googleusercontent.com"
        const API_KEY = "AIzaSyBChZ90Wv3zs6WMlkgW75EZbobmbsO8ePs"
        const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        const SCOPES = "https://www.googleapis.com/auth/calendar.events"
        setopen(true)
            gapi.load('client:auth2', () => {
              console.log('loaded client')
              gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
              })
              if(props.isSignedIn){
              gapi.client.load('calendar', 'v3', () => console.log('loaded!'))    
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 100,
          'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items
          console.log('EVENTS: ', events)
          console.log('res: ', response)
          setevents(events);
        })
      }
      else{
        setstatus(true)
      }
    })
    setopen(false)
    }
    
    const Rendered=()=>{
        console.log(props.Email)
        return(<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow className="tablehead">
            <TableCell >Event Name</TableCell>
            <TableCell >Organizer Email</TableCell>
            <TableCell >Event Date</TableCell>
            <TableCell >Attend</TableCell>
            <TableCell >View Event</TableCell>
            <TableCell >Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {
          events.reverse().map((event) => (
              event.summary!=='Monthly Meet Up and Birthday Bash' &&
            <TableRow key={event.id}>
               <TableCell component="th" scope="row">
                {event.summary}
              </TableCell>
              <TableCell >{event.creator.email}</TableCell>
              <TableCell >{event.start.date || event.start.dateTime.slice(0,10)}</TableCell>
              <TableCell ><a target="_blank" rel="noreferrer" href={event.hangoutLink}>{event.hangoutLink || "Meet link not available"}</a></TableCell>
              <TableCell ><a target="_blank" rel="noreferrer" href={event.htmlLink}>View</a></TableCell>
              <TableCell >{event.creator.email===props.Email ?<Update id={event.id} name={event.summary} start={event.start.date} end={event.end.date}/>:"Cannot update"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        );
    }
    if(status)
           {
               throw new Error("Login error");
           }
    return (
        <div>
        <div className="page">
            <Link to="/insert"><button className="button">Add Event</button></Link>&nbsp;&nbsp;
         <button className="button" onClick={()=>handleEventClick()}>Get Events</button>
         </div>
         <div className="ui relaxed divided list">
        {props.isSignedIn && Rendered()}
        {!props.isSignedIn&&<Alert variant="outlined" severity="error">Please login to view your calendar events</Alert>}
        <Backdrop open={open}><CircularProgress color="inherit" /></Backdrop>
        </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
  //console.log('map',state);
  return {isSignedIn:state.auth.isSignedIn,Email:state.auth.payload}
}

export default connect(mapStateToProps)(Calendar)