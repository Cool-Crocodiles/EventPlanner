import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// var title = null; 
class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : null
    }
  }

  onChangeTitle (e) {
    var self = this;
    var selectedTitle = e.target.title
    var data = this.props.savedEventData
    for (var i = 0; i < data.length; i++) {
      if(data[i].event.title === selectedTitle) {
        self.setState({
          title: data[i]
        }, this.sendSetState )
      }
    }
    this.sendSetState();
  }

  sendSetState() {
    this.props.storeDeleteData(this.state.title) 
  }

  render () {
    return (
      <div>

        <div id="myEventListUserNameDiv">
          <h2 id="myEventUserName">{this.props.name}'s Events </h2>
        </div>
        {this.props.savedEventData.length === 0 ? <h2 className="emptyEvents">No saved events</h2>  : 
          this.props.savedEventData.map( (data, index) => {
            return (
            <div key={index} id="eachEventComponent">
              <div className="myEventsListInfo">
                <div className="myEventList">
                  <h3 id="myEventSavedTitle">{data.event.title}</h3>
                </div>
                <div className="myEventList">
                  <b>Find Tickets :</b>
                   <a href={data.event.url} target="_blank">{data.event.url}</a>
                </div>

                <div className="myEventList">
                  <b>Location:</b>{data.event.venue_name}
                </div>

                <div className="myEventList">
                  <b>Addres:</b>{data.event.venue_address}
                </div>
                <div className="myEventList">
                  <b>Map: </b>
                  <a href={data.event.venue_url} target="_blank">{data.event.venue_url}</a>
                </div>
              </div>
              <div className="myEventListDeleteButtonDiv" >
                <a onClick={this.onChangeTitle.bind(this)} type="button" title={data.event.title} className="btn" id="deleteButton">
                  delete
                </a>
              </div>
            </div>
            )
          })
        }
      </div>
    )
  }
}

export default MyEvents;


