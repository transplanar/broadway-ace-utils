import React from "react"
import PropTypes from "prop-types"

class HourlyCalculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      resultHourly: 0.0
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
    var hoursArr = event.target.value.split(' ').map((e)=> parseFloat(e));

    const reducer = (acc, cur) => {
      var add =  (acc < 6 ? acc : (acc - 0.5));
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
    return (
      <React.Fragment>
        <h1>Work Hour Calculator</h1>
        <input onChange={this.handleChange}></input>
        <div>{this.state.resultHourly}</div>
      </React.Fragment>
    );
  }
}

export default HourlyCalculator;