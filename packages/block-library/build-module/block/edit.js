/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useRef, useMemo, useEffect } from '@wordpress/element';
import { useEntityRecord, store as coreStore, useEntityBlockEditor } from '@wordpress/core-data';
import { Placeholder, Spinner, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, RecursionProvider, useHasRecursion, useBlockProps, Warning, privateApis as blockEditorPrivateApis, store as blockEditorStore, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { privateApis as patternsPrivateApis } from '@wordpress/patterns';
import { store as blocksStore } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { name as patternBlockName } from './index';
import { unlock } from '../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useLayoutClasses
} = unlock(blockEditorPrivateApis);
const {
  isOverridableBlock,
  hasOverridableBlocks
} = unlock(patternsPrivateApis);
const fullAlignments = ['full', 'wide', 'left', 'right'];
const useInferredLayout = (blocks, parentLayout) => {
  const initialInferredAlignmentRef = useRef();
  return useMemo(() => {
    // Exit early if the pattern's blocks haven't loaded yet.
    if (!blocks?.length) {
      return {};
    }
    let alignment = initialInferredAlignmentRef.current;

    // Only track the initial alignment so that temporarily removed
    // alignments can be reapplied.
    if (alignment === undefined) {
      const isConstrained = parentLayout?.type === 'constrained';
      const hasFullAlignment = blocks.some(block => fullAlignments.includes(block.attributes.align));
      alignment = isConstrained && hasFullAlignment ? 'full' : null;
      initialInferredAlignmentRef.current = alignment;
    }
    const layout = alignment ? parentLayout : undefined;
    return {
      alignment,
      layout
    };
  }, [blocks, parentLayout]);
};
function setBlockEditMode(setEditMode, blocks, mode) {
  blocks.forEach(block => {
    const editMode = mode || (isOverridableBlock(block) ? 'contentOnly' : 'disabled');
    setEditMode(block.clientId, editMode);
    setBlockEditMode(setEditMode, block.innerBlocks,
    // Disable editing for nested patterns.
    block.name === patternBlockName ? 'disabled' : mode);
  });
}
function RecursionWarning() {
  const blockProps = useBlockProps();
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsx(Warning, {
      children: __('Block cannot be rendered inside itself.')
    })
  });
}
const NOOP = () => {};

// Wrap the main Edit function for the pattern block with a recursion wrapper
// that allows short-circuiting rendering as early as possible, before any
// of the other effects in the block edit have run.
export default function ReusableBlockEditRecursionWrapper(props) {
  const {
    ref
  } = props.attributes;
  const hasAlreadyRendered = useHasRecursion(ref);
  if (hasAlreadyRendered) {
    return /*#__PURE__*/_jsx(RecursionWarning, {});
  }
  return /*#__PURE__*/_jsx(RecursionProvider, {
    uniqueId: ref,
    children: /*#__PURE__*/_jsx(ReusableBlockEdit, {
      ...props
    })
  });
}
function ReusableBlockControl({
  recordId,
  canOverrideBlocks,
  hasContent,
  handleEditOriginal,
  resetContent
}) {
  const canUserEdit = useSelect(select => !!select(coreStore).canUser('update', {
    kind: 'postType',
    name: 'wp_block',
    id: recordId
  }), [recordId]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [canUserEdit && !!handleEditOriginal && /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: handleEditOriginal,
          children: __('Edit original')
        })
      })
    }), canOverrideBlocks && /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: resetContent,
          disabled: !hasContent,
          children: __('Reset')
        })
      })
    })]
  });
}
function ReusableBlockEdit({
  name,
  attributes: {
    ref,
    content
  },
  __unstableParentLayout: parentLayout,
  clientId: patternClientId,
  setAttributes
}) {
  const {
    record,
    hasResolved
  } = useEntityRecord('postType', 'wp_block', ref);
  const [blocks] = useEntityBlockEditor('postType', 'wp_block', {
    id: ref
  });
  const isMissing = hasResolved && !record;
  const {
    setBlockEditingMode,
    __unstableMarkLastChangeAsPersistent
  } = useDispatch(blockEditorStore);
  const {
    innerBlocks,
    onNavigateToEntityRecord,
    editingMode,
    hasPatternOverridesSource
  } = useSelect(select => {
    const {
      getBlocks,
      getSettings,
      getBlockEditingMode
    } = select(blockEditorStore);
    const {
      getBlockBindingsSource
    } = unlock(select(blocksStore));
    // For editing link to the site editor if the theme and user permissions support it.
    return {
      innerBlocks: getBlocks(patternClientId),
      onNavigateToEntityRecord: getSettings().onNavigateToEntityRecord,
      editingMode: getBlockEditingMode(patternClientId),
      hasPatternOverridesSource: !!getBlockBindingsSource('core/pattern-overrides')
    };
  }, [patternClientId]);

  // Sync the editing mode of the pattern block with the inner blocks.
  useEffect(() => {
    setBlockEditMode(setBlockEditingMode, innerBlocks,
    // Disable editing if the pattern itself is disabled.
    editingMode === 'disabled' || !hasPatternOverridesSource ? 'disabled' : undefined);
  }, [editingMode, innerBlocks, setBlockEditingMode, hasPatternOverridesSource]);
  const canOverrideBlocks = useMemo(() => hasPatternOverridesSource && hasOverridableBlocks(blocks), [hasPatternOverridesSource, blocks]);
  const {
    alignment,
    layout
  } = useInferredLayout(blocks, parentLayout);
  const layoutClasses = useLayoutClasses({
    layout
  }, name);
  const blockProps = useBlockProps({
    className: clsx('block-library-block__reusable-block-container', layout && layoutClasses, {
      [`align${alignment}`]: alignment
    })
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    templateLock: 'all',
    layout,
    value: blocks,
    onInput: NOOP,
    onChange: NOOP,
    renderAppender: blocks?.length ? undefined : InnerBlocks.ButtonBlockAppender
  });
  const handleEditOriginal = () => {
    onNavigateToEntityRecord({
      postId: ref,
      postType: 'wp_block'
    });
  };
  const resetContent = () => {
    if (content) {
      // Make sure any previous changes are persisted before resetting.
      __unstableMarkLastChangeAsPersistent();
      setAttributes({
        content: undefined
      });
    }
  };
  let children = null;
  if (isMissing) {
    children = /*#__PURE__*/_jsx(Warning, {
      children: __('Block has been deleted or is unavailable.')
    });
  }
  if (!hasResolved) {
    children = /*#__PURE__*/_jsx(Placeholder, {
      children: /*#__PURE__*/_jsx(Spinner, {})
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [hasResolved && !isMissing && /*#__PURE__*/_jsx(ReusableBlockControl, {
      recordId: ref,
      canOverrideBlocks: canOverrideBlocks,
      hasContent: !!content,
      handleEditOriginal: onNavigateToEntityRecord ? handleEditOriginal : undefined,
      resetContent: resetContent
    }), children === null ? /*#__PURE__*/_jsx("div", {
      ...innerBlocksProps
    }) : /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: children
    })]
  });
}
//# sourceMappingURL=edit.js.map