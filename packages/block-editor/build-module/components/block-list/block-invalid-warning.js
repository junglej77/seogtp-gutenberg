/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { useState, useCallback, useMemo } from '@wordpress/element';
import { createBlock, rawHandler } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Warning from '../warning';
import BlockCompare from '../block-compare';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const blockToBlocks = block => rawHandler({
  HTML: block.originalContent
});
export default function BlockInvalidWarning({
  clientId
}) {
  const {
    block,
    canInsertHTMLBlock,
    canInsertClassicBlock
  } = useSelect(select => {
    const {
      canInsertBlockType,
      getBlock,
      getBlockRootClientId
    } = select(blockEditorStore);
    const rootClientId = getBlockRootClientId(clientId);
    return {
      block: getBlock(clientId),
      canInsertHTMLBlock: canInsertBlockType('core/html', rootClientId),
      canInsertClassicBlock: canInsertBlockType('core/freeform', rootClientId)
    };
  }, [clientId]);
  const {
    replaceBlock
  } = useDispatch(blockEditorStore);
  const [compare, setCompare] = useState(false);
  const onCompareClose = useCallback(() => setCompare(false), []);
  const convert = useMemo(() => ({
    toClassic() {
      const classicBlock = createBlock('core/freeform', {
        content: block.originalContent
      });
      return replaceBlock(block.clientId, classicBlock);
    },
    toHTML() {
      const htmlBlock = createBlock('core/html', {
        content: block.originalContent
      });
      return replaceBlock(block.clientId, htmlBlock);
    },
    toBlocks() {
      const newBlocks = blockToBlocks(block);
      return replaceBlock(block.clientId, newBlocks);
    },
    toRecoveredBlock() {
      const recoveredBlock = createBlock(block.name, block.attributes, block.innerBlocks);
      return replaceBlock(block.clientId, recoveredBlock);
    }
  }), [block, replaceBlock]);
  const secondaryActions = useMemo(() => [{
    // translators: Button to fix block content
    title: _x('Resolve', 'imperative verb'),
    onClick: () => setCompare(true)
  }, canInsertHTMLBlock && {
    title: __('Convert to HTML'),
    onClick: convert.toHTML
  }, canInsertClassicBlock && {
    title: __('Convert to Classic Block'),
    onClick: convert.toClassic
  }].filter(Boolean), [canInsertHTMLBlock, canInsertClassicBlock, convert]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Warning, {
      actions: [/*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        onClick: convert.toRecoveredBlock,
        variant: "primary",
        children: __('Attempt recovery')
      }, "recover")],
      secondaryActions: secondaryActions,
      children: __('Block contains unexpected or invalid content.')
    }), compare && /*#__PURE__*/_jsx(Modal, {
      title:
      // translators: Dialog title to fix block content
      __('Resolve Block'),
      onRequestClose: onCompareClose,
      className: "block-editor-block-compare",
      children: /*#__PURE__*/_jsx(BlockCompare, {
        block: block,
        onKeep: convert.toHTML,
        onConvert: convert.toBlocks,
        convertor: blockToBlocks,
        convertButtonText: __('Convert to Blocks')
      })
    })]
  });
}
//# sourceMappingURL=block-invalid-warning.js.map