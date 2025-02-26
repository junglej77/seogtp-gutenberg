/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, __experimentalVStack as VStack, __experimentalTruncate as Truncate, Flex, FlexBlock, FlexItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import BlockIcon from '../block-icon';
import useBlockDisplayInformation from '../use-block-display-information';
import useBlockDisplayTitle from '../block-title/use-block-display-title';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockQuickNavigation({
  clientIds,
  onSelect
}) {
  if (!clientIds.length) {
    return null;
  }
  return /*#__PURE__*/_jsx(VStack, {
    spacing: 1,
    children: clientIds.map(clientId => /*#__PURE__*/_jsx(BlockQuickNavigationItem, {
      onSelect: onSelect,
      clientId: clientId
    }, clientId))
  });
}
function BlockQuickNavigationItem({
  clientId,
  onSelect
}) {
  const blockInformation = useBlockDisplayInformation(clientId);
  const blockTitle = useBlockDisplayTitle({
    clientId,
    context: 'list-view'
  });
  const {
    isSelected
  } = useSelect(select => {
    const {
      isBlockSelected,
      hasSelectedInnerBlock
    } = select(blockEditorStore);
    return {
      isSelected: isBlockSelected(clientId) || hasSelectedInnerBlock(clientId, /* deep: */true)
    };
  }, [clientId]);
  const {
    selectBlock
  } = useDispatch(blockEditorStore);
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    isPressed: isSelected,
    onClick: async () => {
      await selectBlock(clientId);
      if (onSelect) {
        onSelect(clientId);
      }
    },
    children: /*#__PURE__*/_jsxs(Flex, {
      children: [/*#__PURE__*/_jsx(FlexItem, {
        children: /*#__PURE__*/_jsx(BlockIcon, {
          icon: blockInformation?.icon
        })
      }), /*#__PURE__*/_jsx(FlexBlock, {
        style: {
          textAlign: 'left'
        },
        children: /*#__PURE__*/_jsx(Truncate, {
          children: blockTitle
        })
      })]
    })
  });
}
//# sourceMappingURL=index.js.map