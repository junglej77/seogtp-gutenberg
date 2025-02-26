/**
 * WordPress dependencies
 */
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export const PagesControl = ({
  pages,
  onChange
}) => {
  return /*#__PURE__*/_jsx(NumberControl, {
    __next40pxDefaultSize: true,
    label: __('Max pages'),
    value: pages,
    min: 0,
    onChange: newPages => {
      if (isNaN(newPages) || newPages < 0) {
        return;
      }
      onChange({
        pages: newPages
      });
    },
    help: __('Limit the pages you want to show, even if the query has more results. To show all pages use 0 (zero).')
  });
};
export default PagesControl;
//# sourceMappingURL=pages-control.js.map