/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { getBlockType, hasBlockSupport, isReusableBlock, isTemplatePart } from '@wordpress/blocks';
import { ToolbarGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockMover from '../block-mover';
import BlockParentSelector from '../block-parent-selector';
import BlockSwitcher from '../block-switcher';
import BlockControls from '../block-controls';
import __unstableBlockToolbarLastItem from './block-toolbar-last-item';
import BlockSettingsMenu from '../block-settings-menu';
import { BlockLockToolbar } from '../block-lock';
import { BlockGroupToolbar } from '../convert-to-group-buttons';
import BlockEditVisuallyButton from '../block-edit-visually-button';
import { useShowHoveredOrFocusedGestures } from './utils';
import { store as blockEditorStore } from '../../store';
import __unstableBlockNameContext from './block-name-context';
import NavigableToolbar from '../navigable-toolbar';
import { useHasBlockToolbar } from './use-has-block-toolbar';

/**
 * Renders the block toolbar.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-toolbar/README.md
 *
 * @param {Object}   props                             Components props.
 * @param {boolean}  props.hideDragHandle              Show or hide the Drag Handle for drag and drop functionality.
 * @param {boolean}  props.focusOnMount                Focus the toolbar when mounted.
 * @param {number}   props.__experimentalInitialIndex  The initial index of the toolbar item to focus.
 * @param {Function} props.__experimentalOnIndexChange Callback function to be called when the index of the focused toolbar item changes.
 * @param {string}   props.variant                     Style variant of the toolbar, also passed to the Dropdowns rendered from Block Toolbar Buttons.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PrivateBlockToolbar({
  hideDragHandle,
  focusOnMount,
  __experimentalInitialIndex,
  __experimentalOnIndexChange,
  variant = 'unstyled'
}) {
  const {
    blockClientId,
    blockClientIds,
    isContentOnlyEditingMode,
    isDefaultEditingMode,
    blockType,
    toolbarKey,
    shouldShowVisualToolbar,
    showParentSelector,
    isUsingBindings,
    hasParentPattern,
    hasContentOnlyLocking
  } = useSelect(select => {
    const {
      getBlockName,
      getBlockMode,
      getBlockParents,
      getSelectedBlockClientIds,
      isBlockValid,
      getBlockEditingMode,
      getBlockAttributes,
      getBlockParentsByBlockName,
      getTemplateLock
    } = select(blockEditorStore);
    const selectedBlockClientIds = getSelectedBlockClientIds();
    const selectedBlockClientId = selectedBlockClientIds[0];
    const parents = getBlockParents(selectedBlockClientId);
    const firstParentClientId = parents[parents.length - 1];
    const parentBlockName = getBlockName(firstParentClientId);
    const parentBlockType = getBlockType(parentBlockName);
    const editingMode = getBlockEditingMode(selectedBlockClientId);
    const _isDefaultEditingMode = editingMode === 'default';
    const _blockName = getBlockName(selectedBlockClientId);
    const isValid = selectedBlockClientIds.every(id => isBlockValid(id));
    const isVisual = selectedBlockClientIds.every(id => getBlockMode(id) === 'visual');
    const _isUsingBindings = selectedBlockClientIds.every(clientId => !!getBlockAttributes(clientId)?.metadata?.bindings);
    const _hasParentPattern = selectedBlockClientIds.every(clientId => getBlockParentsByBlockName(clientId, 'core/block', true).length > 0);

    // If one or more selected blocks are locked, do not show the BlockGroupToolbar.
    const _hasTemplateLock = selectedBlockClientIds.some(id => getTemplateLock(id) === 'contentOnly');
    return {
      blockClientId: selectedBlockClientId,
      blockClientIds: selectedBlockClientIds,
      isContentOnlyEditingMode: editingMode === 'contentOnly',
      isDefaultEditingMode: _isDefaultEditingMode,
      blockType: selectedBlockClientId && getBlockType(_blockName),
      shouldShowVisualToolbar: isValid && isVisual,
      toolbarKey: `${selectedBlockClientId}${firstParentClientId}`,
      showParentSelector: parentBlockType && getBlockEditingMode(firstParentClientId) === 'default' && hasBlockSupport(parentBlockType, '__experimentalParentSelector', true) && selectedBlockClientIds.length === 1 && _isDefaultEditingMode,
      isUsingBindings: _isUsingBindings,
      hasParentPattern: _hasParentPattern,
      hasContentOnlyLocking: _hasTemplateLock
    };
  }, []);
  const toolbarWrapperRef = useRef(null);

  // Handles highlighting the current block outline on hover or focus of the
  // block type toolbar area.
  const nodeRef = useRef();
  const showHoveredOrFocusedGestures = useShowHoveredOrFocusedGestures({
    ref: nodeRef
  });
  const isLargeViewport = !useViewportMatch('medium', '<');
  const hasBlockToolbar = useHasBlockToolbar();
  if (!hasBlockToolbar) {
    return null;
  }
  const isMultiToolbar = blockClientIds.length > 1;
  const isSynced = isReusableBlock(blockType) || isTemplatePart(blockType);

  // Shifts the toolbar to make room for the parent block selector.
  const classes = clsx('block-editor-block-contextual-toolbar', {
    'has-parent': showParentSelector
  });
  const innerClasses = clsx('block-editor-block-toolbar', {
    'is-synced': isSynced,
    'is-connected': isUsingBindings
  });
  return /*#__PURE__*/_jsx(NavigableToolbar, {
    focusEditorOnEscape: true,
    className: classes
    /* translators: accessibility text for the block toolbar */,
    "aria-label": __('Block tools')
    // The variant is applied as "toolbar" when undefined, which is the black border style of the dropdown from the toolbar popover.
    ,
    variant: variant === 'toolbar' ? undefined : variant,
    focusOnMount: focusOnMount,
    __experimentalInitialIndex: __experimentalInitialIndex,
    __experimentalOnIndexChange: __experimentalOnIndexChange
    // Resets the index whenever the active block changes so
    // this is not persisted. See https://github.com/WordPress/gutenberg/pull/25760#issuecomment-717906169
    ,
    children: /*#__PURE__*/_jsxs("div", {
      ref: toolbarWrapperRef,
      className: innerClasses,
      children: [!isMultiToolbar && isLargeViewport && isDefaultEditingMode && /*#__PURE__*/_jsx(BlockParentSelector, {}), (shouldShowVisualToolbar || isMultiToolbar) && (isDefaultEditingMode || isContentOnlyEditingMode && !hasParentPattern || isSynced) && /*#__PURE__*/_jsx("div", {
        ref: nodeRef,
        ...showHoveredOrFocusedGestures,
        children: /*#__PURE__*/_jsxs(ToolbarGroup, {
          className: "block-editor-block-toolbar__block-controls",
          children: [/*#__PURE__*/_jsx(BlockSwitcher, {
            clientIds: blockClientIds,
            disabled: !isDefaultEditingMode,
            isUsingBindings: isUsingBindings
          }), isDefaultEditingMode && /*#__PURE__*/_jsxs(_Fragment, {
            children: [!isMultiToolbar && /*#__PURE__*/_jsx(BlockLockToolbar, {
              clientId: blockClientId
            }), /*#__PURE__*/_jsx(BlockMover, {
              clientIds: blockClientIds,
              hideDragHandle: hideDragHandle
            })]
          })]
        })
      }), !hasContentOnlyLocking && shouldShowVisualToolbar && isMultiToolbar && /*#__PURE__*/_jsx(BlockGroupToolbar, {}), shouldShowVisualToolbar && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockControls.Slot, {
          group: "parent",
          className: "block-editor-block-toolbar__slot"
        }), /*#__PURE__*/_jsx(BlockControls.Slot, {
          group: "block",
          className: "block-editor-block-toolbar__slot"
        }), /*#__PURE__*/_jsx(BlockControls.Slot, {
          className: "block-editor-block-toolbar__slot"
        }), /*#__PURE__*/_jsx(BlockControls.Slot, {
          group: "inline",
          className: "block-editor-block-toolbar__slot"
        }), /*#__PURE__*/_jsx(BlockControls.Slot, {
          group: "other",
          className: "block-editor-block-toolbar__slot"
        }), /*#__PURE__*/_jsx(__unstableBlockNameContext.Provider, {
          value: blockType?.name,
          children: /*#__PURE__*/_jsx(__unstableBlockToolbarLastItem.Slot, {})
        })]
      }), /*#__PURE__*/_jsx(BlockEditVisuallyButton, {
        clientIds: blockClientIds
      }), isDefaultEditingMode && /*#__PURE__*/_jsx(BlockSettingsMenu, {
        clientIds: blockClientIds
      })]
    })
  }, toolbarKey);
}

/**
 * Renders the block toolbar.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-toolbar/README.md
 *
 * @param {Object}  props                Components props.
 * @param {boolean} props.hideDragHandle Show or hide the Drag Handle for drag and drop functionality.
 * @param {string}  props.variant        Style variant of the toolbar, also passed to the Dropdowns rendered from Block Toolbar Buttons.
 */
export default function BlockToolbar({
  hideDragHandle,
  variant
}) {
  return /*#__PURE__*/_jsx(PrivateBlockToolbar, {
    hideDragHandle: hideDragHandle,
    variant: variant,
    focusOnMount: undefined,
    __experimentalInitialIndex: undefined,
    __experimentalOnIndexChange: undefined
  });
}
//# sourceMappingURL=index.js.map