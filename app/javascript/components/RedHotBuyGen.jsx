import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

const defaultResultText = "Awaiting Input";

class RedHotBuyGen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      resultText: defaultResultText,
      resultHourly: 0.0
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      event.preventDefault();
      
      this.setState({query: event.target.value})
  
      var queryUrl = 'api/v1/search/?query='+ event.target.value
      axios.get(queryUrl)
          .then((response)=>{
              this.setState({
                resultText: response.data
              });
          });
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
  
  resultText(){
    return (this.state.query == "" ? defaultResultText : this.state.resultText);
  }
  
  render () {
    return (
      <React.Fragment>
        <h1>Red Hot Buy Generator</h1>
        <textarea onChange={this.handleChange}></textarea>
        <div>{this.resultText()}</div>
      </React.Fragment>
    );
  }
}

export default RedHotBuyGen;
