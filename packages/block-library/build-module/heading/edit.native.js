/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, Platform } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { AlignmentControl, BlockControls, RichText, useBlockProps, store as blockEditorStore, HeadingLevelDropdown } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { generateAnchor, setAnchor } from './autogenerate-anchors';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function HeadingEdit({
  attributes,
  setAttributes,
  mergeBlocks,
  onReplace,
  style,
  clientId
}) {
  const {
    textAlign,
    content,
    level,
    placeholder,
    anchor
  } = attributes;
  const tagName = 'h' + level;
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    }),
    style
  });
  const {
    canGenerateAnchors
  } = useSelect(select => {
    const {
      getGlobalBlockCount,
      getSettings
    } = select(blockEditorStore);
    const settings = getSettings();
    return {
      canGenerateAnchors: !!settings.generateAnchors || getGlobalBlockCount('core/table-of-contents') > 0
    };
  }, []);
  const {
    __unstableMarkNextChangeAsNotPersistent
  } = useDispatch(blockEditorStore);

  // Initially set anchor for headings that have content but no anchor set.
  // This is used when transforming a block to heading, or for legacy anchors.
  useEffect(() => {
    if (!canGenerateAnchors) {
      return;
    }
    if (!anchor && content) {
      // This side-effect should not create an undo level.
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({
        anchor: generateAnchor(clientId, content)
      });
    }
    setAnchor(clientId, anchor);

    // Remove anchor map when block unmounts.
    return () => setAnchor(clientId, null);
  }, [anchor, content, clientId, canGenerateAnchors]);
  const onContentChange = value => {
    const newAttrs = {
      content: value
    };
    if (canGenerateAnchors && (!anchor || !value || generateAnchor(clientId, content) === anchor)) {
      newAttrs.anchor = generateAnchor(clientId, value);
    }
    setAttributes(newAttrs);
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      children: [/*#__PURE__*/_jsx(HeadingLevelDropdown, {
        value: level,
        onChange: newLevel => setAttributes({
          level: newLevel
        })
      }), /*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })]
    }), /*#__PURE__*/_jsx(RichText, {
      identifier: "content",
      tagName: tagName,
      value: content,
      onChange: onContentChange,
      onMerge: mergeBlocks,
      onSplit: (value, isOriginal) => {
        let block;
        if (isOriginal || value) {
          block = createBlock('core/heading', {
            ...attributes,
            content: value
          });
        } else {
          var _getDefaultBlockName;
          block = createBlock((_getDefaultBlockName = getDefaultBlockName()) !== null && _getDefaultBlockName !== void 0 ? _getDefaultBlockName : 'core/heading');
        }
        if (isOriginal) {
          block.clientId = clientId;
        }
        return block;
      },
      onReplace: onReplace,
      onRemove: () => onReplace([]),
      placeholder: placeholder || __('Heading'),
      textAlign: textAlign,
      ...(Platform.isNative && {
        deleteEnter: true
      }),
      ...blockProps
    })]
  });
}
export default HeadingEdit;
//# sourceMappingURL=edit.native.js.map