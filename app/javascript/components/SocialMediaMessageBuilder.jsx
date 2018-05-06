import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import _ from 'lodash';
import ClipboardJS from 'clipboard';

const DEFAULT_RESULT_TEXT = "Awaiting Input";
const SELECT_BOX_OPTIONS = "Red Hot Buy, Crafted Workshop, Acepiration, Acescapism, Colorhouse".split(', ');
const ACEPIRATION_HASHTAG = '#Acepiration';
const BROADWAY_ACE_DEALS_URL = 'http://www.broadwayace.com/current-ads'
const COLORHOUSE_HANDLES = {
  twitter: '@colorhousetweet', 
  facebook: '@colorhousepaint', 
  pintrest: '@ColorhousePaint',
  instagram: '@colorhousepaint'
};

const CRAFTED_WORKSHOP_HANDLES = {
  all: '@craftedworkshop'
}

const SM_CHANNELS = 'Facebook, Twitter, Pintrest, Instagram'.toLowerCase().split(', ');

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
    
    // new ClipboardJS('.btn');
    // new ClipboardJS('.btn', {
    //     text: function(trigger) {
    //         return trigger.getAttribute('aria-label');
    //     }
    // });
    
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
    this.updateResultMessage({message: message});
  }
  
  updateChoice(choice){
    this.updateResultMessage({choice: choice});
  }
  
  singleAffixPairBuilder(prefix, message, suffix){
    return `${prefix} ${message} ${suffix}`;
  }
  
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
    let handles = [];
    let hashtags = [];
    let template = '';
    
    if(_.isEmpty(link)){
      let hsh = this.parseLink(message, link);
      message = hsh.message;
      link = hsh.link;
    }
    
    switch(choice){
      case "Red Hot Buy":
        suffix = `More Deals: ${BROADWAY_ACE_DEALS_URL}`;
        template = `${message} ${suffix} ${link}` 
        break;
      case "Crafted Workshop":
        hashtags << ACEPIRATION_HASHTAG
        handles = CRAFTED_WORKSHOP_HANDLES;
        
        template = this.generateMultiSuffix(message, link, handles, hashtags);
        break;
      case 'Acescapism':
        suffix = '@acehardware #acescapism';
        template = `${message} ${link} ${suffix}`;
        break;
      case 'Acepiration':
        suffix = '@acehardware #acepiration';
        template = `${message} ${link} ${suffix}`;
        break;
      case 'Colorhouse':
        if(_.isEmpty(link)){
          link = 'http://www.colorhousepaint.com/'  
        }

        handles = COLORHOUSE_HANDLES;
        
        template = this.generateMultiSuffix(message, link, handles, hashtags);
        break;
      default:
        template = `ERROR: Invalid Selection ${choice}`
        break;
    }
    
    this.setState({
      resultText: template
    });  
  }
  
  generateMultiSuffix(message, link, handles, hashtags=[]){
    let result = []
    let _hashtags = hashtags.join(' ');
    let index = 0;
    
    // console.log(`Handles: ${handles}`);
    // console.log(`keys: ${Object.keys(handles.keys}`);
    
    if(_.includes(Object.keys(handles),'all')){
      console.log(`All channels a go`);
    }
    _.each(SM_CHANNELS, (channel)=>{
      if(!_.isEmpty(handles[channel])){
        let channelBold = <span><b>{channel}: </b></span>
        result.push(<div key={index++}>{channelBold}{`${message} ${link} ${handles[channel]} ${_hashtags}`}</div>); 
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
  
  // WIP: https://clipboardjs.com
  render () {
    return (
      <React.Fragment>
        <h1>Red Hot Buy Generator</h1>
        <textarea onChange={this.handleChange}></textarea>
        <input onChange={this.handleLinkInput}></input>
        <select onChange={this.handleSelectedChoice} value={this.state.selectedChoice}>
          {this.state.selectOptionsContent}
        </select>
        <div id='result'>{this.getResultText()}</div>
      </React.Fragment>
    );
    // <div>
    //   <input id='messageResult' value={this.getResultText()} readOnly></input>
    // </div>
    // <textarea onChange={this.handleChange} onSubmit={this.copyText}></textarea>
    // <button className="btn" type='submit' data-clipboard-target="#messageResult">Copy</button>
  }
}

export default SocialMediaMessageBuilder;
