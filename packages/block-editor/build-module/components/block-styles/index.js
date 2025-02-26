/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { debounce, useViewportMatch } from '@wordpress/compose';
import { Button, __experimentalTruncate as Truncate, Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockStylesPreviewPanel from './preview-panel';
import useStylesForBlocks from './use-styles-for-block';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};

// Block Styles component for the Settings Sidebar.
function BlockStyles({
  clientId,
  onSwitch = noop,
  onHoverClassName = noop
}) {
  const {
    onSelect,
    stylesToRender,
    activeStyle,
    genericPreviewBlock,
    className: previewClassName
  } = useStylesForBlocks({
    clientId,
    onSwitch
  });
  const [hoveredStyle, setHoveredStyle] = useState(null);
  const isMobileViewport = useViewportMatch('medium', '<');
  if (!stylesToRender || stylesToRender.length === 0) {
    return null;
  }
  const debouncedSetHoveredStyle = debounce(setHoveredStyle, 250);
  const onSelectStylePreview = style => {
    onSelect(style);
    onHoverClassName(null);
    setHoveredStyle(null);
    debouncedSetHoveredStyle.cancel();
  };
  const styleItemHandler = item => {
    var _item$name;
    if (hoveredStyle === item) {
      debouncedSetHoveredStyle.cancel();
      return;
    }
    debouncedSetHoveredStyle(item);
    onHoverClassName((_item$name = item?.name) !== null && _item$name !== void 0 ? _item$name : null);
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-styles",
    children: [/*#__PURE__*/_jsx("div", {
      className: "block-editor-block-styles__variants",
      children: stylesToRender.map(style => {
        const buttonText = style.label || style.name;
        return /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          className: clsx('block-editor-block-styles__item', {
            'is-active': activeStyle.name === style.name
          }),
          variant: "secondary",
          label: buttonText,
          onMouseEnter: () => styleItemHandler(style),
          onFocus: () => styleItemHandler(style),
          onMouseLeave: () => styleItemHandler(null),
          onBlur: () => styleItemHandler(null),
          onClick: () => onSelectStylePreview(style),
          "aria-current": activeStyle.name === style.name,
          children: /*#__PURE__*/_jsx(Truncate, {
            numberOfLines: 1,
            className: "block-editor-block-styles__item-text",
            children: buttonText
          })
        }, style.name);
      })
    }), hoveredStyle && !isMobileViewport && /*#__PURE__*/_jsx(Popover, {
      placement: "left-start",
      offset: 34,
      focusOnMount: false,
      children: /*#__PURE__*/_jsx("div", {
        className: "block-editor-block-styles__preview-panel",
        onMouseLeave: () => styleItemHandler(null),
        children: /*#__PURE__*/_jsx(BlockStylesPreviewPanel, {
          activeStyle: activeStyle,
          className: previewClassName,
          genericPreviewBlock: genericPreviewBlock,
          style: hoveredStyle
        })
      })
    })]
  });
}
export default BlockStyles;
//# sourceMappingURL=index.js.map