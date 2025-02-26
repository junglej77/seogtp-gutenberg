/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, __experimentalGetElementClassName, __experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles, __experimentalGetShadowClassesAndStyles as getShadowClassesAndStyles } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    url,
    alt,
    caption,
    align,
    href,
    rel,
    linkClass,
    width,
    height,
    aspectRatio,
    scale,
    id,
    linkTarget,
    sizeSlug,
    title
  } = attributes;
  const newRel = !rel ? undefined : rel;
  const borderProps = getBorderClassesAndStyles(attributes);
  const shadowProps = getShadowClassesAndStyles(attributes);
  const classes = clsx({
    // All other align classes are handled by block supports.
    // `{ align: 'none' }` is unique to transforms for the image block.
    alignnone: 'none' === align,
    [`size-${sizeSlug}`]: sizeSlug,
    'is-resized': width || height,
    'has-custom-border': !!borderProps.className || borderProps.style && Object.keys(borderProps.style).length > 0
  });
  const imageClasses = clsx(borderProps.className, {
    [`wp-image-${id}`]: !!id
  });
  const image = /*#__PURE__*/_jsx("img", {
    src: url,
    alt: alt,
    className: imageClasses || undefined,
    style: {
      ...borderProps.style,
      ...shadowProps.style,
      aspectRatio,
      objectFit: scale,
      width,
      height
    },
    title: title
  });
  const figure = /*#__PURE__*/_jsxs(_Fragment, {
    children: [href ? /*#__PURE__*/_jsx("a", {
      className: linkClass,
      href: href,
      target: linkTarget,
      rel: newRel,
      children: image
    }) : image, !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
      className: __experimentalGetElementClassName('caption'),
      tagName: "figcaption",
      value: caption
    })]
  });
  return /*#__PURE__*/_jsx("figure", {
    ...useBlockProps.save({
      className: classes
    }),
    children: figure
  });
}
//# sourceMappingURL=save.js.map