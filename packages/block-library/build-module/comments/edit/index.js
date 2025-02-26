/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import CommentsInspectorControls from './comments-inspector-controls';
import CommentsLegacy from './comments-legacy';
import TEMPLATE from './template';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function CommentsEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    tagName: TagName,
    legacy
  } = attributes;
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE
  });
  if (legacy) {
    return /*#__PURE__*/_jsx(CommentsLegacy, {
      ...props
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(CommentsInspectorControls, {
      attributes: attributes,
      setAttributes: setAttributes
    }), /*#__PURE__*/_jsx(TagName, {
      ...innerBlocksProps
    })]
  });
}
//# sourceMappingURL=index.js.map