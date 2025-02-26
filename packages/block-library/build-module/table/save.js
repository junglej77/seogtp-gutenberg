/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, __experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles, __experimentalGetColorClassesAndStyles as getColorClassesAndStyles, __experimentalGetElementClassName } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    hasFixedLayout,
    head,
    body,
    foot,
    caption
  } = attributes;
  const isEmpty = !head.length && !body.length && !foot.length;
  if (isEmpty) {
    return null;
  }
  const colorProps = getColorClassesAndStyles(attributes);
  const borderProps = getBorderClassesAndStyles(attributes);
  const classes = clsx(colorProps.className, borderProps.className, {
    'has-fixed-layout': hasFixedLayout
  });
  const hasCaption = !RichText.isEmpty(caption);
  const Section = ({
    type,
    rows
  }) => {
    if (!rows.length) {
      return null;
    }
    const Tag = `t${type}`;
    return /*#__PURE__*/_jsx(Tag, {
      children: rows.map(({
        cells
      }, rowIndex) => /*#__PURE__*/_jsx("tr", {
        children: cells.map(({
          content,
          tag,
          scope,
          align,
          colspan,
          rowspan
        }, cellIndex) => {
          const cellClasses = clsx({
            [`has-text-align-${align}`]: align
          });
          return /*#__PURE__*/_jsx(RichText.Content, {
            className: cellClasses ? cellClasses : undefined,
            "data-align": align,
            tagName: tag,
            value: content,
            scope: tag === 'th' ? scope : undefined,
            colSpan: colspan,
            rowSpan: rowspan
          }, cellIndex);
        })
      }, rowIndex))
    });
  };
  return /*#__PURE__*/_jsxs("figure", {
    ...useBlockProps.save(),
    children: [/*#__PURE__*/_jsxs("table", {
      className: classes === '' ? undefined : classes,
      style: {
        ...colorProps.style,
        ...borderProps.style
      },
      children: [/*#__PURE__*/_jsx(Section, {
        type: "head",
        rows: head
      }), /*#__PURE__*/_jsx(Section, {
        type: "body",
        rows: body
      }), /*#__PURE__*/_jsx(Section, {
        type: "foot",
        rows: foot
      })]
    }), hasCaption && /*#__PURE__*/_jsx(RichText.Content, {
      tagName: "figcaption",
      value: caption,
      className: __experimentalGetElementClassName('caption')
    })]
  });
}
//# sourceMappingURL=save.js.map