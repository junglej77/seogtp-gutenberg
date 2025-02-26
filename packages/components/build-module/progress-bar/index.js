/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import * as ProgressBarStyled from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedProgressBar(props, ref) {
  const {
    className,
    value,
    ...progressProps
  } = props;
  const isIndeterminate = !Number.isFinite(value);
  return /*#__PURE__*/_jsxs(ProgressBarStyled.Track, {
    className: className,
    children: [/*#__PURE__*/_jsx(ProgressBarStyled.Indicator, {
      style: {
        '--indicator-width': !isIndeterminate ? `${value}%` : undefined
      },
      isIndeterminate: isIndeterminate
    }), /*#__PURE__*/_jsx(ProgressBarStyled.ProgressElement, {
      max: 100,
      value: value,
      "aria-label": __('Loading …'),
      ref: ref,
      ...progressProps
    })]
  });
}

/**
 * A simple horizontal progress bar component.
 *
 * Supports two modes: determinate and indeterminate. A progress bar is determinate
 * when a specific progress value has been specified (from 0 to 100), and indeterminate
 * when a value hasn't been specified.
 *
 * ```jsx
 * import { ProgressBar } from '@wordpress/components';
 *
 * const MyLoadingComponent = () => {
 * 	return <ProgressBar />;
 * };
 * ```
 */
export const ProgressBar = forwardRef(UnforwardedProgressBar);
export default ProgressBar;
//# sourceMappingURL=index.js.map