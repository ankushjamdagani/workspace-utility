import React from 'react';
import moment from 'moment';

import '../../styles/sections/backgroundContainer.scss'

class BackgroundContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.startInterval( 1000 )
  }

  componentWillUnmount(){
    clearInterval( this.intervalId )
  }

  startInterval( ms ){
    this.intervalId = setInterval(() => {
      this.setState({})
    }, ms)
  }

  render(){
    return (
      <div className="background-container">
        <div className="background-inner-container">
          <div className="time-container">
            <div className="time-background-container">
              <div className="seconds-hand"></div>
              <div className="seconds-shadow-hand"></div>
            </div>
            <div className="time-text __ff-normal__fs-hxl__fw-xxb__">
              {moment().format('HH:mm:ss')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BackgroundContainer
