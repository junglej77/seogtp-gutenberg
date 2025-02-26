/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
import { MenuItem } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import { useShowHoveredOrFocusedGestures } from '../block-toolbar/utils';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
export default function BlockParentSelectorMenuItem({
  parentClientId,
  parentBlockType
}) {
  const isSmallViewport = useViewportMatch('medium', '<');
  const {
    selectBlock
  } = useDispatch(blockEditorStore);

  // Allows highlighting the parent block outline when focusing or hovering
  // the parent block selector within the child.
  const menuItemRef = useRef();
  const gesturesProps = useShowHoveredOrFocusedGestures({
    ref: menuItemRef,
    highlightParent: true
  });
  if (!isSmallViewport) {
    return null;
  }
  return /*#__PURE__*/_jsx(MenuItem, {
    ...gesturesProps,
    ref: menuItemRef,
    icon: /*#__PURE__*/_jsx(BlockIcon, {
      icon: parentBlockType.icon
    }),
    onClick: () => selectBlock(parentClientId),
    children: sprintf( /* translators: %s: Name of the block's parent. */
    __('Select parent block (%s)'), parentBlockType.title)
  });
}
//# sourceMappingURL=block-parent-selector-menu-item.js.map