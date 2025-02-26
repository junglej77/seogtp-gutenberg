/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { layout } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockVariationPicker({
  icon = layout,
  label = __('Choose variation'),
  instructions = __('Select a variation to start with:'),
  variations,
  onSelect,
  allowSkip
}) {
  const classes = clsx('block-editor-block-variation-picker', {
    'has-many-variations': variations.length > 4
  });
  return /*#__PURE__*/_jsxs(Placeholder, {
    icon: icon,
    label: label,
    instructions: instructions,
    className: classes,
    children: [/*#__PURE__*/_jsx("ul", {
      className: "block-editor-block-variation-picker__variations",
      role: "list",
      "aria-label": __('Block variations'),
      children: variations.map(variation => /*#__PURE__*/_jsxs("li", {
        children: [/*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "tertiary",
          icon: variation.icon && variation.icon.src ? variation.icon.src : variation.icon,
          iconSize: 48,
          onClick: () => onSelect(variation),
          className: "block-editor-block-variation-picker__variation",
          label: variation.description || variation.title
        }), /*#__PURE__*/_jsx("span", {
          className: "block-editor-block-variation-picker__variation-label",
          children: variation.title
        })]
      }, variation.name))
    }), allowSkip && /*#__PURE__*/_jsx("div", {
      className: "block-editor-block-variation-picker__skip",
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "link",
        onClick: () => onSelect(),
        children: __('Skip')
      })
    })]
  });
}
export default BlockVariationPicker;
//# sourceMappingURL=index.js.map