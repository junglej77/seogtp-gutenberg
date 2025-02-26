/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function QueryPaginationArrowControls({
  value,
  onChange
}) {
  return /*#__PURE__*/_jsxs(ToggleGroupControl, {
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    label: __('Arrow'),
    value: value,
    onChange: onChange,
    help: __('A decorative arrow appended to the next and previous page link.'),
    isBlock: true,
    children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
      value: "none",
      label: _x('None', 'Arrow option for Query Pagination Next/Previous blocks')
    }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
      value: "arrow",
      label: _x('Arrow', 'Arrow option for Query Pagination Next/Previous blocks')
    }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
      value: "chevron",
      label: _x('Chevron', 'Arrow option for Query Pagination Next/Previous blocks')
    })]
  });
}
//# sourceMappingURL=query-pagination-arrow-controls.js.map