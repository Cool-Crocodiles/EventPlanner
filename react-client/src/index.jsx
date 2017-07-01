import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import ResultBar from './components/EventResultPage/ResultBar.jsx';
import Events from './components/EventResultPage/Events.jsx';
import MyEvents from './components/MyListPage/MyEvents.jsx';
import EventDescriptionPage from './components/EventDescriptionPage/EventDescriptionPage.jsx';

// index.js is the top component 
// top Component 
// 1. landing page _ submit componemnt 
// 2. result page 
// 3. description page 
// 4. mylist page 


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
      savedEvents: []
    }
  }


  //Do NOT Change submitEvent() function!
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
        eventSelected: eventSelected    //Art or Concerts or Sports 
      },
      success: (data) => {
        this.setState({
          allEvents: data              //response data is Objects in Array (coming from server)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  };


  //Do NOT Change saveEvent() function!
  saveEvent(userName, saveDate, saveSelection) {       //saveSelections is an ARRAY (saving in the DB)
    $.ajax({
      url: '/selected',
      type: 'POST', 
      data: {
          saveDate: saveDate,                   //date entered
          userName: userName,
          saveSelection: saveSelection      //selected Events user interested and want to save in the DB
            },
      success: (data) => {
        console.log(data);                       //response is just a message: 'Successfully saved' in the DB

      },
      error: (err) => {
        console.log('err', err);
      }
    });
  };


  //Do NOT Change showSavedEvents() function!
  showSavedEvents(userName) {                    //retrieve list of events from DB
    $.ajax({
      url: '/retrieve',
      type: 'POST', 
      data: {
        userName: userName
      },
      success: (data) => {
        this.setState({
          savedEvents: data          //response data is all saved date-events Objects in ARRAY (coming from server)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  };


  //Do NOT Change deleteEventDates() function!
  deleteEventDates(event) {
    console.log('deleteEventDates****************')
    $.ajax({
      url: '/delete',
      type: 'POST', 
      data: {
          event: event            //array of Dates user wants to delete from DB
            },
      success: (data) => {
        console.log(data);                      //response is just a message: 'Successfully Deleted!'
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

  changeSetStateFromDescriptionPage (selectedEventObject) {
    this.setState({
      selectedEvent: selectedEventObject
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


//Change Render!
  render () {
    return ( <div id= "main">


    <div id= "landing">
      <LandingPage searchEvents= {this.submitEvent.bind(this)}/> 
    </div>



    <div id="resultPage">
      <div id="bar">
        { this.state.userName !== null ? <ResultBar name={this.state.userName} location={this.state.location} data={this.state.date} eventType={this.state.eventType} allEvents={this.state.allEvents} changeMyList={this.changeSetStateFromMyListButton.bind(this)}  myEventClick={this.getDataFromDatabaseForMyEventList.bind(this)} />: null }
      </div>
      <div id="events">
        { this.state.userName !== null ? <Events events={this.state.allEvents} description= {this.changeSetStateFromDescriptionPage.bind(this)}/> : null }
      </div>
    </div>



    <div id="descriptionPage">
      <div id="bar2">
      { this.state.selectedEvent !== null ? <ResultBar name={this.state.userName} location={this.state.location} data={this.state.date} eventType={this.state.eventType} allEvents={this.state.allEvents} changeMyList={this.changeSetStateFromMyListButton.bind(this)}  myEventClick={this.getDataFromDatabaseForMyEventList.bind(this)}/> : null }
      </div>
      <div id="description">
      { this.state.selectedEvent !== null ?  <EventDescriptionPage  selectedEvent={this.state.selectedEvent} addEventToMyEvents={this.dataFromDescriptionPage.bind(this)}/> : null }
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





      // <Router> 
      // <Switch>
      //   <Route exact path='/' component={LandingPage}/>
      //   </Switch>
      // </Router> 

    



  
