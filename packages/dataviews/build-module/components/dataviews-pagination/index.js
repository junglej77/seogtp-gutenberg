/**
 * WordPress dependencies
 */
import { Button, __experimentalHStack as HStack, SelectControl } from '@wordpress/components';
import { createInterpolateElement, memo, useContext } from '@wordpress/element';
import { sprintf, __, _x, isRTL } from '@wordpress/i18n';
import { next, previous } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function DataViewsPagination() {
  var _view$page;
  const {
    view,
    onChangeView,
    paginationInfo: {
      totalItems = 0,
      totalPages
    }
  } = useContext(DataViewsContext);
  if (!totalItems || !totalPages) {
    return null;
  }
  const currentPage = (_view$page = view.page) !== null && _view$page !== void 0 ? _view$page : 1;
  const pageSelectOptions = Array.from(Array(totalPages)).map((_, i) => {
    const page = i + 1;
    return {
      value: page.toString(),
      label: page.toString(),
      'aria-label': currentPage === page ? sprintf(
      // translators: Current page number in total number of pages
      __('Page %1$s of %2$s'), currentPage, totalPages) : page.toString()
    };
  });
  return !!totalItems && totalPages !== 1 && /*#__PURE__*/_jsxs(HStack, {
    expanded: false,
    className: "dataviews-pagination",
    justify: "end",
    spacing: 6,
    children: [/*#__PURE__*/_jsx(HStack, {
      justify: "flex-start",
      expanded: false,
      spacing: 1,
      className: "dataviews-pagination__page-select",
      children: createInterpolateElement(sprintf(
      // translators: 1: Current page number, 2: Total number of pages.
      _x('<div>Page</div>%1$s<div>of %2$s</div>', 'paging'), '<CurrentPage />', totalPages), {
        div: /*#__PURE__*/_jsx("div", {
          "aria-hidden": true
        }),
        CurrentPage: /*#__PURE__*/_jsx(SelectControl, {
          "aria-label": __('Current page'),
          value: currentPage.toString(),
          options: pageSelectOptions,
          onChange: newValue => {
            onChangeView({
              ...view,
              page: +newValue
            });
          },
          size: "small",
          __nextHasNoMarginBottom: true,
          variant: "minimal"
        })
      })
    }), /*#__PURE__*/_jsxs(HStack, {
      expanded: false,
      spacing: 1,
      children: [/*#__PURE__*/_jsx(Button, {
        onClick: () => onChangeView({
          ...view,
          page: currentPage - 1
        }),
        disabled: currentPage === 1,
        accessibleWhenDisabled: true,
        label: __('Previous page'),
        icon: isRTL() ? next : previous,
        showTooltip: true,
        size: "compact",
        tooltipPosition: "top"
      }), /*#__PURE__*/_jsx(Button, {
        onClick: () => onChangeView({
          ...view,
          page: currentPage + 1
        }),
        disabled: currentPage >= totalPages,
        accessibleWhenDisabled: true,
        label: __('Next page'),
        icon: isRTL() ? previous : next,
        showTooltip: true,
        size: "compact",
        tooltipPosition: "top"
      })]
    })]
  });
}
export default memo(DataViewsPagination);
//# sourceMappingURL=index.js.map