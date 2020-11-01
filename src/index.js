import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { HashRouter as BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import R1 from './router/r1';
import R2 from './router/r2';
import R3 from './router/r3';
import KeepAlive from './keepAlive';

const ins = {};

window.ins = ins;
ReactDOM.render((
  <BrowserRouter>
    <pre>
      <h2>R* 组件自身维护了一个 状态 this.state.count</h2>

      <h2>下面的按钮可以让状态自增 1</h2>

      <h2>相互切换看状态是否被保留</h2>

      <h2>R 4 - 6 是 R 1 - 3的非KeepAlive模式</h2>
    </pre>
    <Switch>
      <Route path="/1">
        <KeepAlive
          key="1"
          instances={ins}
          instanceKey="1"
        >
          <R1 />
        </KeepAlive>
      </Route>
      <Route path="/2">
        <KeepAlive
          key="2"
          instances={ins}
          instanceKey="2"
        >
          <R2 />
        </KeepAlive>
      </Route>
      <Route path="/3">
        <KeepAlive
          key="3"
          instances={ins}
          instanceKey="3"
        >
          <R3 />
        </KeepAlive>
      </Route>


      <Route path="/4">
        <R1 />
      </Route>
      <Route path="/5">
        <R2 />
      </Route>
      <Route path="/6">
        <R3 />
      </Route>
    </Switch>

    <div style={{ width: '200px', height: '100px', display: 'flex', justifyContent: 'space-around', margin: 'auto' }}>
      <Link to="/1">R1</Link>
      <Link to="/2">R2</Link>
      <Link to="/3">R3</Link>
      <Link to="/4">R4</Link>
      <Link to="/5">R5</Link>
      <Link to="/6">R6</Link>
    </div>
  </BrowserRouter>
), document.getElementById('root'));

