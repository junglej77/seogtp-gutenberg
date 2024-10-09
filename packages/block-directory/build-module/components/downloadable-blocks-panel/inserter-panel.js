/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { speak } from '@wordpress/a11y';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function DownloadableBlocksInserterPanel({
  children,
  downloadableItems,
  hasLocalBlocks
}) {
  const count = downloadableItems.length;
  useEffect(() => {
    speak(sprintf( /* translators: %d: number of available blocks. */
    _n('%d additional block is available to install.', '%d additional blocks are available to install.', count), count));
  }, [count]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!hasLocalBlocks && /*#__PURE__*/_jsx("p", {
      className: "block-directory-downloadable-blocks-panel__no-local",
      children: __('No results available from your installed blocks.')
    }), /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__quick-inserter-separator"
    }), /*#__PURE__*/_jsxs("div", {
      className: "block-directory-downloadable-blocks-panel",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "block-directory-downloadable-blocks-panel__header",
        children: [/*#__PURE__*/_jsx("h2", {
          className: "block-directory-downloadable-blocks-panel__title",
          children: __('Available to install')
        }), /*#__PURE__*/_jsx("p", {
          className: "block-directory-downloadable-blocks-panel__description",
          children: __('Select a block to install and add it to your post.')
        })]
      }), children]
    })]
  });
}
export default DownloadableBlocksInserterPanel;
//# sourceMappingURL=inserter-panel.js.map