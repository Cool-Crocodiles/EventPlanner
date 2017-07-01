import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class EventDescriptionPage extends React.Component {
  
  constructor(props) {
    super(props);
  }

  addEventToMyList () {
    this.props.addEventToMyEvents(this.props.selectedEvent)
  }

  render () {
    return (
      <div id="wrapUpTwoSection">
        <section id="eventDescriptionInfoText">
          <h2 id="desTitle">{this.props.selectedEvent.title} </h2><br/>
            <img id="eventImage" src="https://eevents.s3.amazonaws.com/images/og/concert.jpg"/><br/>
          <div className="selectedData"> 
            <b>Description: </b>{this.props.selectedEvent.description}<br/>
          </div>
          <div className="selectedData"> 
            <b>Find Tickets: </b>
            <a href={this.props.selectedEvent.url} target="_blank">{this.props.selectedEvent.url}</a><br/>
          </div>
          <div className="selectedData"> 
            <b>Location: </b>{this.props.selectedEvent.venue_name}<br/>
          </div>
          <div className="selectedData"> 
            <b>Address: </b>{this.props.selectedEvent.venue_address}<br/>
          </div>
          <div className="selectedData" id="map"> 
            <b>Map: </b>
            <a href={this.props.selectedEvent.venue_url} target="_blank">{this.props.selectedEvent.venue_url}</a><br/>
          </div>
        </section>
        <section id="addMyListSection">
          <input onClick={this.addEventToMyList.bind(this)} className="btn" id="addMylistButton" type="button" value="Add to My Events" />
        </section>
      </div>
    )
  }
}



export default EventDescriptionPage;