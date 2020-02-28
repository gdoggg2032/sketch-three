

import React from 'react';
import { Component } from "react";



class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
          text: ''
        }
      }
      handleInput = (i) => {
        this.setState({text: i.target.value})
      }
      render() {
        return (
        <input type='text' onChange={this.handleInput} value={this.state.value}/>)
      }
}

export default Container;