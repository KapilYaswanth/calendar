import Calendar from './Components/Calendar'
import Header from './Components/Header/Header'
import Insert from './Components/Insert'
import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Errorboundary from './Components/Errorboundary'
function App() {
  return (
    <div className="ui container">
     <Header />
     <Router>
       <Route path="/" exact>
       <Errorboundary>    
     <Calendar/>
     </Errorboundary>
     </Route>
     <Route path="/insert">
       <Insert/>
     </Route>
     </Router>
    </div>
  );
}

export default App;
