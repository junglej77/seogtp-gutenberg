/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { createHigherOrderComponent } from '../../utils/create-higher-order-component';

/**
 * We cannot use the `Window['setTimeout']` and `Window['clearTimeout']`
 * types here because those functions include functionality that is not handled
 * by this component, like the ability to pass extra arguments.
 *
 * In the case of this component, we only handle the simplest case where
 * `setTimeout` only accepts a function (not a string) and an optional delay.
 */
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * A higher-order component used to provide and manage delayed function calls
 * that ought to be bound to a component's lifecycle.
 */
const withSafeTimeout = createHigherOrderComponent(OriginalComponent => {
  return class WrappedComponent extends Component {
    constructor(props) {
      super(props);
      this.timeouts = [];
      this.setTimeout = this.setTimeout.bind(this);
      this.clearTimeout = this.clearTimeout.bind(this);
    }
    componentWillUnmount() {
      this.timeouts.forEach(clearTimeout);
    }
    setTimeout(fn, delay) {
      const id = setTimeout(() => {
        fn();
        this.clearTimeout(id);
      }, delay);
      this.timeouts.push(id);
      return id;
    }
    clearTimeout(id) {
      clearTimeout(id);
      this.timeouts = this.timeouts.filter(timeoutId => timeoutId !== id);
    }
    render() {
      return (
        /*#__PURE__*/
        // @ts-ignore
        _jsx(OriginalComponent, {
          ...this.props,
          setTimeout: this.setTimeout,
          clearTimeout: this.clearTimeout
        })
      );
    }
  };
}, 'withSafeTimeout');
export default withSafeTimeout;
//# sourceMappingURL=index.js.map