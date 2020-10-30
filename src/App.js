import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import R1 from './routers/r1';
import R2 from './routers/r2';
import R3 from './routers/r3';
import KeepAlive from '../components/keepAlive.js';

const co = {};

class C extends React.Component {
  render() {
    return (
      this.props.children
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <pre>
      R* 组件自身维护了一个 状态 this.state.count

      下面的按钮可以让状态自增 1

      相互切换看状态是否被保留
    </pre>

    <Switch>
      <Route path="/1">
        <KeepAlive
          key="0"
          instances={co}
          instanceKey="0"
        >
          <C>
            <R1/>
          </C>
        </KeepAlive>
      </Route>
      <Route path="/2">
        <KeepAlive
          key="1"
          instances={co}
          instanceKey="1"
        >
          <R2/>
        </KeepAlive>
      </Route>
      <Route path="/3">
        <KeepAlive
          key="2"
          instances={co}
          instanceKey="2"
        >
          <R3/>
        </KeepAlive>
      </Route>
    </Switch>

    <div style={{ width: '200px', height: '100px', display: 'flex', justifyContent: 'space-around' }}>
      <Link to="/1">R1</Link>
      <Link to="/2">R2</Link>
      <Link to="/3">R3</Link>
    </div>
  </BrowserRouter>
), document.getElementById('root'));
