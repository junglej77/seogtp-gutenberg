/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useCallback } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { BlockControls, __experimentalGetElementClassName, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { caption as captionIcon } from '@wordpress/icons';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Caption({
  attributeKey = 'caption',
  attributes,
  setAttributes,
  isSelected,
  insertBlocksAfter,
  placeholder = __('Add caption'),
  label = __('Caption text'),
  showToolbarButton = true,
  excludeElementClassName,
  className,
  readOnly,
  tagName = 'figcaption',
  addLabel = __('Add caption'),
  removeLabel = __('Remove caption'),
  icon = captionIcon,
  ...props
}) {
  const caption = attributes[attributeKey];
  const prevCaption = usePrevious(caption);
  const {
    PrivateRichText: RichText
  } = unlock(blockEditorPrivateApis);
  const isCaptionEmpty = RichText.isEmpty(caption);
  const isPrevCaptionEmpty = RichText.isEmpty(prevCaption);
  const [showCaption, setShowCaption] = useState(!isCaptionEmpty);

  // We need to show the caption when changes come from
  // history navigation(undo/redo).
  useEffect(() => {
    if (!isCaptionEmpty && isPrevCaptionEmpty) {
      setShowCaption(true);
    }
  }, [isCaptionEmpty, isPrevCaptionEmpty]);
  useEffect(() => {
    if (!isSelected && isCaptionEmpty) {
      setShowCaption(false);
    }
  }, [isSelected, isCaptionEmpty]);

  // Focus the caption when we click to add one.
  const ref = useCallback(node => {
    if (node && isCaptionEmpty) {
      node.focus();
    }
  }, [isCaptionEmpty]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [showToolbarButton && /*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        onClick: () => {
          setShowCaption(!showCaption);
          if (showCaption && caption) {
            setAttributes({
              [attributeKey]: undefined
            });
          }
        },
        icon: icon,
        isPressed: showCaption,
        label: showCaption ? removeLabel : addLabel
      })
    }), showCaption && (!RichText.isEmpty(caption) || isSelected) && /*#__PURE__*/_jsx(RichText, {
      identifier: attributeKey,
      tagName: tagName,
      className: clsx(className, excludeElementClassName ? '' : __experimentalGetElementClassName('caption')),
      ref: ref,
      "aria-label": label,
      placeholder: placeholder,
      value: caption,
      onChange: value => setAttributes({
        [attributeKey]: value
      }),
      inlineToolbar: true,
      __unstableOnSplitAtEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName())),
      readOnly: readOnly,
      ...props
    })]
  });
}
//# sourceMappingURL=caption.js.map