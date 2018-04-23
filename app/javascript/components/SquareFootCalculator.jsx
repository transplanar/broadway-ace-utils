import React from "react"
import PropTypes from "prop-types"
import _ from 'lodash'

const selectBoxOptions = {
  glassSingle: 'Glass - SINGLE STRENGTH',
  glassDouble: 'Glass - DOUBLE STRENGTH',
  screenNew: 'Screen - NEW',
  screenRepair: 'Screen - REPAIR'
}

class SquareFootCalculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: 0,
      height: 0,
      cost: 0.00, 
      sqft: 0,
      error: null,
      selectOptionsContent: '',
      selectedChoice: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSelectedChoice = this.handleSelectedChoice.bind(this);
    this.getCost = this.getCost.bind(this);
  }
  
  componentDidMount(){
    let options = this.generateSelectOptions();
    
    this.setState({
      selectOptionsContent: options
    });
  }
  
  generateSelectOptions(){
    let options = _.map(selectBoxOptions, (elem, index)=>{
      return <option key={index} value={elem}>{elem}</option>; 
    });

    return options;
  }
  
  handleInput(e){
    this.setState({[e.target.name]: e.target.value});
  }
  
  handleSelectedChoice(event){
    this.setState({
      selectedChoice: event.target.value
    });
  }
  
  resolveCalcType(){
    let result = null;
    
    switch(this.state.selectedChoice){
      case selectBoxOptions.glassDouble:
        result = this.getDoubleStrengthGlassCost();
        break;
      case selectBoxOptions.glassSingle:
        result = this.getSingleStrengthGlassCost();
        break;
      case selectBoxOptions.screenNew:
        result = this.getScreenNewCost();
        break;
      case selectBoxOptions.screenRepair:
        result = this.getScreenRepairCost();
        break;
      default:
        console.log(`Invalid SquareFootCalculator option ${this.state.selectedChoice}`);
    }
    
    return result;
  }
  
  getScreenNewCost(){
      const width = this.state.width;
      const height = this.state.height;
      // const sqft = (width * height) / 144;
      
      let result = 0;
      
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
      
      return result;
      
      // this.setState({cost: result, sqft: sqft});
  }
  
  getCost(){
      return <span>${parseFloat(this.state.cost).toFixed(2)}</span>;
  }
  
  getSqft(){
    console.log(`Dimensions ${this.state.width}\" x ${this.state.height}\"`);
    
      // return <div>Area: {parseFloat(this.state.sqft).toFixed(2)}ft<sup>2</sup></div>
      return parseFloat((this.state.width) * this.state.height) / 144;
  }
  
  getError(){
      return <div>{this.state.error}</div>
  }
  
  getScreenRepairCost(){
      // return this.state.sqft * 2.25.toFixed(2)
      return this.getCostFromSqftCost(2.25);
  }
  
  getSingleStrengthGlassCost(){
      // return parseFloat(this.state.sqft * 3.75).toFixed(2);
      return this.getCostFromSqftCost(3.75);
  }
  
  getDoubleStrengthGlassCost(){
      // return <div>Rescreen Cost: ${parseFloat(this.state.sqft * 4.25).toFixed(2)}</div>
      return this.getCostFromSqftCost(4.25);
  }
  
  getCostFromSqftCost(sqftCost){
    return parseFloat(this.state.sqft * sqftCost).toFixed(2);
  }
  
  // getCost(){
  //   return this.state.cost;
  // }
  
  // TODO: Complete Generalized square foot calculator
  render () {
    return (
      <React.Fragment>
        <h1>Square Foot Calculator</h1>
        <select onChange={this.handleSelectedChoice} value={this.state.selectedChoice}>
          {this.state.selectOptionsContent}
        </select>
        
        Width (inches): <input type='number' value={this.state.width} name = 'width' onChange={this.handleInput} />
        Height (inches): <input type='number' value={this.state.height} name = 'height' onChange={this.handleInput} />
        {this.getSqft()} 
        {this.state.error ? this.getError() : <div>Cost: {this.getCost()}</div>}
        <h1>Rescreen</h1>
        {this.state.cost}
      </React.Fragment>
    );
  }
}

export default SquareFootCalculator;