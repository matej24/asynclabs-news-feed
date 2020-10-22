import React from 'react';
import './App.css';
import NewsFeed from './pages/NewsFeed/NewsFeed';
import NewsVideo from "./pages/NewsVideo/NewsVideo"
import {Route, Switch} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={NewsFeed} />
      <Route exact path="/video/:id" component={NewsVideo} />
      </Switch>
    </div>
  );
}

export default App;
