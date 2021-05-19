import React,{useState} from 'react'
export default function Update(props) {
    console.log('props',props);
    const [updatedname, setupdatedname] = useState("")
    const [updatedstart, setupdatedstart] = useState("")
    const [updatedend, setupdatedend] = useState("")
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
              'summary': updatedname,
              'start': {
                'date': updatedstart,
                'timeZone': 'Asia/Kolkata'
              },
              'end': {
                'date': updatedend,
                'timeZone': 'Asia/Kolkata'
              },
              'hangoutLink': 'https://meet.google.com/rph-dxck-cxu',
           }
            var request = gapi.client.calendar.events.update({
              'calendarId': 'primary',
              'eventId':props.id,
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
            <form data-testid="update form" onSubmit={(event)=>{
                event.preventDefault();
                handleClick();
                setupdatedname("");
                setupdatedstart("");
                setupdatedend("");
            }} >
        <input type="text" data-testid="Update event name" value={updatedname} id="outlined-basic" placeholder="Event name" onChange={(e)=>setupdatedname(e.target.value)} required/><br/>
        <input type="text" data-testid="Update start date" value={updatedstart} id="outlined-basic" placeholder="Start date" variant="outlined" onChange={(e)=>setupdatedstart(e.target.value)}required/><br/>
        <input type="text" data-testid="Update end date" value={updatedend} id="outlined-basic" placeholder="End date" variant="outlined" onChange={(e)=>setupdatedend(e.target.value)}required/>
        <div><button type="submit">Update Event</button></div>
      </form>
      
        </div>
    )
}
