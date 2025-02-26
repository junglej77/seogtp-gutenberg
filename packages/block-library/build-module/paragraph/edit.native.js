/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { AlignmentControl, BlockControls, RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/paragraph';
const allowedParentBlockAlignments = ['left', 'center', 'right'];
function ParagraphBlock({
  attributes,
  mergeBlocks,
  onReplace,
  setAttributes,
  style,
  clientId,
  parentBlockAlignment
}) {
  const isRTL = useSelect(select => {
    return !!select(blockEditorStore).getSettings().isRTL;
  }, []);
  const {
    align,
    content,
    placeholder
  } = attributes;
  const styles = {
    ...(style?.baseColors && {
      color: style.baseColors?.color?.text,
      placeholderColor: style.color || style.baseColors?.color?.text,
      linkColor: style.baseColors?.elements?.link?.color?.text
    }),
    ...style
  };
  const onAlignmentChange = useCallback(nextAlign => {
    setAttributes({
      align: nextAlign
    });
  }, []);
  const parentTextAlignment = allowedParentBlockAlignments.includes(parentBlockAlignment) ? parentBlockAlignment : undefined;
  const textAlignment = align || parentTextAlignment;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(AlignmentControl, {
        value: align,
        isRTL: isRTL,
        onChange: onAlignmentChange
      })
    }), /*#__PURE__*/_jsx(RichText, {
      identifier: "content",
      tagName: "p",
      value: content,
      deleteEnter: true,
      style: styles,
      onChange: nextContent => {
        setAttributes({
          content: nextContent
        });
      },
      onSplit: (value, isOriginal) => {
        let newAttributes;
        if (isOriginal || value) {
          newAttributes = {
            ...attributes,
            content: value
          };
        }
        const block = createBlock(name, newAttributes);
        if (isOriginal) {
          block.clientId = clientId;
        }
        return block;
      },
      onMerge: mergeBlocks,
      onReplace: onReplace,
      onRemove: onReplace ? () => onReplace([]) : undefined,
      placeholder: placeholder || __('Start writing…'),
      textAlign: textAlignment,
      __unstableEmbedURLOnPaste: true
    })]
  });
}
export default ParagraphBlock;
//# sourceMappingURL=edit.native.js.map