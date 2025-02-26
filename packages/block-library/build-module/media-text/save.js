/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { imageFillStyles } from './image-fill';
import { DEFAULT_MEDIA_SIZE_SLUG } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_MEDIA_WIDTH = 50;
const noop = () => {};
export default function save({
  attributes
}) {
  const {
    isStackedOnMobile,
    mediaAlt,
    mediaPosition,
    mediaType,
    mediaUrl,
    mediaWidth,
    mediaId,
    verticalAlignment,
    imageFill,
    focalPoint,
    linkClass,
    href,
    linkTarget,
    rel
  } = attributes;
  const mediaSizeSlug = attributes.mediaSizeSlug || DEFAULT_MEDIA_SIZE_SLUG;
  const newRel = !rel ? undefined : rel;
  const imageClasses = clsx({
    [`wp-image-${mediaId}`]: mediaId && mediaType === 'image',
    [`size-${mediaSizeSlug}`]: mediaId && mediaType === 'image'
  });
  const positionStyles = imageFill ? imageFillStyles(mediaUrl, focalPoint) : {};
  let image = mediaUrl ? /*#__PURE__*/_jsx("img", {
    src: mediaUrl,
    alt: mediaAlt,
    className: imageClasses || null,
    style: positionStyles
  }) : null;
  if (href) {
    image = /*#__PURE__*/_jsx("a", {
      className: linkClass,
      href: href,
      target: linkTarget,
      rel: newRel,
      children: image
    });
  }
  const mediaTypeRenders = {
    image: () => image,
    video: () => /*#__PURE__*/_jsx("video", {
      controls: true,
      src: mediaUrl
    })
  };
  const className = clsx({
    'has-media-on-the-right': 'right' === mediaPosition,
    'is-stacked-on-mobile': isStackedOnMobile,
    [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
    'is-image-fill-element': imageFill
  });
  let gridTemplateColumns;
  if (mediaWidth !== DEFAULT_MEDIA_WIDTH) {
    gridTemplateColumns = 'right' === mediaPosition ? `auto ${mediaWidth}%` : `${mediaWidth}% auto`;
  }
  const style = {
    gridTemplateColumns
  };
  if ('right' === mediaPosition) {
    return /*#__PURE__*/_jsxs("div", {
      ...useBlockProps.save({
        className,
        style
      }),
      children: [/*#__PURE__*/_jsx("div", {
        ...useInnerBlocksProps.save({
          className: 'wp-block-media-text__content'
        })
      }), /*#__PURE__*/_jsx("figure", {
        className: "wp-block-media-text__media",
        children: (mediaTypeRenders[mediaType] || noop)()
      })]
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    ...useBlockProps.save({
      className,
      style
    }),
    children: [/*#__PURE__*/_jsx("figure", {
      className: "wp-block-media-text__media",
      children: (mediaTypeRenders[mediaType] || noop)()
    }), /*#__PURE__*/_jsx("div", {
      ...useInnerBlocksProps.save({
        className: 'wp-block-media-text__content'
      })
    })]
  });
}
//# sourceMappingURL=save.js.map