import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Update from './Update'
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
export default function Calendar() {
const [events, setevents] = useState([])
    
      const handleEventClick=()=>{
          
        var gapi = window.gapi 
        var CLIENT_ID = "639100172651-75tnqt7k8b64d75n8en3ghosh8jnh9d9.apps.googleusercontent.com"
        var API_KEY = "AIzaSyBChZ90Wv3zs6WMlkgW75EZbobmbsO8ePs"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar.events"
            gapi.load('client:auth2', () => {
              console.log('loaded client')
        
              gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
              })
        
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
          setevents(events);
        })
    })
    
    }
    
    const Rendered=()=>{
        const classes = useStyles();
        return(<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{background:"black"}}>
            <TableCell style={{color:"white"}}><b>Event Name</b></TableCell>
            <TableCell style={{color:"white"}} align="right"><b>Organizer Email</b></TableCell>
            <TableCell style={{color:"white"}} align="right"><b>Event Date</b></TableCell>
            <TableCell style={{color:"white"}} align="right"><b>Attend</b></TableCell>
            <TableCell style={{color:"white"}} align="right"><b>View Event</b></TableCell>
            <TableCell style={{color:"white"}} align="right"><b>Update</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
              event.summary!=='Monthly Meet Up and Birthday Bash' &&
            <TableRow key={event.id}>
               <TableCell component="th" scope="row">
                {event.summary}
              </TableCell>
              <TableCell align="right">{event.creator.email}</TableCell>
              <TableCell align="right">{event.start.date || event.start.dateTime.slice(0,10)}</TableCell>
              <TableCell align="right"><a target="_blank" rel="noreferrer" href={event.hangoutLink}>{event.hangoutLink || "Meet link not available"}</a></TableCell>
              <TableCell align="right"><a target="_blank" rel="noreferrer" href={event.htmlLink}>View in calendar</a></TableCell>
              <TableCell align="right">{event.creator.email==='kapil.s@rently.com' ?<Update id={event.id}/>:"NA"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        );
    }
    return (
        <div>
        <div className="page">
            <Link to="/insert"><button className="button">Add Event</button></Link>&nbsp;&nbsp;
         <button className="button" onClick={()=>handleEventClick()}>Get Events</button>
         </div>
         <div className="ui relaxed divided list">
        {Rendered()}
        </div>
        </div>
    )
}
