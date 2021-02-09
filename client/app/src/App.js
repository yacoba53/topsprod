import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Layout from './App/Layout';
import NotFound from './App/NotFound';
import Home from './Pages/Home';
import AddActivity from './Pages/AddActivity';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Support from './Pages/Support';
import '../styles/styles.scss';

export default function App(){
  return(
    <div>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/add" component={AddActivity}/>
          <Route path="/terms" component={Terms}/>
          <Route path="/support" component={Support}/>
          <Route path="/privacy" component={Privacy}/>
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    </Router>
    </div>
  );
}
