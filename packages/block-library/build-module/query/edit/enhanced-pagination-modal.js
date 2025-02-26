/**
 * WordPress dependencies
 */
import { Button, Modal, __experimentalVStack as VStack } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useUnsupportedBlocks } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const modalDescriptionId = 'wp-block-query-enhanced-pagination-modal__description';
export default function EnhancedPaginationModal({
  clientId,
  attributes: {
    enhancedPagination
  },
  setAttributes
}) {
  const [isOpen, setOpen] = useState(false);
  const {
    hasBlocksFromPlugins,
    hasPostContentBlock,
    hasUnsupportedBlocks
  } = useUnsupportedBlocks(clientId);
  useEffect(() => {
    if (enhancedPagination && hasUnsupportedBlocks && !window.__experimentalFullPageClientSideNavigation) {
      setAttributes({
        enhancedPagination: false
      });
      setOpen(true);
    }
  }, [enhancedPagination, hasUnsupportedBlocks, setAttributes]);
  const closeModal = () => {
    setOpen(false);
  };
  let notice = __('If you still want to prevent full page reloads, remove that block, then disable "Reload full page" again in the Query Block settings.');
  if (hasBlocksFromPlugins) {
    notice = __('Currently, avoiding full page reloads is not possible when non-interactive or non-client Navigation compatible blocks from plugins are present inside the Query block.') + ' ' + notice;
  } else if (hasPostContentBlock) {
    notice = __('Currently, avoiding full page reloads is not possible when a Content block is present inside the Query block.') + ' ' + notice;
  }
  return isOpen && /*#__PURE__*/_jsx(Modal, {
    title: __('Query block: Reload full page enabled'),
    className: "wp-block-query__enhanced-pagination-modal",
    aria: {
      describedby: modalDescriptionId
    },
    role: "alertdialog",
    focusOnMount: "firstElement",
    isDismissible: false,
    onRequestClose: closeModal,
    children: /*#__PURE__*/_jsxs(VStack, {
      alignment: "right",
      spacing: 5,
      children: [/*#__PURE__*/_jsx("span", {
        id: modalDescriptionId,
        children: notice
      }), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "primary",
        onClick: closeModal,
        children: __('OK')
      })]
    })
  });
}
//# sourceMappingURL=enhanced-pagination-modal.js.map