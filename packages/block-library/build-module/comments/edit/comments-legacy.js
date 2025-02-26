/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, Warning, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Placeholder from './placeholder';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function CommentsLegacy({
  attributes,
  setAttributes,
  context: {
    postType,
    postId
  }
}) {
  const {
    textAlign
  } = attributes;
  const actions = [/*#__PURE__*/_jsx(Button, {
    __next40pxDefaultSize: true,
    onClick: () => void setAttributes({
      legacy: false
    }),
    variant: "primary",
    children: __('Switch to editable mode')
  }, "convert")];
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
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
    }), /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [/*#__PURE__*/_jsx(Warning, {
        actions: actions,
        children: __('Comments block: You’re currently using the legacy version of the block. ' + 'The following is just a placeholder - the final styling will likely look different. ' + 'For a better representation and more customization options, ' + 'switch the block to its editable mode.')
      }), /*#__PURE__*/_jsx(Placeholder, {
        postId: postId,
        postType: postType
      })]
    })]
  });
}
//# sourceMappingURL=comments-legacy.js.map