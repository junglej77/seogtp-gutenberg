/**
 * WordPress dependencies
 */
import { useId } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { DropdownMenu, ToolbarItem, __experimentalText as Text } from '@wordpress/components';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { copy } from '@wordpress/icons';
import { store as blockEditorStore, BlockIcon, privateApis as blockEditorPrivateApis, BlockControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';
import { PATTERN_OVERRIDES_BINDING_SOURCE } from '../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useBlockDisplayTitle
} = unlock(blockEditorPrivateApis);
function PatternOverridesToolbarIndicator({
  clientIds
}) {
  const isSingleBlockSelected = clientIds.length === 1;
  const {
    icon,
    firstBlockName
  } = useSelect(select => {
    const {
      getBlockAttributes,
      getBlockNamesByClientId
    } = select(blockEditorStore);
    const {
      getBlockType,
      getActiveBlockVariation
    } = select(blocksStore);
    const blockTypeNames = getBlockNamesByClientId(clientIds);
    const _firstBlockTypeName = blockTypeNames[0];
    const firstBlockType = getBlockType(_firstBlockTypeName);
    let _icon;
    if (isSingleBlockSelected) {
      const match = getActiveBlockVariation(_firstBlockTypeName, getBlockAttributes(clientIds[0]));
      // Take into account active block variations.
      _icon = match?.icon || firstBlockType.icon;
    } else {
      const isSelectionOfSameType = new Set(blockTypeNames).size === 1;
      // When selection consists of blocks of multiple types, display an
      // appropriate icon to communicate the non-uniformity.
      _icon = isSelectionOfSameType ? firstBlockType.icon : copy;
    }
    return {
      icon: _icon,
      firstBlockName: getBlockAttributes(clientIds[0]).metadata.name
    };
  }, [clientIds, isSingleBlockSelected]);
  const firstBlockTitle = useBlockDisplayTitle({
    clientId: clientIds[0],
    maximumLength: 35
  });
  const blockDescription = isSingleBlockSelected ? sprintf( /* translators: %1s: The block type's name; %2s: The block's user-provided name (the same as the override name). */
  __('This %1$s is editable using the "%2$s" override.'), firstBlockTitle.toLowerCase(), firstBlockName) : __('These blocks are editable using overrides.');
  const descriptionId = useId();
  return /*#__PURE__*/_jsx(ToolbarItem, {
    children: toggleProps => /*#__PURE__*/_jsx(DropdownMenu, {
      className: "patterns-pattern-overrides-toolbar-indicator",
      label: firstBlockTitle,
      popoverProps: {
        placement: 'bottom-start',
        className: 'patterns-pattern-overrides-toolbar-indicator__popover'
      },
      icon: /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsx(BlockIcon, {
          icon: icon,
          className: "patterns-pattern-overrides-toolbar-indicator-icon",
          showColors: true
        })
      }),
      toggleProps: {
        description: blockDescription,
        ...toggleProps
      },
      menuProps: {
        orientation: 'both',
        'aria-describedby': descriptionId
      },
      children: () => /*#__PURE__*/_jsx(Text, {
        id: descriptionId,
        children: blockDescription
      })
    })
  });
}
export default function PatternOverridesBlockControls() {
  const {
    clientIds,
    hasPatternOverrides,
    hasParentPattern
  } = useSelect(select => {
    const {
      getBlockAttributes,
      getSelectedBlockClientIds,
      getBlockParentsByBlockName
    } = select(blockEditorStore);
    const selectedClientIds = getSelectedBlockClientIds();
    const _hasPatternOverrides = selectedClientIds.every(clientId => {
      var _getBlockAttributes$m;
      return Object.values((_getBlockAttributes$m = getBlockAttributes(clientId)?.metadata?.bindings) !== null && _getBlockAttributes$m !== void 0 ? _getBlockAttributes$m : {}).some(binding => binding?.source === PATTERN_OVERRIDES_BINDING_SOURCE);
    });
    const _hasParentPattern = selectedClientIds.every(clientId => getBlockParentsByBlockName(clientId, 'core/block', true).length > 0);
    return {
      clientIds: selectedClientIds,
      hasPatternOverrides: _hasPatternOverrides,
      hasParentPattern: _hasParentPattern
    };
  }, []);
  return hasPatternOverrides && hasParentPattern ? /*#__PURE__*/_jsx(BlockControls, {
    group: "parent",
    children: /*#__PURE__*/_jsx(PatternOverridesToolbarIndicator, {
      clientIds: clientIds
    })
  }) : null;
}
//# sourceMappingURL=pattern-overrides-block-controls.js.map