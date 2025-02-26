/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import isShallowEqual from '@wordpress/is-shallow-equal';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { createHigherOrderComponent } from '../../utils/create-higher-order-component';

/**
 * Given a component returns the enhanced component augmented with a component
 * only re-rendering when its props/state change
 *
 * @deprecated Use `memo` or `PureComponent` instead.
 */
import { jsx as _jsx } from "react/jsx-runtime";
const pure = createHigherOrderComponent(function (WrappedComponent) {
  if (WrappedComponent.prototype instanceof Component) {
    return class extends WrappedComponent {
      shouldComponentUpdate(nextProps, nextState) {
        return !isShallowEqual(nextProps, this.props) || !isShallowEqual(nextState, this.state);
      }
    };
  }
  return class extends Component {
    shouldComponentUpdate(nextProps) {
      return !isShallowEqual(nextProps, this.props);
    }
    render() {
      return /*#__PURE__*/_jsx(WrappedComponent, {
        ...this.props
      });
    }
  };
}, 'pure');
export default pure;
//# sourceMappingURL=index.js.map