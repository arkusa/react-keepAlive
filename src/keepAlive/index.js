import React from 'react';

const NOOP = () => {};
/*
 * @param {props.instances} - keepAlive 保存的实例集合
 * @param {props.key} - 必须，且不能重复，这是为了每次路由变化的时候强制KeepAlive更新
 * @param {props.instanceKey} - instances 中的key值, 组件实例被保存到instances[instanceKey]
 */
export default class KeepAlive extends React.Component {
  
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.initChildDidMount();
  }

  initChildDidMount() {
    const object = this.props.instances;
    const key = this.props.instanceKey;

    if (object[key]) return;

    const didMount = this.props.children
      .type.prototype.componentDidMount || NOOP;

    this.props.children
      .type.prototype.componentDidMount = function(...argvs) {
        object[key] = this;
        object[key].__is_keep_active__ = true;

        didMount.call(this, ...argvs);
        
        Object.getPrototypeOf(this).componentDidMount
          = didMount
      }
  }

  componentDidMount() {
    const object = this.props.instances;
    const key = this.props.instanceKey;

    console.log(object[key]);
    if (object[key]) {
      object[key].componentDidMount = () => {};
      object[key].componentWillUnmount = () => {};
    }

    if(
      object[key]
      && typeof object[key].componentActived === 'function'
    ) {
      return object[key].componentActived();
    }
  }

  componentWillUnmount() {
    const object = this.props.instances;
    const key = this.props.instanceKey;

    if(
      object[key]
      && typeof object[key].componentDeactived === 'function'
    ) {
      return object[key].componentDeactived();
    }
  }

  render() {
    const object = this.props.instances;
    const key = this.props.instanceKey;

    if(object[key]) {
      const KeepAliveWrap = WrapFactory(object[key]);
      return (
        <KeepAliveWrap />
      );
    }

    return (
      this.props.children
    );
  }
}

function WrapFactory(instance) {
  return class extends React.Component {
    constructor() {
      return instance;
    }
  }
}
