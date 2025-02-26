/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Cell from './cell';
import styles from './styles.scss';
import ColorIndicator from '../../color-indicator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BottomSheetColorCell(props) {
  const {
    color,
    withColorIndicator = true,
    disabled,
    ...cellProps
  } = props;
  return /*#__PURE__*/_jsxs(Cell, {
    ...cellProps,
    accessibilityRole: "button",
    accessibilityHint: /* translators: accessibility text (hint for moving to color settings) */
    __('Double tap to go to color settings'),
    editable: false,
    disabled: disabled,
    value: withColorIndicator && !color && __('Default'),
    children: [withColorIndicator && color && /*#__PURE__*/_jsx(ColorIndicator, {
      color: color,
      style: styles.colorCircle
    }), disabled ? null : /*#__PURE__*/_jsx(Icon, {
      icon: chevronRight
    })]
  });
}
//# sourceMappingURL=color-cell.native.js.map