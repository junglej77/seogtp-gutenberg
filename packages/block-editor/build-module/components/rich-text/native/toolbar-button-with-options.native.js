/**
 * WordPress dependencies
 */
import { Picker, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import { Icon } from '@wordpress/icons';

/**
 * Toolbar button component that, upon a long press, opens a Picker
 * to allow selecting from among multiple options.
 *
 * @param {Object} props         Component props.
 * @param {Object} props.options Options to pick from.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ToolbarButtonWithOptions({
  options
}) {
  const picker = useRef();
  function presentPicker() {
    if (picker.current) {
      picker.current.presentPicker();
    }
  }
  function onValueSelected(selectedValue) {
    const selectedOption = options.find(op => op.value === selectedValue);
    if (selectedOption) {
      selectedOption.onClick();
    }
  }
  if (!options || options.length === 0) {
    return null;
  }
  const firstOption = options[0];
  const enablePicker = options.length > 1;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolbarGroup, {
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        title: firstOption.title,
        icon: /*#__PURE__*/_jsx(Icon, {
          icon: firstOption.icon
        }),
        onClick: firstOption.onClick,
        onLongPress: enablePicker ? presentPicker : undefined
      })
    }), enablePicker && /*#__PURE__*/_jsx(Picker, {
      ref: picker,
      options: options,
      onChange: onValueSelected,
      hideCancelButton: true
    })]
  });
}
export default ToolbarButtonWithOptions;
//# sourceMappingURL=toolbar-button-with-options.native.js.map