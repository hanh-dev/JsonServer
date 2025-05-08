import React, { Component } from 'react';

class JustAnotherCounter extends Component {
  state = {
    count: 0
    };
  setCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.setCount}>Count Up To The Moon</button>
      </div>
    );
  }
}

export default JustAnotherCounter;