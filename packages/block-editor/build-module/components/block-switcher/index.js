/**
 * WordPress dependencies
 */
import { __, _n, sprintf, _x } from '@wordpress/i18n';
import { DropdownMenu, ToolbarButton, ToolbarGroup, ToolbarItem, __experimentalText as Text, MenuGroup } from '@wordpress/components';
import { switchToBlockType, store as blocksStore, isReusableBlock, isTemplatePart } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { copy } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import BlockIcon from '../block-icon';
import BlockTransformationsMenu from './block-transformations-menu';
import { useBlockVariationTransforms } from './block-variation-transformations';
import BlockStylesMenu from './block-styles-menu';
import PatternTransformationsMenu from './pattern-transformations-menu';
import useBlockDisplayTitle from '../block-title/use-block-display-title';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function BlockSwitcherDropdownMenuContents({
  onClose,
  clientIds,
  hasBlockStyles,
  canRemove,
  isUsingBindings
}) {
  const {
    replaceBlocks,
    multiSelect,
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  const {
    possibleBlockTransformations,
    patterns,
    blocks
  } = useSelect(select => {
    const {
      getBlocksByClientId,
      getBlockRootClientId,
      getBlockTransformItems,
      __experimentalGetPatternTransformItems
    } = select(blockEditorStore);
    const rootClientId = getBlockRootClientId(Array.isArray(clientIds) ? clientIds[0] : clientIds);
    const _blocks = getBlocksByClientId(clientIds);
    return {
      blocks: _blocks,
      possibleBlockTransformations: getBlockTransformItems(_blocks, rootClientId),
      patterns: __experimentalGetPatternTransformItems(_blocks, rootClientId)
    };
  }, [clientIds]);
  const blockVariationTransformations = useBlockVariationTransforms({
    clientIds,
    blocks
  });
  function selectForMultipleBlocks(insertedBlocks) {
    if (insertedBlocks.length > 1) {
      multiSelect(insertedBlocks[0].clientId, insertedBlocks[insertedBlocks.length - 1].clientId);
    }
  }
  // Simple block tranformation based on the `Block Transforms` API.
  function onBlockTransform(name) {
    const newBlocks = switchToBlockType(blocks, name);
    replaceBlocks(clientIds, newBlocks);
    selectForMultipleBlocks(newBlocks);
  }
  function onBlockVariationTransform(name) {
    updateBlockAttributes(blocks[0].clientId, {
      ...blockVariationTransformations.find(({
        name: variationName
      }) => variationName === name).attributes
    });
  }
  // Pattern transformation through the `Patterns` API.
  function onPatternTransform(transformedBlocks) {
    replaceBlocks(clientIds, transformedBlocks);
    selectForMultipleBlocks(transformedBlocks);
  }
  /**
   * The `isTemplate` check is a stopgap solution here.
   * Ideally, the Transforms API should handle this
   * by allowing to exclude blocks from wildcard transformations.
   */
  const isSingleBlock = blocks.length === 1;
  const isTemplate = isSingleBlock && isTemplatePart(blocks[0]);
  const hasPossibleBlockTransformations = !!possibleBlockTransformations.length && canRemove && !isTemplate;
  const hasPossibleBlockVariationTransformations = !!blockVariationTransformations?.length;
  const hasPatternTransformation = !!patterns?.length && canRemove;
  const hasBlockOrBlockVariationTransforms = hasPossibleBlockTransformations || hasPossibleBlockVariationTransformations;
  const hasContents = hasBlockStyles || hasBlockOrBlockVariationTransforms || hasPatternTransformation;
  if (!hasContents) {
    return /*#__PURE__*/_jsx("p", {
      className: "block-editor-block-switcher__no-transforms",
      children: __('No transforms.')
    });
  }
  const connectedBlockDescription = isSingleBlock ? _x('This block is connected.', 'block toolbar button label and description') : _x('These blocks are connected.', 'block toolbar button label and description');
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-switcher__container",
    children: [hasPatternTransformation && /*#__PURE__*/_jsx(PatternTransformationsMenu, {
      blocks: blocks,
      patterns: patterns,
      onSelect: transformedBlocks => {
        onPatternTransform(transformedBlocks);
        onClose();
      }
    }), hasBlockOrBlockVariationTransforms && /*#__PURE__*/_jsx(BlockTransformationsMenu, {
      className: "block-editor-block-switcher__transforms__menugroup",
      possibleBlockTransformations: possibleBlockTransformations,
      possibleBlockVariationTransformations: blockVariationTransformations,
      blocks: blocks,
      onSelect: name => {
        onBlockTransform(name);
        onClose();
      },
      onSelectVariation: name => {
        onBlockVariationTransform(name);
        onClose();
      }
    }), hasBlockStyles && /*#__PURE__*/_jsx(BlockStylesMenu, {
      hoveredBlock: blocks[0],
      onSwitch: onClose
    }), isUsingBindings && /*#__PURE__*/_jsx(MenuGroup, {
      children: /*#__PURE__*/_jsx(Text, {
        className: "block-editor-block-switcher__binding-indicator",
        children: connectedBlockDescription
      })
    })]
  });
}
const BlockIndicator = ({
  icon,
  showTitle,
  blockTitle
}) => /*#__PURE__*/_jsxs(_Fragment, {
  children: [/*#__PURE__*/_jsx(BlockIcon, {
    className: "block-editor-block-switcher__toggle",
    icon: icon,
    showColors: true
  }), showTitle && blockTitle && /*#__PURE__*/_jsx("span", {
    className: "block-editor-block-switcher__toggle-text",
    children: blockTitle
  })]
});
export const BlockSwitcher = ({
  clientIds,
  disabled,
  isUsingBindings
}) => {
  const {
    hasContentOnlyLocking,
    canRemove,
    hasBlockStyles,
    icon,
    invalidBlocks,
    isReusable,
    isTemplate
  } = useSelect(select => {
    const {
      getTemplateLock,
      getBlocksByClientId,
      getBlockAttributes,
      canRemoveBlocks
    } = select(blockEditorStore);
    const {
      getBlockStyles,
      getBlockType,
      getActiveBlockVariation
    } = select(blocksStore);
    const _blocks = getBlocksByClientId(clientIds);
    if (!_blocks.length || _blocks.some(block => !block)) {
      return {
        invalidBlocks: true
      };
    }
    const [{
      name: firstBlockName
    }] = _blocks;
    const _isSingleBlockSelected = _blocks.length === 1;
    const blockType = getBlockType(firstBlockName);
    let _icon;
    let _hasTemplateLock;
    if (_isSingleBlockSelected) {
      const match = getActiveBlockVariation(firstBlockName, getBlockAttributes(clientIds[0]));
      // Take into account active block variations.
      _icon = match?.icon || blockType.icon;
      _hasTemplateLock = getTemplateLock(clientIds[0]) === 'contentOnly';
    } else {
      const isSelectionOfSameType = new Set(_blocks.map(({
        name
      }) => name)).size === 1;
      _hasTemplateLock = clientIds.some(id => getTemplateLock(id) === 'contentOnly');
      // When selection consists of blocks of multiple types, display an
      // appropriate icon to communicate the non-uniformity.
      _icon = isSelectionOfSameType ? blockType.icon : copy;
    }
    return {
      canRemove: canRemoveBlocks(clientIds),
      hasBlockStyles: _isSingleBlockSelected && !!getBlockStyles(firstBlockName)?.length,
      icon: _icon,
      isReusable: _isSingleBlockSelected && isReusableBlock(_blocks[0]),
      isTemplate: _isSingleBlockSelected && isTemplatePart(_blocks[0]),
      hasContentOnlyLocking: _hasTemplateLock
    };
  }, [clientIds]);
  const blockTitle = useBlockDisplayTitle({
    clientId: clientIds?.[0],
    maximumLength: 35
  });
  if (invalidBlocks) {
    return null;
  }
  const isSingleBlock = clientIds.length === 1;
  const blockSwitcherLabel = isSingleBlock ? blockTitle : __('Multiple blocks selected');
  const hideDropdown = disabled || !hasBlockStyles && !canRemove || hasContentOnlyLocking;
  if (hideDropdown) {
    return /*#__PURE__*/_jsx(ToolbarGroup, {
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        disabled: true,
        className: "block-editor-block-switcher__no-switcher-icon",
        title: blockSwitcherLabel,
        icon: /*#__PURE__*/_jsx(BlockIndicator, {
          icon: icon,
          showTitle: isReusable || isTemplate,
          blockTitle: blockTitle
        })
      })
    });
  }
  const blockSwitcherDescription = isSingleBlock ? __('Change block type or style') : sprintf( /* translators: %d: number of blocks. */
  _n('Change type of %d block', 'Change type of %d blocks', clientIds.length), clientIds.length);
  return /*#__PURE__*/_jsx(ToolbarGroup, {
    children: /*#__PURE__*/_jsx(ToolbarItem, {
      children: toggleProps => /*#__PURE__*/_jsx(DropdownMenu, {
        className: "block-editor-block-switcher",
        label: blockSwitcherLabel,
        popoverProps: {
          placement: 'bottom-start',
          className: 'block-editor-block-switcher__popover'
        },
        icon: /*#__PURE__*/_jsx(BlockIndicator, {
          icon: icon,
          showTitle: isReusable || isTemplate,
          blockTitle: blockTitle
        }),
        toggleProps: {
          description: blockSwitcherDescription,
          ...toggleProps
        },
        menuProps: {
          orientation: 'both'
        },
        children: ({
          onClose
        }) => /*#__PURE__*/_jsx(BlockSwitcherDropdownMenuContents, {
          onClose: onClose,
          clientIds: clientIds,
          hasBlockStyles: hasBlockStyles,
          canRemove: canRemove,
          isUsingBindings: isUsingBindings
        })
      })
    })
  });
};
export default BlockSwitcher;
//# sourceMappingURL=index.js.map