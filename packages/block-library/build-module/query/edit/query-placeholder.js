/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate, store as blocksStore } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { useBlockProps, store as blockEditorStore, __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useScopedBlockVariations, useBlockNameForPatterns } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function QueryPlaceholder({
  attributes,
  clientId,
  name,
  openPatternSelectionModal
}) {
  const [isStartingBlank, setIsStartingBlank] = useState(false);
  const blockProps = useBlockProps();
  const blockNameForPatterns = useBlockNameForPatterns(clientId, attributes);
  const {
    blockType,
    activeBlockVariation,
    hasPatterns
  } = useSelect(select => {
    const {
      getActiveBlockVariation,
      getBlockType
    } = select(blocksStore);
    const {
      getBlockRootClientId,
      getPatternsByBlockTypes
    } = select(blockEditorStore);
    const rootClientId = getBlockRootClientId(clientId);
    return {
      blockType: getBlockType(name),
      activeBlockVariation: getActiveBlockVariation(name, attributes),
      hasPatterns: !!getPatternsByBlockTypes(blockNameForPatterns, rootClientId).length
    };
  }, [name, blockNameForPatterns, clientId, attributes]);
  const icon = activeBlockVariation?.icon?.src || activeBlockVariation?.icon || blockType?.icon?.src;
  const label = activeBlockVariation?.title || blockType?.title;
  if (isStartingBlank) {
    return /*#__PURE__*/_jsx(QueryVariationPicker, {
      clientId: clientId,
      attributes: attributes,
      icon: icon,
      label: label
    });
  }
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsxs(Placeholder, {
      icon: icon,
      label: label,
      instructions: __('Choose a pattern for the query loop or start blank.'),
      children: [!!hasPatterns && /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "primary",
        onClick: openPatternSelectionModal,
        children: __('Choose')
      }), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "secondary",
        onClick: () => {
          setIsStartingBlank(true);
        },
        children: __('Start blank')
      })]
    })
  });
}
function QueryVariationPicker({
  clientId,
  attributes,
  icon,
  label
}) {
  const scopeVariations = useScopedBlockVariations(attributes);
  const {
    replaceInnerBlocks
  } = useDispatch(blockEditorStore);
  const blockProps = useBlockProps();
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsx(__experimentalBlockVariationPicker, {
      icon: icon,
      label: label,
      variations: scopeVariations,
      onSelect: variation => {
        if (variation.innerBlocks) {
          replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(variation.innerBlocks), false);
        }
      }
    })
  });
}
//# sourceMappingURL=query-placeholder.js.map