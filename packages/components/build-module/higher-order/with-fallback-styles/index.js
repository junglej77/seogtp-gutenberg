/**
 * External dependencies
 */
import fastDeepEqual from 'fast-deep-equal/es6';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default (mapNodeToProps => createHigherOrderComponent(WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.nodeRef = this.props.node;
      this.state = {
        fallbackStyles: undefined,
        grabStylesCompleted: false
      };
      this.bindRef = this.bindRef.bind(this);
    }
    bindRef(node) {
      if (!node) {
        return;
      }
      this.nodeRef = node;
    }
    componentDidMount() {
      this.grabFallbackStyles();
    }
    componentDidUpdate() {
      this.grabFallbackStyles();
    }
    grabFallbackStyles() {
      const {
        grabStylesCompleted,
        fallbackStyles
      } = this.state;
      if (this.nodeRef && !grabStylesCompleted) {
        const newFallbackStyles = mapNodeToProps(this.nodeRef, this.props);
        if (!fastDeepEqual(newFallbackStyles, fallbackStyles)) {
          this.setState({
            fallbackStyles: newFallbackStyles,
            grabStylesCompleted: Object.values(newFallbackStyles).every(Boolean)
          });
        }
      }
    }
    render() {
      const wrappedComponent = /*#__PURE__*/_jsx(WrappedComponent, {
        ...this.props,
        ...this.state.fallbackStyles
      });
      return this.props.node ? wrappedComponent : /*#__PURE__*/_jsxs("div", {
        ref: this.bindRef,
        children: [" ", wrappedComponent, " "]
      });
    }
  };
}, 'withFallbackStyles'));
//# sourceMappingURL=index.js.map