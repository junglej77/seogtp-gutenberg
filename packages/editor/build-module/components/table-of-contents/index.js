/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dropdown, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { info } from '@wordpress/icons';
import { forwardRef } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import TableOfContentsPanel from './panel';
import { jsx as _jsx } from "react/jsx-runtime";
function TableOfContents({
  hasOutlineItemsDisabled,
  repositionDropdown,
  ...props
}, ref) {
  const hasBlocks = useSelect(select => !!select(blockEditorStore).getBlockCount(), []);
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: {
      placement: repositionDropdown ? 'right' : 'bottom'
    },
    className: "table-of-contents",
    contentClassName: "table-of-contents__popover",
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      ...props,
      ref: ref,
      onClick: hasBlocks ? onToggle : undefined,
      icon: info,
      "aria-expanded": isOpen,
      "aria-haspopup": "true"
      /* translators: button label text should, if possible, be under 16 characters. */,
      label: __('Details'),
      tooltipPosition: "bottom",
      "aria-disabled": !hasBlocks
    }),
    renderContent: ({
      onClose
    }) => /*#__PURE__*/_jsx(TableOfContentsPanel, {
      onRequestClose: onClose,
      hasOutlineItemsDisabled: hasOutlineItemsDisabled
    })
  });
}

/**
 * Renders a table of contents component.
 *
 * @param {Object}      props                         The component props.
 * @param {boolean}     props.hasOutlineItemsDisabled Whether outline items are disabled.
 * @param {boolean}     props.repositionDropdown      Whether to reposition the dropdown.
 * @param {Element.ref} ref                           The component's ref.
 *
 * @return {JSX.Element} The rendered table of contents component.
 */
export default forwardRef(TableOfContents);
//# sourceMappingURL=index.js.map