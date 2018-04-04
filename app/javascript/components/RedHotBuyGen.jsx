import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

class RedHotBuyGen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      resultText: 'default',
      resultHourly: 0.0
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resolvePromise = this.resolvePromise.bind(this);
  }
  
  handleChange(event) {
      this.setState({query: event.target.value});
      this.handleSubmit(event);
  }
  
  resolvePromise(response){
      this.setState({
          resultText: response.data
      });
  }
  
  handleSubmit(event) {
      event.preventDefault();
  
      var queryUrl = 'api/v1/search/?query='+this.state.query
      axios.get(queryUrl)
          .then((response)=>{
              this.resolvePromise(response); 
          });
  }
  
  resultText(){
    return this.state.resultText;
  }
  
  resultHourly(){
    return this.state.resultHourly;
  }
  
  parseHours(event){
    var hoursArr = event.target.value.split(' ').map((e)=> parseFloat(e));

    const reducer = (acc, cur) => {
      var add =  (acc <= 6 ? acc : (acc - 0.5));
      return add + cur;
    };
    
    var totalHours = 0;
    
    if(hoursArr.length < 2){
      if(hoursArr > 6){
        totalHours = hoursArr - 0.5;
      }
    }else{
      totalHours = hoursArr.reduce(reducer);
    }

    this.setState({
      resultHourly: totalHours
    });
  }
  
  render () {
    // FIXME: Missing last entered character
    // Fix with this: https://stackoverflow.com/questions/33088482/onchange-in-react-doesnt-capture-the-last-character-of-text
    return (
      <React.Fragment>
        <textarea onChange={this.handleChange}></textarea>
        <div>{this.resultText()}</div>
      </React.Fragment>
    );
  }
}

export default RedHotBuyGen;
