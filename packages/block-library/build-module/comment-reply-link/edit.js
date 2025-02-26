/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { AlignmentControl, BlockControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Renders the `core/comment-reply-link` block on the editor.
 *
 * @param {Object} props                      React props.
 * @param {Object} props.setAttributes        Callback for updating block attributes.
 * @param {Object} props.attributes           Block attributes.
 * @param {string} props.attributes.textAlign The `textAlign` attribute.
 *
 * @return {JSX.Element} React element.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Edit({
  setAttributes,
  attributes: {
    textAlign
  }
}) {
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const blockControls = /*#__PURE__*/_jsx(BlockControls, {
    group: "block",
    children: /*#__PURE__*/_jsx(AlignmentControl, {
      value: textAlign,
      onChange: newAlign => setAttributes({
        textAlign: newAlign
      })
    })
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [blockControls, /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx("a", {
        href: "#comment-reply-pseudo-link",
        onClick: event => event.preventDefault(),
        children: __('Reply')
      })
    })]
  });
}
export default Edit;
//# sourceMappingURL=edit.js.map