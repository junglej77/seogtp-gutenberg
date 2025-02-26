/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { StyledSpinner, SpinnerTrack, SpinnerIndicator } from './styles';
/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function UnforwardedSpinner({
  className,
  ...props
}, forwardedRef) {
  return /*#__PURE__*/_jsxs(StyledSpinner, {
    className: clsx('components-spinner', className),
    viewBox: "0 0 100 100",
    width: "16",
    height: "16",
    xmlns: "http://www.w3.org/2000/svg",
    role: "presentation",
    focusable: "false",
    ...props,
    ref: forwardedRef,
    children: [/*#__PURE__*/_jsx(SpinnerTrack, {
      cx: "50",
      cy: "50",
      r: "50",
      vectorEffect: "non-scaling-stroke"
    }), /*#__PURE__*/_jsx(SpinnerIndicator, {
      d: "m 50 0 a 50 50 0 0 1 50 50",
      vectorEffect: "non-scaling-stroke"
    })]
  });
}
/**
 * `Spinner` is a component used to notify users that their action is being processed.
 *
 * ```js
 *   import { Spinner } from '@wordpress/components';
 *
 *   function Example() {
 *     return <Spinner />;
 *   }
 * ```
 */
export const Spinner = forwardRef(UnforwardedSpinner);
export default Spinner;
//# sourceMappingURL=index.js.map