import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import _ from 'lodash'

const DEFAULT_RESULT_TEXT = "Awaiting Input";
const SELECT_BOX_OPTIONS = "Red Hot Buy, Crafted Workshop, Acepiration, Acescapism".split(', ');
const ACEPIRATION_HASHTAG = '#Acepiration';
const BROADWAY_ACE_DEALS_URL = 'http://www.broadwayace.com/current-ads'

class SocialMediaMessageBuilder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      resultText: DEFAULT_RESULT_TEXT,
      selectOptionsContent: [],
      selectedChoice: SELECT_BOX_OPTIONS[0],
      link: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedChoice= this.handleSelectedChoice.bind(this);
    this.handleLinkInput = this.handleLinkInput.bind(this);
    this.updateResultMessage= this.updateResultMessage.bind(this);
  }
  
  componentDidMount(){
    let options = this.generateSelectOptions();
    
    this.setState({
      selectOptionsContent: options
    });
  }
  
  generateSelectOptions(){
    let options = _.map(SELECT_BOX_OPTIONS, (elem, index)=>{
      return <option key={index} value={elem}>{elem}</option>; 
    });

    return options;
  }

  handleChange(event) {
      let message = event.target.value;
    
      this.setState({
        message: message
      });
      
      this.updateResultMessage({message: message});
  }
  
  handleSelectedChoice(event){
    let choice = event.target.value;
    
    this.setState({
      selectedChoice: choice
    });
    
    this.updateResultMessage({choice: choice});
  }
  
  updateResultMessage(hsh){
    let msg = hsh.message || this.state.message;
    let cho = hsh.choice || this.state.selectedChoice;
    let lnk = hsh.link || this.state.link;
    
    this.setResultMessage(msg, cho, lnk);
  }
  
  getResultText(){
    return (this.state.query == "" ? DEFAULT_RESULT_TEXT : this.state.resultText);
  }
  
  updateLink(link){
    this.updateResultMessage({link: link})
  }
  
  updateMessage(message){
    // this.setResultMessage(message, this.state.selectedChoice);
    this.updateResultMessage({message: message});
  }
  
  updateChoice(choice){
    // this.setResultMessage(this.state.message, choice);
    this.updateResultMessage({choice: choice});
  }
  
  singleAffixPairBuilder(prefix, message, suffix){
    return `${prefix} ${message} ${suffix}`;
  }
  
  // parseLink(msg){
  parseLink(msg, lnk){
    let arr = msg.split(' ');
    
    let link = _.find(arr, (elem)=>{
      return elem.includes('http:') || elem.includes('www.') || elem.includes('.com')
    });
    
    link = _.isEmpty(link) ? '' : link;
    
    return {message: msg.replace(link, ''), link: link}
  }
  
  // TODO: Append correct social media mention tags
  // TODO: Implement webscaping to update messages by channel
  setResultMessage(message, choice, link){
    let multichannel = false;
    let prefix = '';
    let suffix = '';
    let suffixes = [];
    let template = '';
    
    if(_.isEmpty(link)){
      let hsh = this.parseLink(message, link);
      message = hsh.message;
      link = hsh.link;
    }
    
    switch(choice){
      case "Red Hot Buy":
        prefix = 'Red Hot Spotlight:';
        suffix = `More Deals: ${BROADWAY_ACE_DEALS_URL}`;
        template = `${prefix} ${message} ${suffix} ${link}` 
        break;
      case "Crafted Workshop":
        suffixes = {
          twitter: ` ${link} @craftedworkshop ${ACEPIRATION_HASHTAG}`,
          facebook: ` ${link} @craftedworkshop ${ACEPIRATION_HASHTAG}`,
          pintrest: '',
          instagram: ` ${link} @craftedworkshop ${ACEPIRATION_HASHTAG}`
        }
        template = this.generateMultiSuffix(message, suffixes);
        break;
      case 'Acescapism':
        suffix = '@acehardware #acescapism';
        template = `${message} ${link} ${suffix}`;
        break;
      case 'Acepiration':
        suffix = '@acehardware #acepiration';
        template = `${message} ${link} ${suffix}`;
        break;
      default:
        template = `ERROR: Invalid Selection ${choice}`
        break;
    }
    
    this.setState({
      resultText: template
    });  
  }
  
  generateMultiSuffix(message, suffixes){
    let result = []
    
    _.each(suffixes, (value, key, i)=>{
      if(!_.isEmpty(value)){
        result.push(<div key={i}>{`${key}: ${message} ${value}`}</div>); 
      }
    });
    
    return result;
  }
  
  handleLinkInput(event) {
      let link = event.target.value;
    
      this.setState({
        link: link
      });
      
      this.updateResultMessage({link: link});
  }
  
  render () {
    return (
      <React.Fragment>
        <h1>Red Hot Buy Generator</h1>
        <textarea onChange={this.handleChange}></textarea>
        <div>{this.getResultText()}</div>
        <input onChange={this.handleLinkInput}></input>
        <select onChange={this.handleSelectedChoice} value={this.state.selectedChoice}>
          {this.state.selectOptionsContent}
        </select>
      </React.Fragment>
    );
  }
}

export default SocialMediaMessageBuilder;
