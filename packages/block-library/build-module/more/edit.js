/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ENTER } from '@wordpress/keycodes';
import { getDefaultBlockName, createBlock } from '@wordpress/blocks';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_TEXT = __('Read more');
export default function MoreEdit({
  attributes: {
    customText,
    noTeaser
  },
  insertBlocksAfter,
  setAttributes
}) {
  const onChangeInput = event => {
    setAttributes({
      customText: event.target.value
    });
  };
  const onKeyDown = ({
    keyCode
  }) => {
    if (keyCode === ENTER) {
      insertBlocksAfter([createBlock(getDefaultBlockName())]);
    }
  };
  const getHideExcerptHelp = checked => checked ? __('The excerpt is hidden.') : __('The excerpt is visible.');
  const toggleHideExcerpt = () => setAttributes({
    noTeaser: !noTeaser
  });
  const style = {
    width: `${(customText ? customText : DEFAULT_TEXT).length + 1.2}em`
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        children: /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Hide the excerpt on the full content page'),
          checked: !!noTeaser,
          onChange: toggleHideExcerpt,
          help: getHideExcerptHelp
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      ...useBlockProps(),
      children: /*#__PURE__*/_jsx("input", {
        "aria-label": __('“Read more” link text'),
        type: "text",
        value: customText,
        placeholder: DEFAULT_TEXT,
        onChange: onChangeInput,
        onKeyDown: onKeyDown,
        style: style
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map