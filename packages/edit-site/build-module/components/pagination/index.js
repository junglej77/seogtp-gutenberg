/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalText as Text, Button } from '@wordpress/components';
import { __, _x, _n, sprintf, isRTL } from '@wordpress/i18n';
import { previous, chevronLeft, chevronRight, next } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Pagination({
  currentPage,
  numPages,
  changePage,
  totalItems,
  className,
  disabled = false,
  buttonVariant = 'tertiary',
  label = __('Pagination Navigation')
}) {
  return /*#__PURE__*/_jsxs(HStack, {
    expanded: false,
    as: "nav",
    "aria-label": label,
    spacing: 3,
    justify: "flex-start",
    className: clsx('edit-site-pagination', className),
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "muted",
      className: "edit-site-pagination__total",
      children:
      // translators: %s: Total number of patterns.
      sprintf(
      // translators: %s: Total number of patterns.
      _n('%s item', '%s items', totalItems), totalItems)
    }), /*#__PURE__*/_jsxs(HStack, {
      expanded: false,
      spacing: 1,
      children: [/*#__PURE__*/_jsx(Button, {
        variant: buttonVariant,
        onClick: () => changePage(1),
        accessibleWhenDisabled: true,
        disabled: disabled || currentPage === 1,
        label: __('First page'),
        icon: isRTL() ? next : previous,
        size: "compact"
      }), /*#__PURE__*/_jsx(Button, {
        variant: buttonVariant,
        onClick: () => changePage(currentPage - 1),
        accessibleWhenDisabled: true,
        disabled: disabled || currentPage === 1,
        label: __('Previous page'),
        icon: isRTL() ? chevronRight : chevronLeft,
        size: "compact"
      })]
    }), /*#__PURE__*/_jsx(Text, {
      variant: "muted",
      children: sprintf(
      // translators: %1$s: Current page number, %2$s: Total number of pages.
      _x('%1$s of %2$s', 'paging'), currentPage, numPages)
    }), /*#__PURE__*/_jsxs(HStack, {
      expanded: false,
      spacing: 1,
      children: [/*#__PURE__*/_jsx(Button, {
        variant: buttonVariant,
        onClick: () => changePage(currentPage + 1),
        accessibleWhenDisabled: true,
        disabled: disabled || currentPage === numPages,
        label: __('Next page'),
        icon: isRTL() ? chevronLeft : chevronRight,
        size: "compact"
      }), /*#__PURE__*/_jsx(Button, {
        variant: buttonVariant,
        onClick: () => changePage(numPages),
        accessibleWhenDisabled: true,
        disabled: disabled || currentPage === numPages,
        label: __('Last page'),
        icon: isRTL() ? previous : next,
        size: "compact"
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map