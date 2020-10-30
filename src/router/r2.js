import React from 'react';

export default class R2 extends React.Component {
  state = {
    count: 2,
  }

  componentDidMount() {
    console.log('r2 DidMount');
  }

  componentActived() {
    console.log('r2 Actived');
  }

  componentDeactived() {
    console.log('r2 Deactived');
  }

  componentWillUnmount() {
    console.log('r2 unmount');
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
        <h2 style={{ textAlign: 'center' }}>R2</h2>
        <div>{ this.state.count || 0 }</div>
        <button onClick={this.click}>点击</button>
      </>
    );
  }
}

