/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { BlockControls, PlainText, useBlockProps } from '@wordpress/block-editor';
import { ToolbarButton, Disabled, ToolbarGroup, VisuallyHidden } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Preview from './preview';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function HTMLEdit({
  attributes,
  setAttributes,
  isSelected
}) {
  const [isPreview, setIsPreview] = useState();
  const isDisabled = useContext(Disabled.Context);
  const instanceId = useInstanceId(HTMLEdit, 'html-edit-desc');
  function switchToPreview() {
    setIsPreview(true);
  }
  function switchToHTML() {
    setIsPreview(false);
  }
  const blockProps = useBlockProps({
    className: 'block-library-html__edit',
    'aria-describedby': isPreview ? instanceId : undefined
  });
  return /*#__PURE__*/_jsxs("div", {
    ...blockProps,
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsxs(ToolbarGroup, {
        children: [/*#__PURE__*/_jsx(ToolbarButton, {
          isPressed: !isPreview,
          onClick: switchToHTML,
          children: "HTML"
        }), /*#__PURE__*/_jsx(ToolbarButton, {
          isPressed: isPreview,
          onClick: switchToPreview,
          children: __('Preview')
        })]
      })
    }), isPreview || isDisabled ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Preview, {
        content: attributes.content,
        isSelected: isSelected
      }), /*#__PURE__*/_jsx(VisuallyHidden, {
        id: instanceId,
        children: __('HTML preview is not yet fully accessible. Please switch screen reader to virtualized mode to navigate the below iFrame.')
      })]
    }) : /*#__PURE__*/_jsx(PlainText, {
      value: attributes.content,
      onChange: content => setAttributes({
        content
      }),
      placeholder: __('Write HTML…'),
      "aria-label": __('HTML')
    })]
  });
}
//# sourceMappingURL=edit.js.map