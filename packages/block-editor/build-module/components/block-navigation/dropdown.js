/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';

/**
 * WordPress dependencies
 */
import { Button, Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { forwardRef } from '@wordpress/element';
import { listView } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import ListView from '../list-view';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockNavigationDropdownToggle({
  isEnabled,
  onToggle,
  isOpen,
  innerRef,
  ...props
}) {
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    ...props,
    ref: innerRef,
    icon: listView,
    "aria-expanded": isOpen,
    "aria-haspopup": "true",
    onClick: isEnabled ? onToggle : undefined
    /* translators: button label text should, if possible, be under 16 characters. */,
    label: __('List view'),
    className: "block-editor-block-navigation",
    "aria-disabled": !isEnabled
  });
}
function BlockNavigationDropdown({
  isDisabled,
  ...props
}, ref) {
  deprecated('wp.blockEditor.BlockNavigationDropdown', {
    since: '6.1',
    alternative: 'wp.components.Dropdown and wp.blockEditor.ListView'
  });
  const hasBlocks = useSelect(select => !!select(blockEditorStore).getBlockCount(), []);
  const isEnabled = hasBlocks && !isDisabled;
  return /*#__PURE__*/_jsx(Dropdown, {
    contentClassName: "block-editor-block-navigation__popover",
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(BlockNavigationDropdownToggle, {
      ...props,
      innerRef: ref,
      isOpen: isOpen,
      onToggle: onToggle,
      isEnabled: isEnabled
    }),
    renderContent: () => /*#__PURE__*/_jsxs("div", {
      className: "block-editor-block-navigation__container",
      children: [/*#__PURE__*/_jsx("p", {
        className: "block-editor-block-navigation__label",
        children: __('List view')
      }), /*#__PURE__*/_jsx(ListView, {})]
    })
  });
}
export default forwardRef(BlockNavigationDropdown);
//# sourceMappingURL=dropdown.js.map