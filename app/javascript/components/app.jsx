import React from "react"
import PropTypes from "prop-types"
import SocialMediaMessageBuilder from "./SocialMediaMessageBuilder.jsx"
import HourlyCalculator from "./HourlyCalculator.jsx"
import SquareFootCalculator from "./SquareFootCalculator.jsx"

class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  handleChange(event){
   
  }
  
  render () {
    return (
      <div id="app">
        <SocialMediaMessageBuilder />
        <HourlyCalculator />
        <SquareFootCalculator />
      </div>
    );
  }
}

export default App;