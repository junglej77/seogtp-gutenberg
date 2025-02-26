/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TermDescriptionEdit({
  attributes,
  setAttributes,
  mergedStyle
}) {
  const {
    textAlign
  } = attributes;
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    }),
    style: mergedStyle
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx("div", {
        className: "wp-block-term-description__placeholder",
        children: /*#__PURE__*/_jsx("span", {
          children: __('Term Description')
        })
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map