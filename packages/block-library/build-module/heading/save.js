/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    textAlign,
    content,
    level
  } = attributes;
  const TagName = 'h' + level;
  const className = clsx({
    [`has-text-align-${textAlign}`]: textAlign
  });
  return /*#__PURE__*/_jsx(TagName, {
    ...useBlockProps.save({
      className
    }),
    children: /*#__PURE__*/_jsx(RichText.Content, {
      value: content
    })
  });
}
//# sourceMappingURL=save.js.map