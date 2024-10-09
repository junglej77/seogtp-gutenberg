/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DownloadableBlockIcon from '../downloadable-block-icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function CompactList({
  items
}) {
  if (!items.length) {
    return null;
  }
  return /*#__PURE__*/_jsx("ul", {
    className: "block-directory-compact-list",
    children: items.map(({
      icon,
      id,
      title,
      author
    }) => /*#__PURE__*/_jsxs("li", {
      className: "block-directory-compact-list__item",
      children: [/*#__PURE__*/_jsx(DownloadableBlockIcon, {
        icon: icon,
        title: title
      }), /*#__PURE__*/_jsxs("div", {
        className: "block-directory-compact-list__item-details",
        children: [/*#__PURE__*/_jsx("div", {
          className: "block-directory-compact-list__item-title",
          children: title
        }), /*#__PURE__*/_jsx("div", {
          className: "block-directory-compact-list__item-author",
          children: sprintf( /* translators: %s: Name of the block author. */
          __('By %s'), author)
        })]
      })]
    }, id))
  });
}
//# sourceMappingURL=index.js.map