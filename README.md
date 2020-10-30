# react-keep-alive 

> 某天, 小伙伴问我如何实现react的keep-alive(react router级别的), google了几个方法但是感觉不算太合适, 有感而发

> 还折腾了半天的 react router，各种版本的API 头痛

其中一个比较合适的方法是**React Router**官方API提供的借助于`function children`, 根据`match`控制`display: none`

```javascript
<Route
  children={({ match, ...rest }) => (
    <Animate>
      <Something {...rest} style={{ dispaly: match ? 'visiable' : 'none' }}/>
    </Animate>
  )}
/>
```
但是这样就失去了路由按需加载的优势

---

考虑到实现`<KeepAlive />`最核心的逻辑就应该是保存组件的实例, 所以有了当前实现

**一个偏向实验性质的组件, 未经过严格测试**, 不过逻辑上没什么问题，只是在切换路由的时候会提示警告

这是因为用了下面的**hack 手段**

```javascript
const obj = {};

class A {
  constructor() {
    return obj;
  }
}
```

## 核心

- **全局保存instace**

  可以通过如下的方式保存**instance**

  ```javascript
  const co = {}
  <KeepAlive instances={co} />
  ```

  在通过在`constructor`内不返回`this`而是返回旧的**instance**, ⚠️   这里有警告

- **防止触发组件的生命周期**

  `componentWillUnmount`永远不执行, `componentDidMount` 只执行1次

- **增加一些生命周期**

  需要增加一些像`componentActived`和`componentDeactived`这样的生命周期来代替`componentDidMount`和`comopnentWillUnmount`

  在`KeepAlive`的生命周期内对其进行封装

## 还需要fix的问题

可能根本不能fix掉吧

- **root组件下的子组件, 如何正确的响应`componentActived/componentDeactived`生命周期**

  这点`KeepAlive`需要递归子实例然后封装componentDidMount和componentWillUnmount, 目前我没找到合适的方法

  可能你需要一些`EventBus`或者`redux`了

  **但是这样的话, 你可能在子组件里面加入了一些非`KeepAlive`模式下永远不会执行到的代码, 挺恶心的  🤢**

## Demo

```shell
git clone
npm i
npm start
```

## Code

代码在`src/keepAlive/index.js`

## 本质

本质上组件还是频繁的创建和销毁的，这里只是拦截了创建的过程，不返回新的实例，而是返回之前的实例，这得意保留了状态

实际上这是一种利用了内存泄漏的hack 手段

一个完美的`KeepAlive`还是需要`React`底层逻辑支持的

比如支持**unmounted**的组件执行`setState`方法..., **React**不支持`KeepAlive`可能就和这点在逻辑上是强相关的(这是我的猜测...)
