/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Warning from '../warning';
import { jsx as _jsx } from "react/jsx-runtime";
const warning = /*#__PURE__*/_jsx(Warning, {
  message: __('This block has encountered an error and cannot be previewed.')
});
export default (() => warning);
//# sourceMappingURL=block-crash-warning.native.js.map