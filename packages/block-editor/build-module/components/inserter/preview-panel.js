/**
 * WordPress dependencies
 */
import { isReusableBlock, createBlock, getBlockFromExample } from '@wordpress/blocks';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockCard from '../block-card';
import BlockPreview from '../block-preview';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function InserterPreviewPanel({
  item
}) {
  var _example$viewportWidt;
  const {
    name,
    title,
    icon,
    description,
    initialAttributes,
    example
  } = item;
  const isReusable = isReusableBlock(item);
  const blocks = useMemo(() => {
    if (!example) {
      return createBlock(name, initialAttributes);
    }
    return getBlockFromExample(name, {
      attributes: {
        ...example.attributes,
        ...initialAttributes
      },
      innerBlocks: example.innerBlocks
    });
  }, [name, example, initialAttributes]);
  // Same as height of BlockPreviewPanel.
  const previewHeight = 144;
  const sidebarWidth = 280;
  const viewportWidth = (_example$viewportWidt = example?.viewportWidth) !== null && _example$viewportWidt !== void 0 ? _example$viewportWidt : 500;
  const scale = sidebarWidth / viewportWidth;
  const minHeight = scale !== 0 && scale < 1 && previewHeight ? previewHeight / scale : previewHeight;
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-inserter__preview-container",
    children: [/*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__preview",
      children: isReusable || example ? /*#__PURE__*/_jsx("div", {
        className: "block-editor-inserter__preview-content",
        children: /*#__PURE__*/_jsx(BlockPreview, {
          blocks: blocks,
          viewportWidth: viewportWidth,
          minHeight: previewHeight,
          additionalStyles:
          //We want this CSS to be in sync with the one in BlockPreviewPanel.
          [{
            css: `
										body { 
											padding: 24px;
											min-height:${Math.round(minHeight)}px;
											display:flex;
											align-items:center;
										}
										.is-root-container { width: 100%; }
									`
          }]
        })
      }) : /*#__PURE__*/_jsx("div", {
        className: "block-editor-inserter__preview-content-missing",
        children: __('No preview available.')
      })
    }), !isReusable && /*#__PURE__*/_jsx(BlockCard, {
      title: title,
      icon: icon,
      description: description
    })]
  });
}
export default InserterPreviewPanel;
//# sourceMappingURL=preview-panel.js.map