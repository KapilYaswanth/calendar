import React,{useState} from 'react'
export default function Update(props) {
    console.log('props',props);
    const [updatedname, setupdatedname] = useState(null)
    const [updatedstart, setupdatedstart] = useState(null)
    const [updatedend, setupdatedend] = useState(null)
    const resetform=()=>{
      setupdatedname("");
      setupdatedstart("");
      setupdatedend("");
    }
    const handleClick = () => {
    const gapi = window.gapi
    const CLIENT_ID = "639100172651-75tnqt7k8b64d75n8en3ghosh8jnh9d9.apps.googleusercontent.com"
    const API_KEY = "AIzaSyBChZ90Wv3zs6WMlkgW75EZbobmbsO8ePs"
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
        gapi.load('client:auth2', () => {
          console.log('loaded client')
    
          gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          })
    
    
            const event = {
              'summary': updatedname || props.name,
              'start': {
                'date': updatedstart || props.start,
                'timeZone': 'Asia/Kolkata'
              },
              'end': {
                'date': updatedend || props.end,
                'timeZone': 'Asia/Kolkata'
              },
           }
           const request = gapi.client.calendar.events.update({
              'calendarId': 'primary',
              'eventId':props.id,
              'resource': event,
            })
    
            request.execute(event => {if(event.hasOwnProperty('error'))
            {
              console.log('error',event)
                window.alert("Error occured")
            }
            else{
              console.log('-updated-',event)
              window.alert("updated event")
            }
            })
        })
      }
    return (
        
        <div>
            <form data-testid="update form" onSubmit={(event)=>{
                event.preventDefault();
                handleClick();
                resetform();
            }} >
        <input type="text" data-testid="Update event name" value={updatedname} id="outlined-basic" placeholder="Event name" onChange={(e)=>setupdatedname(e.target.value)} /><br/><br/>
        <label>Start date</label>&nbsp;&nbsp;<input type="date" data-testid="Update start date" value={updatedstart} id="outlined-basic" placeholder="Start date" variant="outlined" onChange={(e)=>setupdatedstart(e.target.value)}/><br/><br/>
        <label>End date</label>&nbsp;&nbsp;&nbsp;<input type="date" data-testid="Update end date" value={updatedend} id="outlined-basic" placeholder="End date" variant="outlined" onChange={(e)=>setupdatedend(e.target.value)}/><br/><br/>
        <div><button type="submit">Update Event</button></div>
      </form>
      
        </div>
    )
}
