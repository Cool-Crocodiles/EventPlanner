import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Main from '../LandingPage/LandingPage.jsx';
import Mylist from './MylistPage/Mylist.jsx';
import EventResult from './EventResult.jsx';



// 1. landing page _ submit componemnt 

class DescriptionPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }


  render () {
    return (<div>

      <LandingPage />
      <Mylist />
      <EventDescription />
    </div>)
  }
}


export default DescriptionPage;
