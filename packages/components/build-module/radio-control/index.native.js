/**
 * Internal dependencies
 */
import RadioCell from '../mobile/bottom-sheet/radio-cell';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function RadioControl({
  onChange,
  selected,
  options = [],
  ...props
}) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: options.map((option, index) => {
      return /*#__PURE__*/_jsx(RadioCell, {
        label: option.label,
        onPress: () => onChange(option.value),
        selected: option.value === selected,
        ...props
      }, `${option.value}-${index}`);
    })
  });
}
export default RadioControl;
//# sourceMappingURL=index.native.js.map