/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarItem, DropdownMenu, Slot } from '@wordpress/components';
import { chevronDown } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { orderBy } from '../../../utils/sorting';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const POPOVER_PROPS = {
  placement: 'bottom-start'
};
const FormatToolbar = () => {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [['bold', 'italic', 'link', 'unknown'].map(format => /*#__PURE__*/_jsx(Slot, {
      name: `RichText.ToolbarControls.${format}`
    }, format)), /*#__PURE__*/_jsx(Slot, {
      name: "RichText.ToolbarControls",
      children: fills => {
        if (!fills.length) {
          return null;
        }
        const allProps = fills.map(([{
          props
        }]) => props);
        const hasActive = allProps.some(({
          isActive
        }) => isActive);
        return /*#__PURE__*/_jsx(ToolbarItem, {
          children: toggleProps => /*#__PURE__*/_jsx(DropdownMenu, {
            icon: chevronDown
            /* translators: button label text should, if possible, be under 16 characters. */,
            label: __('More'),
            toggleProps: {
              ...toggleProps,
              className: clsx(toggleProps.className, {
                'is-pressed': hasActive
              }),
              description: __('Displays more block tools')
            },
            controls: orderBy(fills.map(([{
              props
            }]) => props), 'title'),
            popoverProps: POPOVER_PROPS
          })
        });
      }
    })]
  });
};
export default FormatToolbar;
//# sourceMappingURL=index.js.map