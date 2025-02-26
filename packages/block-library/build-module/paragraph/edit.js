/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, _x, isRTL } from '@wordpress/i18n';
import { ToolbarButton, ToggleControl, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { AlignmentControl, BlockControls, InspectorControls, RichText, useBlockProps, useSettings, useBlockEditingMode } from '@wordpress/block-editor';
import { formatLtr } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { useOnEnter } from './use-enter';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ParagraphRTLControl({
  direction,
  setDirection
}) {
  return isRTL() && /*#__PURE__*/_jsx(ToolbarButton, {
    icon: formatLtr,
    title: _x('Left to right', 'editor button'),
    isActive: direction === 'ltr',
    onClick: () => {
      setDirection(direction === 'ltr' ? undefined : 'ltr');
    }
  });
}
function hasDropCapDisabled(align) {
  return align === (isRTL() ? 'left' : 'right') || align === 'center';
}
function DropCapControl({
  clientId,
  attributes,
  setAttributes
}) {
  // Please do not add a useSelect call to the paragraph block unconditionally.
  // Every useSelect added to a (frequently used) block will degrade load
  // and type performance. By moving it within InspectorControls, the subscription is
  // now only added for the selected block(s).
  const [isDropCapFeatureEnabled] = useSettings('typography.dropCap');
  if (!isDropCapFeatureEnabled) {
    return null;
  }
  const {
    align,
    dropCap
  } = attributes;
  let helpText;
  if (hasDropCapDisabled(align)) {
    helpText = __('Not available for aligned text.');
  } else if (dropCap) {
    helpText = __('Showing large initial letter.');
  } else {
    helpText = __('Toggle to show a large initial letter.');
  }
  return /*#__PURE__*/_jsx(ToolsPanelItem, {
    hasValue: () => !!dropCap,
    label: __('Drop cap'),
    onDeselect: () => setAttributes({
      dropCap: undefined
    }),
    resetAllFilter: () => ({
      dropCap: undefined
    }),
    panelId: clientId,
    children: /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Drop cap'),
      checked: !!dropCap,
      onChange: () => setAttributes({
        dropCap: !dropCap
      }),
      help: helpText,
      disabled: hasDropCapDisabled(align) ? true : false
    })
  });
}
function ParagraphBlock({
  attributes,
  mergeBlocks,
  onReplace,
  onRemove,
  setAttributes,
  clientId
}) {
  const {
    align,
    content,
    direction,
    dropCap,
    placeholder
  } = attributes;
  const blockProps = useBlockProps({
    ref: useOnEnter({
      clientId,
      content
    }),
    className: clsx({
      'has-drop-cap': hasDropCapDisabled(align) ? false : dropCap,
      [`has-text-align-${align}`]: align
    }),
    style: {
      direction
    }
  });
  const blockEditingMode = useBlockEditingMode();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [blockEditingMode === 'default' && /*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      children: [/*#__PURE__*/_jsx(AlignmentControl, {
        value: align,
        onChange: newAlign => setAttributes({
          align: newAlign,
          dropCap: hasDropCapDisabled(newAlign) ? false : dropCap
        })
      }), /*#__PURE__*/_jsx(ParagraphRTLControl, {
        direction: direction,
        setDirection: newDirection => setAttributes({
          direction: newDirection
        })
      })]
    }), /*#__PURE__*/_jsx(RichText, {
      identifier: "content",
      tagName: "p",
      ...blockProps,
      value: content,
      onChange: newContent => setAttributes({
        content: newContent
      }),
      onMerge: mergeBlocks,
      onReplace: onReplace,
      onRemove: onRemove,
      "aria-label": RichText.isEmpty(content) ? __('Empty block; start writing or type forward slash to choose a block') : __('Block: Paragraph'),
      "data-empty": RichText.isEmpty(content),
      placeholder: placeholder || __('Type / to choose a block'),
      "data-custom-placeholder": placeholder ? true : undefined,
      __unstableEmbedURLOnPaste: true,
      __unstableAllowPrefixTransformations: true
    })]
  });
}
export default ParagraphBlock;
//# sourceMappingURL=edit.js.map