/**
 * External dependencies
 */
import clsx from 'clsx';
import removeAccents from 'remove-accents';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, __experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles, __experimentalGetColorClassesAndStyles as getColorClassesAndStyles } from '@wordpress/block-editor';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';

/**
 * Get the name attribute from a content string.
 *
 * @param {string} content The block content.
 *
 * @return {string} Returns the slug.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const getNameFromLabel = content => {
  return removeAccents(stripHTML(content))
  // Convert anything that's not a letter or number to a hyphen.
  .replace(/[^\p{L}\p{N}]+/gu, '-')
  // Convert to lowercase
  .toLowerCase()
  // Remove any remaining leading or trailing hyphens.
  .replace(/(^-+)|(-+$)/g, '');
};
export default function save({
  attributes
}) {
  const {
    type,
    name,
    label,
    inlineLabel,
    required,
    placeholder,
    value
  } = attributes;
  const borderProps = getBorderClassesAndStyles(attributes);
  const colorProps = getColorClassesAndStyles(attributes);
  const inputStyle = {
    ...borderProps.style,
    ...colorProps.style
  };
  const inputClasses = clsx('wp-block-form-input__input', colorProps.className, borderProps.className);
  const TagName = type === 'textarea' ? 'textarea' : 'input';
  const blockProps = useBlockProps.save();
  if ('hidden' === type) {
    return /*#__PURE__*/_jsx("input", {
      type: type,
      name: name,
      value: value
    });
  }
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsxs("label", {
      className: clsx('wp-block-form-input__label', {
        'is-label-inline': inlineLabel
      }),
      children: [/*#__PURE__*/_jsx("span", {
        className: "wp-block-form-input__label-content",
        children: /*#__PURE__*/_jsx(RichText.Content, {
          value: label
        })
      }), /*#__PURE__*/_jsx(TagName, {
        className: inputClasses,
        type: 'textarea' === type ? undefined : type,
        name: name || getNameFromLabel(label),
        required: required,
        "aria-required": required,
        placeholder: placeholder || undefined,
        style: inputStyle
      })]
    })
  });
}
//# sourceMappingURL=save.js.map