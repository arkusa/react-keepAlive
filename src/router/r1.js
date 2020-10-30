/* eslint-disable */
import React from 'react';

export default class R1 extends React.Component {
  state = {
    count: 1,
  }
  
  constructor(props) {
    super(props);
    console.log('r1 constructor');
  }

  static getDerivedStateFromProps() {
    console.log('r1 derivedStateFrom Props');
    return null;
  }

  componentDidMount() {
    console.log('r1 DidMount');
  }

  componentActived() {
    console.log('r1 Actived');
  }

  componentDeactived() {
    console.log('r1 Deactived');
  }

  componentWillUnmount() {
    console.log('r1 unmount');
  }

  componentDidUpdated() {
    console.log('updated');
  }

  click = () => {
    this.setState((state) => ({
      ...state,
      count: state.count + 1
    }));
  }

  render() {
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>R1</h2>
        <div>{ this.state.count || 0 }</div>
        <button onClick={this.click}>点击</button>
      </>
    );
  }
}
