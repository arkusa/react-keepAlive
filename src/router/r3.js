import React from 'react';

export default class R3 extends React.Component {
  state = {
    count: 3,
  }

  componentDidMount() {
    console.log('r3 DidMount');
  }

  componentActived() {
    console.log('r3 Actived');
  }

  componentDeactived() {
    console.log('r3 Deactived');
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
        <h2 style={{ textAlign: 'center' }}>R3</h2>
        <div>{ this.state.count || 0 }</div>
        <button onClick={this.click}>点击</button>
      </>
    );
  }
}


