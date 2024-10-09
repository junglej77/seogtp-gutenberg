/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { NavigatorBackButton } from '../navigator-back-button/component';
import { contextConnect } from '../../context';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedNavigatorToParentButton(props, forwardedRef) {
  deprecated('wp.components.NavigatorToParentButton', {
    since: '6.7',
    alternative: 'wp.components.NavigatorBackButton'
  });
  return /*#__PURE__*/_jsx(NavigatorBackButton, {
    ref: forwardedRef,
    ...props
  });
}

/**
 * _Note: this component is deprecated. Please use the `NavigatorBackButton`
 * component instead._
 *
 * @deprecated
 */
export const NavigatorToParentButton = contextConnect(UnconnectedNavigatorToParentButton, 'NavigatorToParentButton');
export default NavigatorToParentButton;
//# sourceMappingURL=component.js.map