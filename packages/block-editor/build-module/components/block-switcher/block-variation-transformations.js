/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { getBlockMenuDefaultClassName, cloneBlock, store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useState, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import BlockIcon from '../block-icon';
import PreviewBlockPopover from './preview-block-popover';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_OBJECT = {};
export function useBlockVariationTransforms({
  clientIds,
  blocks
}) {
  const {
    activeBlockVariation,
    blockVariationTransformations
  } = useSelect(select => {
    const {
      getBlockAttributes,
      canRemoveBlocks
    } = select(blockEditorStore);
    const {
      getActiveBlockVariation,
      getBlockVariations
    } = select(blocksStore);
    const canRemove = canRemoveBlocks(clientIds);
    // Only handle single selected blocks for now.
    if (blocks.length !== 1 || !canRemove) {
      return EMPTY_OBJECT;
    }
    const [firstBlock] = blocks;
    return {
      blockVariationTransformations: getBlockVariations(firstBlock.name, 'transform'),
      activeBlockVariation: getActiveBlockVariation(firstBlock.name, getBlockAttributes(firstBlock.clientId))
    };
  }, [clientIds, blocks]);
  const transformations = useMemo(() => {
    return blockVariationTransformations?.filter(({
      name
    }) => name !== activeBlockVariation?.name);
  }, [blockVariationTransformations, activeBlockVariation]);
  return transformations;
}
const BlockVariationTransformations = ({
  transformations,
  onSelect,
  blocks
}) => {
  const [hoveredTransformItemName, setHoveredTransformItemName] = useState();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [hoveredTransformItemName && /*#__PURE__*/_jsx(PreviewBlockPopover, {
      blocks: cloneBlock(blocks[0], transformations.find(({
        name
      }) => name === hoveredTransformItemName).attributes)
    }), transformations?.map(item => /*#__PURE__*/_jsx(BlockVariationTranformationItem, {
      item: item,
      onSelect: onSelect,
      setHoveredTransformItemName: setHoveredTransformItemName
    }, item.name))]
  });
};
function BlockVariationTranformationItem({
  item,
  onSelect,
  setHoveredTransformItemName
}) {
  const {
    name,
    icon,
    title
  } = item;
  return /*#__PURE__*/_jsxs(MenuItem, {
    className: getBlockMenuDefaultClassName(name),
    onClick: event => {
      event.preventDefault();
      onSelect(name);
    },
    onMouseLeave: () => setHoveredTransformItemName(null),
    onMouseEnter: () => setHoveredTransformItemName(name),
    children: [/*#__PURE__*/_jsx(BlockIcon, {
      icon: icon,
      showColors: true
    }), title]
  });
}
export default BlockVariationTransformations;
//# sourceMappingURL=block-variation-transformations.js.map