/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AsyncModeProvider, useSelect, useDispatch, useRegistry } from '@wordpress/data';
import { useViewportMatch, useMergeRefs, useDebounce } from '@wordpress/compose';
import { createContext, useMemo, useCallback, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockListBlock from './block';
import BlockListAppender from '../block-list-appender';
import { useInBetweenInserter } from './use-in-between-inserter';
import { store as blockEditorStore } from '../../store';
import { LayoutProvider, defaultLayout } from './layout';
import { useBlockSelectionClearer } from '../block-selection-clearer';
import { useInnerBlocksProps } from '../inner-blocks';
import { BlockEditContextProvider, DEFAULT_BLOCK_EDIT_CONTEXT } from '../block-edit/context';
import { useTypingObserver } from '../observe-typing';
import { ZoomOutSeparator } from './zoom-out-separator';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const IntersectionObserver = createContext();
const pendingBlockVisibilityUpdatesPerRegistry = new WeakMap();
function Root({
  className,
  ...settings
}) {
  const isLargeViewport = useViewportMatch('medium');
  const {
    isOutlineMode,
    isFocusMode,
    editorMode,
    temporarilyEditingAsBlocks
  } = useSelect(select => {
    const {
      getSettings,
      __unstableGetEditorMode,
      getTemporarilyEditingAsBlocks,
      isTyping
    } = unlock(select(blockEditorStore));
    const {
      outlineMode,
      focusMode
    } = getSettings();
    return {
      isOutlineMode: outlineMode && !isTyping(),
      isFocusMode: focusMode,
      editorMode: __unstableGetEditorMode(),
      temporarilyEditingAsBlocks: getTemporarilyEditingAsBlocks()
    };
  }, []);
  const registry = useRegistry();
  const {
    setBlockVisibility
  } = useDispatch(blockEditorStore);
  const delayedBlockVisibilityUpdates = useDebounce(useCallback(() => {
    const updates = {};
    pendingBlockVisibilityUpdatesPerRegistry.get(registry).forEach(([id, isIntersecting]) => {
      updates[id] = isIntersecting;
    });
    setBlockVisibility(updates);
  }, [registry]), 300, {
    trailing: true
  });
  const intersectionObserver = useMemo(() => {
    const {
      IntersectionObserver: Observer
    } = window;
    if (!Observer) {
      return;
    }
    return new Observer(entries => {
      if (!pendingBlockVisibilityUpdatesPerRegistry.get(registry)) {
        pendingBlockVisibilityUpdatesPerRegistry.set(registry, []);
      }
      for (const entry of entries) {
        const clientId = entry.target.getAttribute('data-block');
        pendingBlockVisibilityUpdatesPerRegistry.get(registry).push([clientId, entry.isIntersecting]);
      }
      delayedBlockVisibilityUpdates();
    });
  }, []);
  const innerBlocksProps = useInnerBlocksProps({
    ref: useMergeRefs([useBlockSelectionClearer(), useInBetweenInserter(), useTypingObserver()]),
    className: clsx('is-root-container', className, {
      'is-outline-mode': isOutlineMode,
      'is-focus-mode': isFocusMode && isLargeViewport,
      'is-navigate-mode': editorMode === 'navigation'
    })
  }, settings);
  return /*#__PURE__*/_jsxs(IntersectionObserver.Provider, {
    value: intersectionObserver,
    children: [/*#__PURE__*/_jsx("div", {
      ...innerBlocksProps
    }), !!temporarilyEditingAsBlocks && /*#__PURE__*/_jsx(StopEditingAsBlocksOnOutsideSelect, {
      clientId: temporarilyEditingAsBlocks
    })]
  });
}
function StopEditingAsBlocksOnOutsideSelect({
  clientId
}) {
  const {
    stopEditingAsBlocks
  } = unlock(useDispatch(blockEditorStore));
  const isBlockOrDescendantSelected = useSelect(select => {
    const {
      isBlockSelected,
      hasSelectedInnerBlock
    } = select(blockEditorStore);
    return isBlockSelected(clientId) || hasSelectedInnerBlock(clientId, true);
  }, [clientId]);
  useEffect(() => {
    if (!isBlockOrDescendantSelected) {
      stopEditingAsBlocks(clientId);
    }
  }, [isBlockOrDescendantSelected, clientId, stopEditingAsBlocks]);
  return null;
}
export default function BlockList(settings) {
  return /*#__PURE__*/_jsx(BlockEditContextProvider, {
    value: DEFAULT_BLOCK_EDIT_CONTEXT,
    children: /*#__PURE__*/_jsx(Root, {
      ...settings
    })
  });
}
const EMPTY_ARRAY = [];
const EMPTY_SET = new Set();
function Items({
  placeholder,
  rootClientId,
  renderAppender: CustomAppender,
  __experimentalAppenderTagName,
  layout = defaultLayout
}) {
  // Avoid passing CustomAppender to useSelect because it could be a new
  // function on every render.
  const hasAppender = CustomAppender !== false;
  const hasCustomAppender = !!CustomAppender;
  const {
    order,
    isZoomOut,
    selectedBlocks,
    visibleBlocks,
    shouldRenderAppender
  } = useSelect(select => {
    const {
      getSettings,
      getBlockOrder,
      getSelectedBlockClientId,
      getSelectedBlockClientIds,
      __unstableGetVisibleBlocks,
      getTemplateLock,
      getBlockEditingMode,
      __unstableGetEditorMode
    } = select(blockEditorStore);
    const _order = getBlockOrder(rootClientId);
    if (getSettings().__unstableIsPreviewMode) {
      return {
        order: _order,
        selectedBlocks: EMPTY_ARRAY,
        visibleBlocks: EMPTY_SET
      };
    }
    const selectedBlockClientId = getSelectedBlockClientId();
    return {
      order: _order,
      selectedBlocks: getSelectedBlockClientIds(),
      visibleBlocks: __unstableGetVisibleBlocks(),
      isZoomOut: __unstableGetEditorMode() === 'zoom-out',
      shouldRenderAppender: hasAppender && __unstableGetEditorMode() !== 'zoom-out' && (hasCustomAppender ? !getTemplateLock(rootClientId) && getBlockEditingMode(rootClientId) !== 'disabled' : rootClientId === selectedBlockClientId || !rootClientId && !selectedBlockClientId && !_order.length)
    };
  }, [rootClientId, hasAppender, hasCustomAppender]);
  return /*#__PURE__*/_jsxs(LayoutProvider, {
    value: layout,
    children: [order.map(clientId => /*#__PURE__*/_jsxs(AsyncModeProvider, {
      value:
      // Only provide data asynchronously if the block is
      // not visible and not selected.
      !visibleBlocks.has(clientId) && !selectedBlocks.includes(clientId),
      children: [isZoomOut && /*#__PURE__*/_jsx(ZoomOutSeparator, {
        clientId: clientId,
        rootClientId: rootClientId,
        position: "top"
      }), /*#__PURE__*/_jsx(BlockListBlock, {
        rootClientId: rootClientId,
        clientId: clientId
      }), isZoomOut && /*#__PURE__*/_jsx(ZoomOutSeparator, {
        clientId: clientId,
        rootClientId: rootClientId,
        position: "bottom"
      })]
    }, clientId)), order.length < 1 && placeholder, shouldRenderAppender && /*#__PURE__*/_jsx(BlockListAppender, {
      tagName: __experimentalAppenderTagName,
      rootClientId: rootClientId,
      CustomAppender: CustomAppender
    })]
  });
}
export function BlockListItems(props) {
  // This component needs to always be synchronous as it's the one changing
  // the async mode depending on the block selection.
  return /*#__PURE__*/_jsx(AsyncModeProvider, {
    value: false,
    children: /*#__PURE__*/_jsx(Items, {
      ...props
    })
  });
}
//# sourceMappingURL=index.js.map