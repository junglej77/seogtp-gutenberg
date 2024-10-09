/**
 * WordPress dependencies
 */
import { BlockPreview } from '@wordpress/block-editor';
import { getBlockType, getBlockFromExample } from '@wordpress/blocks';
import { __experimentalSpacer as Spacer } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getVariationClassName } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
const BlockPreviewPanel = ({
  name,
  variation = ''
}) => {
  var _blockExample$viewpor;
  const blockExample = getBlockType(name)?.example;
  const blocks = useMemo(() => {
    if (!blockExample) {
      return null;
    }
    let example = blockExample;
    if (variation) {
      example = {
        ...example,
        attributes: {
          ...example.attributes,
          className: getVariationClassName(variation)
        }
      };
    }
    return getBlockFromExample(name, example);
  }, [name, blockExample, variation]);
  const viewportWidth = (_blockExample$viewpor = blockExample?.viewportWidth) !== null && _blockExample$viewpor !== void 0 ? _blockExample$viewpor : 500;
  // Same as height of InserterPreviewPanel.
  const previewHeight = 144;
  const sidebarWidth = 235;
  const scale = sidebarWidth / viewportWidth;
  const minHeight = scale !== 0 && scale < 1 && previewHeight ? previewHeight / scale : previewHeight;
  if (!blockExample) {
    return null;
  }
  return /*#__PURE__*/_jsx(Spacer, {
    marginX: 4,
    marginBottom: 4,
    children: /*#__PURE__*/_jsx("div", {
      className: "edit-site-global-styles__block-preview-panel",
      style: {
        maxHeight: previewHeight,
        boxSizing: 'initial'
      },
      children: /*#__PURE__*/_jsx(BlockPreview, {
        blocks: blocks,
        viewportWidth: viewportWidth,
        minHeight: previewHeight,
        additionalStyles:
        //We want this CSS to be in sync with the one in InserterPreviewPanel.
        [{
          css: `
								body{
									padding: 24px;
									min-height:${Math.round(minHeight)}px;
									display:flex;
									align-items:center;
								}
								.is-root-container { width: 100%; }
							`
        }]
      })
    })
  });
};
export default BlockPreviewPanel;
//# sourceMappingURL=block-preview-panel.js.map