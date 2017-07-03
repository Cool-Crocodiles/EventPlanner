import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import ResultBar from './components/EventResultPage/ResultBar.jsx';
import Events from './components/EventResultPage/Events.jsx';
import MyEvents from './components/MyListPage/MyEvents.jsx';
import EventDescriptionPage from './components/EventDescriptionPage/EventDescriptionPage.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      location: null,
      date: null,
      eventType: null,
      allEvents: null,
      myListClick: null,
      selectedEvent: null,
      savedEvents: [],
      randomIndex: null
    }
  }

  submitEvent(dateSelected, location, eventSelected, name) {
    this.setState({
      userName: name,
      location: location,
      date: dateSelected,
      eventType: eventSelected
    });
    $.ajax({
      url: '/events',
      type: 'POST',
      data: {
        eventDate: dateSelected,
        eventLocation: location,
        eventSelected: eventSelected
      },
      success: (data) => {
        this.setState({
          allEvents: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  };



  saveEvent(userName, saveDate, saveSelection) {
    $.ajax({
      url: '/selected',
      type: 'POST',
      data: {
          saveDate: saveDate,
          userName: userName,
          saveSelection: saveSelection
            },
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  };


  showSavedEvents(userName) {
    $.ajax({
      url: '/retrieve',
      type: 'POST',
      data: {
        userName: userName
      },
      success: (data) => {
        this.setState({
          savedEvents: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  };

  deleteEventDates(event) {
    $.ajax({
      url: '/delete',
      type: 'POST',
      data: {
          event: event
            },
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  };

  changeSetStateFromMyListButton (value) {
    this.setState({
      myListClick: value
    })
  }

  changeSetStateFromDescriptionPage (selectedEventObject, index) {
    this.setState({
      selectedEvent: selectedEventObject,
      randomIndex: index
    })
  }

  dataFromDescriptionPage (data) {
    this.saveEvent(this.state.userName, this.state.date, data);
  }

  getDataFromDatabaseForMyEventList(){
    this.showSavedEvents(this.state.userName);
  }

  sendDeleteDataToDatabase(data) {
    console.log('response!')
    this.deleteEventDates(data);
    this.showSavedEvents(this.state.userName);
  }

  render () {
    return (
      <div id= "main">
        <div id= "landing">
          <LandingPage searchEvents= {this.submitEvent.bind(this)}/>
        </div>
        <div id="resultPage">
          <div id="bar">
            { this.state.userName !== null ? <ResultBar name={this.state.userName} location={this.state.location} data={this.state.date} eventType={this.state.eventType} allEvents={this.state.allEvents} changeMyList={this.changeSetStateFromMyListButton.bind(this)}  myEventClick={this.getDataFromDatabaseForMyEventList.bind(this)} />: null }
          </div>
          <div id="events">
            { this.state.userName !== null ? <Events eventType={this.state.eventType} events={this.state.allEvents} description= {this.changeSetStateFromDescriptionPage.bind(this)}/> : null }
          </div>
        </div>
        <div id="descriptionPage">
          <div id="bar2">
          { this.state.selectedEvent !== null ? <ResultBar name={this.state.userName} location={this.state.location} data={this.state.date} eventType={this.state.eventType} allEvents={this.state.allEvents} changeMyList={this.changeSetStateFromMyListButton.bind(this)}  myEventClick={this.getDataFromDatabaseForMyEventList.bind(this)}/> : null }
          </div>
          <div id="description">
          { this.state.selectedEvent !== null ?  <EventDescriptionPage  indexForImages = {this.state.randomIndex} eventCategory={this.state.eventType} selectedEvent={this.state.selectedEvent} addEventToMyEvents={this.dataFromDescriptionPage.bind(this)}/> : null }
          </div>
        </div>
        <div id="myEventsList">
          { this.state.myListClick !== null ? <MyEvents storeDeleteData={this.sendDeleteDataToDatabase.bind(this)} savedEventData={ this.state.savedEvents } name={this.state.userName}/> : null }
        </div>
      </div>
    )
  }
}


ReactDOM.render( <App /> , document.getElementById('app'));
