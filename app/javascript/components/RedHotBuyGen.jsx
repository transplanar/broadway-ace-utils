import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

class RedHotBuyGen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      resultText: 'default'
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
  
  render () {
    return (
      <React.Fragment>
        <textarea onChange={this.handleChange}></textarea>
        <div>{this.state.resultText}</div>
      </React.Fragment>
    );
  }
}

export default RedHotBuyGen;
