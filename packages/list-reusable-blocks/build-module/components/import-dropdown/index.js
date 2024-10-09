/**
 * WordPress dependencies
 */
import { pipe } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Dropdown, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ImportForm from '../import-form';
import { jsx as _jsx } from "react/jsx-runtime";
function ImportDropdown({
  onUpload
}) {
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: {
      placement: 'bottom-start'
    },
    contentClassName: "list-reusable-blocks-import-dropdown__content",
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      "aria-expanded": isOpen,
      onClick: onToggle,
      variant: "primary",
      children: __('Import from JSON')
    }),
    renderContent: ({
      onClose
    }) => /*#__PURE__*/_jsx(ImportForm, {
      onUpload: pipe(onClose, onUpload)
    })
  });
}
export default ImportDropdown;
//# sourceMappingURL=index.js.map