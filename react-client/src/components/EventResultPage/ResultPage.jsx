import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LandingPage from '../landing/LandingPage.jsx';
import Mylist from '../MylistPage/Mylist.jsx';
import Event from './Event.jsx';



// 1. landing page _ submit componemnt 

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }


  render () {
    return (<div>
      <Mylist />
      <LandingPage />
      <Event />
    </div>)
  }
}


export default Result;
