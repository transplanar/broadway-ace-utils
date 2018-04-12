import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import _ from 'lodash'

const defaultResultText = "Awaiting Input";
const selectBoxOptions = "Red Hot Buy, Crafted Workshop".split(', ');

class SocialMediaMessageBuilder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      resultText: defaultResultText,
      selectOptionsContent: [],
      selectChoice: selectBoxOptions[0]
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChoice= this.handleSelectChoice.bind(this);
  }
  
  componentDidMount(){
    let options = this.generateSelectOptions();
    
    this.setState({
      selectOptionsContent: options
    });
  }
  
  generateSelectOptions(){
    let options = [];
    let i = 0;
    
    _.times(selectBoxOptions.length, ()=>{
      options.push(<option key={i} value={selectBoxOptions[i]}>{selectBoxOptions[i]}</option>); 
      i++;
    });

    return options;
  }

  handleChange(event) {
      let message = event.target.value;
    
      this.setState({
        message: message
      });
      
      this.updateMessage(message);
  }
  
  handleSelectChoice(event){
    let choice = event.target.value;
    
    this.setState({
      selectChoice: choice
    });
    
    this.updateChoice(choice);
  }
  
  getResultText(){
    return (this.state.query == "" ? defaultResultText : this.state.resultText);
  }
  
  updateMessage(message){
    this.setResultMessage(message, this.state.selectChoice);
  }
  
  updateChoice(choice){
    this.setResultMessage(this.state.message, choice);
  }
  
  
  // TODO: Append correct social media mention tags
  // TODO: Implement webscaping to update messages by channel
  setResultMessage(message, choice){
    let prefix = '';
    let suffix = '';
    
    switch(choice){
      case "Red Hot Buy":
        prefix = 'Red Hot Spotlight:';
        suffix = 'Learn more somewhere else!'
        break;
      case "Crafted Workshop":
        prefix = 'Get crafty!';
        suffix = 'With crafty craft crafts'
        break;
      default:
        break;
    }
    
    this.setState({
      resultText: `${prefix} ${message} ${suffix}`
    });
  }
  
  render () {
    return (
      <React.Fragment>
        <h1>Red Hot Buy Generator</h1>
        <textarea onChange={this.handleChange}></textarea>
        <div>{this.getResultText()}</div>
        <select onChange={this.handleSelectChoice} value={this.state.selectChoice}>
          {this.state.selectOptionsContent}
        </select>
      </React.Fragment>
    );
  }
}

export default SocialMediaMessageBuilder;
