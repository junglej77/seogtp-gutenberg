/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
export default function DataViewsSelectionCheckbox({
  selection,
  onChangeSelection,
  item,
  getItemId,
  primaryField,
  disabled
}) {
  const id = getItemId(item);
  const checked = !disabled && selection.includes(id);
  let selectionLabel;
  if (primaryField?.getValue && item) {
    // eslint-disable-next-line @wordpress/valid-sprintf
    selectionLabel = sprintf( /* translators: %s: item title. */
    checked ? __('Deselect item: %s') : __('Select item: %s'), primaryField.getValue({
      item
    }));
  } else {
    selectionLabel = checked ? __('Select a new item') : __('Deselect item');
  }
  return /*#__PURE__*/_jsx(CheckboxControl, {
    className: "dataviews-selection-checkbox",
    __nextHasNoMarginBottom: true,
    "aria-label": selectionLabel,
    "aria-disabled": disabled,
    checked: checked,
    onChange: () => {
      if (disabled) {
        return;
      }
      onChangeSelection(selection.includes(id) ? selection.filter(itemId => id !== itemId) : [...selection, id]);
    }
  });
}
//# sourceMappingURL=index.js.map