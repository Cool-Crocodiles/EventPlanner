import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';



// 1. landing page _ submit componemnt 


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      nameInput: '',
      date:'',
      location: '', 
      catagory : ''
    }
  }

  nameInputChange (e) {
    this.setState({
      nameInput: e.target.value
    })
  }


  dataInputChange (e) {
    this.setState({
      date: e.target.value
    })
  }

  locationChange (e) {
    this.setState({
      location: e.target.value
    })
  }

  submitMethod() {
    this.props.searchEvents(this.state.date, this.state.location, this.state.catagory, this.state.nameInput );
    this.setState({
      nameInput: '',
      date:'',
      location: '', 
      catagory : ''
    })
  }

  handleOptionChange (e) {
    this.setState({
      catagory: e.target.value
    });
  }


  render () {
    return (<div id="main">
    
    <table className="mainInput">
    <tbody>
      <tr> 
        <td className="title">NAME:</td> 
        <td><input className="inputBox" type="text" placeholder="Type your name" value={this.state.nameInput} onChange={this.nameInputChange.bind(this)}/> </td> 
      </tr>
      <tr> 
        <td className="title">DATE:</td> 
        <td><input className="inputBox" type="text" placeholder="MM-DD" value={this.state.date} onChange={this.dataInputChange.bind(this)}/> </td> 
      </tr> 
      <tr> 
        <td className="title">LOCATION:</td> 
        <td><input className="inputBox" type="text" placeholder="Type location" value={this.state.location} onChange={this.locationChange.bind(this)}/></td>
      </tr>
      </tbody>
    </table>


    <div className="btn-group" >
      <label className="eventCatagory">
        <input type="radio" name="options" id="option1" value="Sports" autoComplete="off" checked={this.state.catagory === 'Sports'}  onChange={this.handleOptionChange.bind(this)} /> Sports
      </label>
      <label className="eventCatagory">
        <input type="radio" name="options" id="option2" value="PerformingArts"  autoComplete="off" checked={this.state.catagory === 'PerformingArts'}  onChange={this.handleOptionChange.bind(this)}/> Performing Arts
      </label>
      <label className="eventCatagory">
        <input type="radio" name="options" id="option3" value="Concerts" autoComplete="off" checked={this.state.catagory === 'Concerts'}  onChange={this.handleOptionChange.bind(this)}/> Concerts
      </label>
    </div>


    <div id='submitButton'>
        <a id="mainButton"  className="btn btn-outline btn-xl page-scroll" onClick={this.submitMethod.bind(this)} href="#resultPage"> SEARCH EVENTS!</a>
    </div>
    </div>)
  }
}





export default LandingPage;
