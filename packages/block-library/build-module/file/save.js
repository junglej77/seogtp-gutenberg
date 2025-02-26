/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, __experimentalGetElementClassName } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    href,
    fileId,
    fileName,
    textLinkHref,
    textLinkTarget,
    showDownloadButton,
    downloadButtonText,
    displayPreview,
    previewHeight
  } = attributes;
  const pdfEmbedLabel = RichText.isEmpty(fileName) ? 'PDF embed' :
  // To do: use toPlainText, but we need ensure it's RichTextData. See
  // https://github.com/WordPress/gutenberg/pull/56710.
  fileName.toString();
  const hasFilename = !RichText.isEmpty(fileName);

  // Only output an `aria-describedby` when the element it's referring to is
  // actually rendered.
  const describedById = hasFilename ? fileId : undefined;
  return href && /*#__PURE__*/_jsxs("div", {
    ...useBlockProps.save(),
    children: [displayPreview && /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx("object", {
        className: "wp-block-file__embed",
        data: href,
        type: "application/pdf",
        style: {
          width: '100%',
          height: `${previewHeight}px`
        },
        "aria-label": pdfEmbedLabel
      })
    }), hasFilename && /*#__PURE__*/_jsx("a", {
      id: describedById,
      href: textLinkHref,
      target: textLinkTarget,
      rel: textLinkTarget ? 'noreferrer noopener' : undefined,
      children: /*#__PURE__*/_jsx(RichText.Content, {
        value: fileName
      })
    }), showDownloadButton && /*#__PURE__*/_jsx("a", {
      href: href,
      className: clsx('wp-block-file__button', __experimentalGetElementClassName('button')),
      download: true,
      "aria-describedby": describedById,
      children: /*#__PURE__*/_jsx(RichText.Content, {
        value: downloadButtonText
      })
    })]
  });
}
//# sourceMappingURL=save.js.map