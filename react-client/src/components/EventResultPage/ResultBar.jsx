import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class ResultBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zero: 0
    }
  }

  myEventsListOnClick() {
    var some ="hello"
    this.props.changeMyList(some);
    this.props.myEventClick();
  }

  render () {
    return (
      <table className ="submitInfo">
        <tbody>
          <tr>
            <td >
              <h2 id="logo">
                <a href="#top">EVENT <br/> PLANNER
                </a>
              </h2>
            </td>
            <td id="clientInfo">
              Welcome, <b>{this.props.name}</b> <br/>
              <b>{this.props.eventType}</b> Events in <b>{this.props.location}</b> on <b> {this.props.data} </b><br/>
              <div id="length">
                We have <b>{ this.props.allEvents === null || this.props.allEvents === "Wrong Entry!" ?  "0" : this.props.allEvents.length }</b> events
              </div>
            </td>
            <td id="myEventClick">
              <a onClick={this.myEventsListOnClick.bind(this)} href="#myEventsList"><b>My Events</b></a>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ResultBar;
