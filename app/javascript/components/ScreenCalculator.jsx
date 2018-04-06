import React from "react"
import PropTypes from "prop-types"
var phantom = require('phantomjs-prebuilt')

class ScreenCalculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input1: 0,
      input2: 0,
      cost: 0.00, 
      sqft: 0,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCost = this.getCost.bind(this);
  }
  
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
    try {
        this.calcScreenCost();    
    }catch(exception){
        this.setState({error: exception});
    }
  }
  
  calcScreenCost(){
      const width = this.state.input1;
      const height = this.state.input2;
      const sqft = (width * height) / 144;
      
      let result = ''
      
      if(sqft > 12){
        this.setState({error: "Manager Approval Required"});  
      }else{
        this.setState({error: null});    
      }
      
      if(sqft > 10){
         result = 31; 
      }else if(sqft > 8){
         result = 26; 
      }else if(sqft > 6){
          result = 22;
      }else if(sqft > 4){
          result = 16.5;
      }else if(sqft > 2){
          result = 12;
      }else{
          result = 7;
      }
      
      this.setState({cost: result, sqft: sqft});
  }
  
  getCost(){
      return <span>${parseFloat(this.state.cost).toFixed(2)}</span>;
  }
  
  getSqft(){
      return <div>Area: {parseFloat(this.state.sqft).toFixed(2)}ft<sup>2</sup></div>
  }
  
  getError(){
      return <div>{this.state.error}</div>
  }
  
  getRescreenCost(){
      return <div>Rescreen Cost: ${parseFloat(this.state.sqft * 2.25).toFixed(2)}</div>
  }
  
  // phantomJStest(){
  //   var page = require("webpage").create();
  //   page.open("http://yourwebsite", function(status) {
  //   	console.log("Status: " + status);
  //   	if(status === "success") {
  //   		page.evaluate(function(){
  //   			document.getElementById("firstName").value = "John";
  //   			document.getElementById("lastName").value = "Doe";
    
  //   		});
  //   	}
  //   phantom.exit();
  //   });
  // }
  
  render () {
    return (
      <React.Fragment>
        <h1>Screen Order Calculator</h1>
        <h1>New Screen</h1>
        Width (inches): <input type='number' value={this.state.input1} name = 'input1' onChange={this.handleChange} />
        Height (inches): <input type='number' value={this.state.input2} name = 'input2' onChange={this.handleChange} />
        {this.getSqft()} 
        {this.state.error ? this.getError() : <div>Cost: {this.getCost()}</div>}
        <h1>Rescreen</h1>
        {this.getRescreenCost()}
      </React.Fragment>
    );
  }
}

export default ScreenCalculator;