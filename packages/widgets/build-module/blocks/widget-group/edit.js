/**
 * WordPress dependencies
 */
import { useBlockProps, BlockIcon, ButtonBlockAppender, InnerBlocks, store as blockEditorStore, RichText } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { group as groupIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Edit(props) {
  const {
    clientId
  } = props;
  const {
    innerBlocks
  } = useSelect(select => select(blockEditorStore).getBlock(clientId), [clientId]);
  return /*#__PURE__*/_jsx("div", {
    ...useBlockProps({
      className: 'widget'
    }),
    children: innerBlocks.length === 0 ? /*#__PURE__*/_jsx(PlaceholderContent, {
      ...props
    }) : /*#__PURE__*/_jsx(PreviewContent, {
      ...props
    })
  });
}
function PlaceholderContent({
  clientId
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Placeholder, {
      className: "wp-block-widget-group__placeholder",
      icon: /*#__PURE__*/_jsx(BlockIcon, {
        icon: groupIcon
      }),
      label: __('Widget Group'),
      children: /*#__PURE__*/_jsx(ButtonBlockAppender, {
        rootClientId: clientId
      })
    }), /*#__PURE__*/_jsx(InnerBlocks, {
      renderAppender: false
    })]
  });
}
function PreviewContent({
  attributes,
  setAttributes
}) {
  var _attributes$title;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(RichText, {
      tagName: "h2",
      identifier: "title",
      className: "widget-title",
      allowedFormats: [],
      placeholder: __('Title'),
      value: (_attributes$title = attributes.title) !== null && _attributes$title !== void 0 ? _attributes$title : '',
      onChange: title => setAttributes({
        title
      })
    }), /*#__PURE__*/_jsx(InnerBlocks, {})]
  });
}
//# sourceMappingURL=edit.js.map