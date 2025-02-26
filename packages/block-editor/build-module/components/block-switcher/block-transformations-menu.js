/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MenuGroup, MenuItem } from '@wordpress/components';
import { getBlockMenuDefaultClassName, switchToBlockType } from '@wordpress/blocks';
import { useState, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import PreviewBlockPopover from './preview-block-popover';
import BlockVariationTransformations from './block-variation-transformations';

/**
 * Helper hook to group transformations to display them in a specific order in the UI.
 * For now we group only priority content driven transformations(ex. paragraph -> heading).
 *
 * Later on we could also group 'layout' transformations(ex. paragraph -> group) and
 * display them in different sections.
 *
 * @param {Object[]} possibleBlockTransformations The available block transformations.
 * @return {Record<string, Object[]>} The grouped block transformations.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function useGroupedTransforms(possibleBlockTransformations) {
  const priorityContentTranformationBlocks = {
    'core/paragraph': 1,
    'core/heading': 2,
    'core/list': 3,
    'core/quote': 4
  };
  const transformations = useMemo(() => {
    const priorityTextTranformsNames = Object.keys(priorityContentTranformationBlocks);
    const groupedPossibleTransforms = possibleBlockTransformations.reduce((accumulator, item) => {
      const {
        name
      } = item;
      if (priorityTextTranformsNames.includes(name)) {
        accumulator.priorityTextTransformations.push(item);
      } else {
        accumulator.restTransformations.push(item);
      }
      return accumulator;
    }, {
      priorityTextTransformations: [],
      restTransformations: []
    });
    /**
     * If there is only one priority text transformation and it's a Quote,
     * is should move to the rest transformations. This is because Quote can
     * be a container for any block type, so in multi-block selection it will
     * always be suggested, even for non-text blocks.
     */
    if (groupedPossibleTransforms.priorityTextTransformations.length === 1 && groupedPossibleTransforms.priorityTextTransformations[0].name === 'core/quote') {
      const singleQuote = groupedPossibleTransforms.priorityTextTransformations.pop();
      groupedPossibleTransforms.restTransformations.push(singleQuote);
    }
    return groupedPossibleTransforms;
  }, [possibleBlockTransformations]);

  // Order the priority text transformations.
  transformations.priorityTextTransformations.sort(({
    name: currentName
  }, {
    name: nextName
  }) => {
    return priorityContentTranformationBlocks[currentName] < priorityContentTranformationBlocks[nextName] ? -1 : 1;
  });
  return transformations;
}
const BlockTransformationsMenu = ({
  className,
  possibleBlockTransformations,
  possibleBlockVariationTransformations,
  onSelect,
  onSelectVariation,
  blocks
}) => {
  const [hoveredTransformItemName, setHoveredTransformItemName] = useState();
  const {
    priorityTextTransformations,
    restTransformations
  } = useGroupedTransforms(possibleBlockTransformations);
  // We have to check if both content transformations(priority and rest) are set
  // in order to create a separate MenuGroup for them.
  const hasBothContentTransformations = priorityTextTransformations.length && restTransformations.length;
  const restTransformItems = !!restTransformations.length && /*#__PURE__*/_jsx(RestTransformationItems, {
    restTransformations: restTransformations,
    onSelect: onSelect,
    setHoveredTransformItemName: setHoveredTransformItemName
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(MenuGroup, {
      label: __('Transform to'),
      className: className,
      children: [hoveredTransformItemName && /*#__PURE__*/_jsx(PreviewBlockPopover, {
        blocks: switchToBlockType(blocks, hoveredTransformItemName)
      }), !!possibleBlockVariationTransformations?.length && /*#__PURE__*/_jsx(BlockVariationTransformations, {
        transformations: possibleBlockVariationTransformations,
        blocks: blocks,
        onSelect: onSelectVariation
      }), priorityTextTransformations.map(item => /*#__PURE__*/_jsx(BlockTranformationItem, {
        item: item,
        onSelect: onSelect,
        setHoveredTransformItemName: setHoveredTransformItemName
      }, item.name)), !hasBothContentTransformations && restTransformItems]
    }), !!hasBothContentTransformations && /*#__PURE__*/_jsx(MenuGroup, {
      className: className,
      children: restTransformItems
    })]
  });
};
function RestTransformationItems({
  restTransformations,
  onSelect,
  setHoveredTransformItemName
}) {
  return restTransformations.map(item => /*#__PURE__*/_jsx(BlockTranformationItem, {
    item: item,
    onSelect: onSelect,
    setHoveredTransformItemName: setHoveredTransformItemName
  }, item.name));
}
function BlockTranformationItem({
  item,
  onSelect,
  setHoveredTransformItemName
}) {
  const {
    name,
    icon,
    title,
    isDisabled
  } = item;
  return /*#__PURE__*/_jsxs(MenuItem, {
    className: getBlockMenuDefaultClassName(name),
    onClick: event => {
      event.preventDefault();
      onSelect(name);
    },
    disabled: isDisabled,
    onMouseLeave: () => setHoveredTransformItemName(null),
    onMouseEnter: () => setHoveredTransformItemName(name),
    children: [/*#__PURE__*/_jsx(BlockIcon, {
      icon: icon,
      showColors: true
    }), title]
  });
}
export default BlockTransformationsMenu;
//# sourceMappingURL=block-transformations-menu.js.map