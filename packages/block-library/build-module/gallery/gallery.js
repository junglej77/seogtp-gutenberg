/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { View } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import { Caption } from '../utils/caption';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Gallery(props) {
  const {
    attributes,
    isSelected,
    setAttributes,
    mediaPlaceholder,
    insertBlocksAfter,
    blockProps,
    __unstableLayoutClassNames: layoutClassNames,
    isContentLocked,
    multiGallerySelection
  } = props;
  const {
    align,
    columns,
    imageCrop
  } = attributes;
  return /*#__PURE__*/_jsxs("figure", {
    ...blockProps,
    className: clsx(blockProps.className, layoutClassNames, 'blocks-gallery-grid', {
      [`align${align}`]: align,
      [`columns-${columns}`]: columns !== undefined,
      [`columns-default`]: columns === undefined,
      'is-cropped': imageCrop
    }),
    children: [blockProps.children, isSelected && !blockProps.children && /*#__PURE__*/_jsx(View, {
      className: "blocks-gallery-media-placeholder-wrapper",
      children: mediaPlaceholder
    }), /*#__PURE__*/_jsx(Caption, {
      attributes: attributes,
      setAttributes: setAttributes,
      isSelected: isSelected,
      insertBlocksAfter: insertBlocksAfter,
      showToolbarButton: !multiGallerySelection && !isContentLocked,
      className: "blocks-gallery-caption",
      label: __('Gallery caption text'),
      placeholder: __('Add gallery caption')
    })]
  });
}
//# sourceMappingURL=gallery.js.map