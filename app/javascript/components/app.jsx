import React from "react"
import PropTypes from "prop-types"
import RedHotBuyGen from "./RedHotBuyGen.jsx"
import HourlyCalculator from "./HourlyCalculator.jsx"
import ScreenCalculator from "./ScreenCalculator.jsx"

class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  handleChange(event){
   
  }
  
  render () {
    return (
      <div id="app">
        <RedHotBuyGen />
        <HourlyCalculator />
        <ScreenCalculator />
      </div>
    );
  }
}

export default App;