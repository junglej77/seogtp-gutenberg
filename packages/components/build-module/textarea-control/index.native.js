/**
 * External dependencies
 */
import { TextInput } from 'react-native';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';
import { jsx as _jsx } from "react/jsx-runtime";
function TextareaControl({
  label,
  value,
  help,
  onChange,
  rows = 4
}) {
  return /*#__PURE__*/_jsx(BaseControl, {
    label: label,
    help: help,
    children: /*#__PURE__*/_jsx(TextInput, {
      style: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1
      },
      value: value,
      onChangeText: onChange,
      numberOfLines: rows,
      multiline: rows > 1,
      textAlignVertical: "top"
    })
  });
}
export default TextareaControl;
//# sourceMappingURL=index.native.js.map