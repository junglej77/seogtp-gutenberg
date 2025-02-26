/**
 * WordPress dependencies
 */
import { getActiveFormat, getActiveObject } from '@wordpress/rich-text';
import { jsx as _jsx } from "react/jsx-runtime";
export default function FormatEdit({
  formatTypes,
  onChange,
  onFocus,
  value,
  forwardedRef
}) {
  return formatTypes.map(settings => {
    const {
      name,
      edit: Edit
    } = settings;
    if (!Edit) {
      return null;
    }
    const activeFormat = getActiveFormat(value, name);
    const isActive = activeFormat !== undefined;
    const activeObject = getActiveObject(value);
    const isObjectActive = activeObject !== undefined && activeObject.type === name;
    return /*#__PURE__*/_jsx(Edit, {
      isActive: isActive,
      activeAttributes: isActive ? activeFormat.attributes || {} : {},
      isObjectActive: isObjectActive,
      activeObjectAttributes: isObjectActive ? activeObject.attributes || {} : {},
      value: value,
      onChange: onChange,
      onFocus: onFocus,
      contentRef: forwardedRef
    }, name);
  });
}
//# sourceMappingURL=format-edit.js.map