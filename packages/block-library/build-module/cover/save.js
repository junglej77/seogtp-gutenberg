/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, getColorClassName, __experimentalGetGradientClass, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { IMAGE_BACKGROUND_TYPE, VIDEO_BACKGROUND_TYPE, dimRatioToClass, isContentPositionCenter, getPositionClassName, mediaPosition } from './shared';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    backgroundType,
    gradient,
    contentPosition,
    customGradient,
    customOverlayColor,
    dimRatio,
    focalPoint,
    useFeaturedImage,
    hasParallax,
    isDark,
    isRepeated,
    overlayColor,
    url,
    alt,
    id,
    minHeight: minHeightProp,
    minHeightUnit,
    tagName: Tag
  } = attributes;
  const overlayColorClass = getColorClassName('background-color', overlayColor);
  const gradientClass = __experimentalGetGradientClass(gradient);
  const minHeight = minHeightProp && minHeightUnit ? `${minHeightProp}${minHeightUnit}` : minHeightProp;
  const isImageBackground = IMAGE_BACKGROUND_TYPE === backgroundType;
  const isVideoBackground = VIDEO_BACKGROUND_TYPE === backgroundType;
  const isImgElement = !(hasParallax || isRepeated);
  const style = {
    minHeight: minHeight || undefined
  };
  const bgStyle = {
    backgroundColor: !overlayColorClass ? customOverlayColor : undefined,
    background: customGradient ? customGradient : undefined
  };
  const objectPosition =
  // prettier-ignore
  focalPoint && isImgElement ? mediaPosition(focalPoint) : undefined;
  const backgroundImage = url ? `url(${url})` : undefined;
  const backgroundPosition = mediaPosition(focalPoint);
  const classes = clsx({
    'is-light': !isDark,
    'has-parallax': hasParallax,
    'is-repeated': isRepeated,
    'has-custom-content-position': !isContentPositionCenter(contentPosition)
  }, getPositionClassName(contentPosition));
  const imgClasses = clsx('wp-block-cover__image-background', id ? `wp-image-${id}` : null, {
    'has-parallax': hasParallax,
    'is-repeated': isRepeated
  });
  const gradientValue = gradient || customGradient;
  return /*#__PURE__*/_jsxs(Tag, {
    ...useBlockProps.save({
      className: classes,
      style
    }),
    children: [/*#__PURE__*/_jsx("span", {
      "aria-hidden": "true",
      className: clsx('wp-block-cover__background', overlayColorClass, dimRatioToClass(dimRatio), {
        'has-background-dim': dimRatio !== undefined,
        // For backwards compatibility. Former versions of the Cover Block applied
        // `.wp-block-cover__gradient-background` in the presence of
        // media, a gradient and a dim.
        'wp-block-cover__gradient-background': url && gradientValue && dimRatio !== 0,
        'has-background-gradient': gradientValue,
        [gradientClass]: gradientClass
      }),
      style: bgStyle
    }), !useFeaturedImage && isImageBackground && url && (isImgElement ? /*#__PURE__*/_jsx("img", {
      className: imgClasses,
      alt: alt,
      src: url,
      style: {
        objectPosition
      },
      "data-object-fit": "cover",
      "data-object-position": objectPosition
    }) : /*#__PURE__*/_jsx("div", {
      role: alt ? 'img' : undefined,
      "aria-label": alt ? alt : undefined,
      className: imgClasses,
      style: {
        backgroundPosition,
        backgroundImage
      }
    })), isVideoBackground && url && /*#__PURE__*/_jsx("video", {
      className: clsx('wp-block-cover__video-background', 'intrinsic-ignore'),
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      src: url,
      style: {
        objectPosition
      },
      "data-object-fit": "cover",
      "data-object-position": objectPosition
    }), /*#__PURE__*/_jsx("div", {
      ...useInnerBlocksProps.save({
        className: 'wp-block-cover__inner-container'
      })
    })]
  });
}
//# sourceMappingURL=save.js.map