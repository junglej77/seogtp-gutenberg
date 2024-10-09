/**
 * WordPress dependencies
 */
import { BlockIcon } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockTypesChecklist({
  blockTypes,
  value,
  onItemChange
}) {
  return /*#__PURE__*/_jsx("ul", {
    className: "editor-block-manager__checklist",
    children: blockTypes.map(blockType => /*#__PURE__*/_jsxs("li", {
      className: "editor-block-manager__checklist-item",
      children: [/*#__PURE__*/_jsx(CheckboxControl, {
        __nextHasNoMarginBottom: true,
        label: blockType.title,
        checked: value.includes(blockType.name),
        onChange: (...args) => onItemChange(blockType.name, ...args)
      }), /*#__PURE__*/_jsx(BlockIcon, {
        icon: blockType.icon
      })]
    }, blockType.name))
  });
}
export default BlockTypesChecklist;
//# sourceMappingURL=checklist.js.map