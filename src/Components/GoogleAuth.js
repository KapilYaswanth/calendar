import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions'
class GoogleAuth extends Component {
    
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
        window.gapi.client.init({apiKey:'AIzaSyBChZ90Wv3zs6WMlkgW75EZbobmbsO8ePs',clientId:'639100172651-75tnqt7k8b64d75n8en3ghosh8jnh9d9.apps.googleusercontent.com',
        scope:'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly'}).then(()=>{
            this.auth=window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChange)
        });
        });
    }
    
      onAuthChange=(isSignedIn)=>{

                if(isSignedIn){
                    this.props.signIn(this.auth.currentUser.get().getBasicProfile().getEmail());
                }
                else{
                    this.props.signOut();
                }
            }
    onSignInClick=()=>{
        this.auth.signIn();
    }

    onSignOutClick=()=>{
        this.auth.signOut();
    }

    getAuthState=()=>{
        if(this.props.isSignedIn){
            return(<div style={{cursor:'pointer'}} onClick={()=>this.onSignOutClick()}>
                
                <img className="ui avatar image" src={this.auth.currentUser.get().getBasicProfile().getImageUrl()} alt=""/>
                &nbsp;&nbsp;Sign Out
                   </div>
            )
        }
        else
    return(<div style={{cursor:'pointer'}} onClick={()=>this.onSignInClick()}>
                
                <img className="ui avatar image" src="https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip" alt=""/>
                &nbsp;&nbsp;Sign In
                   </div>
            )
    
    }
    
    render() {
        return (
            <div className="item">
                {this.getAuthState()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log('map',state);
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)