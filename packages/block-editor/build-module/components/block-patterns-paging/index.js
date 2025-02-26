/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalText as Text, Button } from '@wordpress/components';
import { __, _x, _n, sprintf } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Pagination({
  currentPage,
  numPages,
  changePage,
  totalItems
}) {
  return /*#__PURE__*/_jsxs(VStack, {
    className: "block-editor-patterns__grid-pagination-wrapper",
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "muted",
      children: sprintf(
      // translators: %s: Total number of patterns.
      _n('%s item', '%s items', totalItems), totalItems)
    }), numPages > 1 && /*#__PURE__*/_jsxs(HStack, {
      expanded: false,
      spacing: 3,
      justify: "flex-start",
      className: "block-editor-patterns__grid-pagination",
      children: [/*#__PURE__*/_jsxs(HStack, {
        expanded: false,
        spacing: 1,
        className: "block-editor-patterns__grid-pagination-previous",
        children: [/*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: () => changePage(1),
          disabled: currentPage === 1,
          "aria-label": __('First page'),
          accessibleWhenDisabled: true,
          children: /*#__PURE__*/_jsx("span", {
            children: "\xAB"
          })
        }), /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: () => changePage(currentPage - 1),
          disabled: currentPage === 1,
          "aria-label": __('Previous page'),
          accessibleWhenDisabled: true,
          children: /*#__PURE__*/_jsx("span", {
            children: "\u2039"
          })
        })]
      }), /*#__PURE__*/_jsx(Text, {
        variant: "muted",
        children: sprintf(
        // translators: %1$s: Current page number, %2$s: Total number of pages.
        _x('%1$s of %2$s', 'paging'), currentPage, numPages)
      }), /*#__PURE__*/_jsxs(HStack, {
        expanded: false,
        spacing: 1,
        className: "block-editor-patterns__grid-pagination-next",
        children: [/*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: () => changePage(currentPage + 1),
          disabled: currentPage === numPages,
          "aria-label": __('Next page'),
          accessibleWhenDisabled: true,
          children: /*#__PURE__*/_jsx("span", {
            children: "\u203A"
          })
        }), /*#__PURE__*/_jsx(Button, {
          variant: "tertiary",
          onClick: () => changePage(numPages),
          disabled: currentPage === numPages,
          "aria-label": __('Last page'),
          size: "default",
          accessibleWhenDisabled: true,
          children: /*#__PURE__*/_jsx("span", {
            children: "\xBB"
          })
        })]
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map