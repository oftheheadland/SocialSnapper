import React, { Component } from 'react';
import Header from './components/Header';
import MediaFetcher from './components/MediaFetcher';
import './App.css';
import './style.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MediaFetcher />
      </div>
    );
  }
}

export default App;
