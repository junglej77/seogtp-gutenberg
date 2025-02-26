/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, useInnerBlocksProps, BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { isRTL, __ } from '@wordpress/i18n';
import { ToolbarButton } from '@wordpress/components';
import { formatOutdent, formatOutdentRTL, formatIndentRTL, formatIndent } from '@wordpress/icons';
import { useMergeRefs } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useEnter, useSpace, useIndentListItem, useOutdentListItem, useMerge } from './hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function IndentUI({
  clientId
}) {
  const indentListItem = useIndentListItem(clientId);
  const outdentListItem = useOutdentListItem();
  const {
    canIndent,
    canOutdent
  } = useSelect(select => {
    const {
      getBlockIndex,
      getBlockRootClientId,
      getBlockName
    } = select(blockEditorStore);
    return {
      canIndent: getBlockIndex(clientId) > 0,
      canOutdent: getBlockName(getBlockRootClientId(getBlockRootClientId(clientId))) === 'core/list-item'
    };
  }, [clientId]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolbarButton, {
      icon: isRTL() ? formatOutdentRTL : formatOutdent,
      title: __('Outdent'),
      description: __('Outdent list item'),
      disabled: !canOutdent,
      onClick: () => outdentListItem()
    }), /*#__PURE__*/_jsx(ToolbarButton, {
      icon: isRTL() ? formatIndentRTL : formatIndent,
      title: __('Indent'),
      description: __('Indent list item'),
      disabled: !canIndent,
      onClick: () => indentListItem()
    })]
  });
}
export default function ListItemEdit({
  attributes,
  setAttributes,
  clientId,
  mergeBlocks
}) {
  const {
    placeholder,
    content
  } = attributes;
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    renderAppender: false,
    __unstableDisableDropZone: true
  });
  const useEnterRef = useEnter({
    content,
    clientId
  });
  const useSpaceRef = useSpace(clientId);
  const onMerge = useMerge(clientId, mergeBlocks);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("li", {
      ...innerBlocksProps,
      children: [/*#__PURE__*/_jsx(RichText, {
        ref: useMergeRefs([useEnterRef, useSpaceRef]),
        identifier: "content",
        tagName: "div",
        onChange: nextContent => setAttributes({
          content: nextContent
        }),
        value: content,
        "aria-label": __('List text'),
        placeholder: placeholder || __('List'),
        onMerge: onMerge
      }), innerBlocksProps.children]
    }), /*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(IndentUI, {
        clientId: clientId
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map