/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, blockDefault } from '@wordpress/icons';
import { Tip, ExternalLink } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function DownloadableBlocksNoResults() {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "block-editor-inserter__no-results",
      children: [/*#__PURE__*/_jsx(Icon, {
        className: "block-editor-inserter__no-results-icon",
        icon: blockDefault
      }), /*#__PURE__*/_jsx("p", {
        children: __('No results found.')
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__tips",
      children: /*#__PURE__*/_jsxs(Tip, {
        children: [__('Interested in creating your own block?'), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsxs(ExternalLink, {
          href: "https://developer.wordpress.org/block-editor/",
          children: [__('Get started here'), "."]
        })]
      })
    })]
  });
}
export default DownloadableBlocksNoResults;
//# sourceMappingURL=no-results.js.map