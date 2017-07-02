import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: '',
      index : null
    }
  }

  eventDescriptionPage(e) {
    var selectedTitle = e.target.title; 
    var events = this.props.events; 
    for ( var i = 0; i < events.length; i++) {
      if( events[i].title === selectedTitle ) {
        this.setState({
          selectedEvent: events[i],
          index: i
        },  this.sendSelectedEventToTopComponent )
      }
    }
   this.sendSelectedEventToTopComponent(); 
  }

  sendSelectedEventToTopComponent() {
    this.props.description(this.state.selectedEvent, this.state.index);
  }

  render () {
    return (
       <div >
        <div className ="allEvents">
          {this.props.events === null ? null : 
            this.props.events.map((event, index) =>  {
              return (
                <div key={index} className="eachEvent">
                  <div className ="eventHandler">
                      <div className="eventImages">
                        { event.image !== null ? <img src={event.image.medium.url}/> : <img src="http://s4.evcdn.com/images/block250/I0-001/024/825/663-1.jpeg_/mj-live-michael-jackson-tribute-concer-63.jpeg"/> }
                      </div>
                      <div className="eventSmallDes">
                        { event.title !== null ? <a id="resultTitle" onClick={this.eventDescriptionPage.bind(this)} href="#descriptionPage" className="eventTitle" title={event.title}>{event.title.slice(0,18)}</a> : null } <br/> 
                        <a id="resultTitle" onClick={this.eventDescriptionPage.bind(this)} href="#descriptionPage" className="eventTitle" title={event.title}>{event.title.slice(18,38)}</a><br/>
                        <a id="resultTitle" onClick={this.eventDescriptionPage.bind(this)} href="#descriptionPage" className="eventTitle" title={event.title}>{event.title.slice(38,58)}</a><br/>
                        <span className="eventVenueName">{event.venue_name.slice(0,25)}</span> <br/>
                        <span className="eventVenueName">{event.venue_name.slice(25)}</span> <br/>
                      </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}


export default Events;
