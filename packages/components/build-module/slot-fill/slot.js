/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { Children, Component, cloneElement, isEmptyElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SlotFillContext from './context';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Whether the argument is a function.
 *
 * @param maybeFunc The argument to check.
 * @return True if the argument is a function, false otherwise.
 */
function isFunction(maybeFunc) {
  return typeof maybeFunc === 'function';
}
class SlotComponent extends Component {
  constructor(props) {
    super(props);
    this.isUnmounted = false;
  }
  componentDidMount() {
    const {
      registerSlot
    } = this.props;
    this.isUnmounted = false;
    registerSlot(this.props.name, this);
  }
  componentWillUnmount() {
    const {
      unregisterSlot
    } = this.props;
    this.isUnmounted = true;
    unregisterSlot(this.props.name, this);
  }
  componentDidUpdate(prevProps) {
    const {
      name,
      unregisterSlot,
      registerSlot
    } = this.props;
    if (prevProps.name !== name) {
      unregisterSlot(prevProps.name, this);
      registerSlot(name, this);
    }
  }
  forceUpdate() {
    if (this.isUnmounted) {
      return;
    }
    super.forceUpdate();
  }
  render() {
    var _getFills;
    const {
      children,
      name,
      fillProps = {},
      getFills
    } = this.props;
    const fills = ((_getFills = getFills(name, this)) !== null && _getFills !== void 0 ? _getFills : []).map(fill => {
      const fillChildren = isFunction(fill.children) ? fill.children(fillProps) : fill.children;
      return Children.map(fillChildren, (child, childIndex) => {
        if (!child || typeof child === 'string') {
          return child;
        }
        let childKey = childIndex;
        if (typeof child === 'object' && 'key' in child && child?.key) {
          childKey = child.key;
        }
        return cloneElement(child, {
          key: childKey
        });
      });
    }).filter(
    // In some cases fills are rendered only when some conditions apply.
    // This ensures that we only use non-empty fills when rendering, i.e.,
    // it allows us to render wrappers only when the fills are actually present.
    element => !isEmptyElement(element));
    return /*#__PURE__*/_jsx(_Fragment, {
      children: isFunction(children) ? children(fills) : fills
    });
  }
}
const Slot = props => /*#__PURE__*/_jsx(SlotFillContext.Consumer, {
  children: ({
    registerSlot,
    unregisterSlot,
    getFills
  }) => /*#__PURE__*/_jsx(SlotComponent, {
    ...props,
    registerSlot: registerSlot,
    unregisterSlot: unregisterSlot,
    getFills: getFills
  })
});
export default Slot;
//# sourceMappingURL=slot.js.map