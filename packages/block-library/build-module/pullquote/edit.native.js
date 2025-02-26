/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { AlignmentControl, BlockControls, RichText, useBlockProps, getColorObjectByAttributeValues, __experimentalGetColorClassesAndStyles as getColorClassesAndStyles } from '@wordpress/block-editor';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Figure } from './figure';
import { BlockQuote } from './blockquote';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const getBackgroundColor = ({
  attributes,
  colors,
  style
}) => {
  const {
    backgroundColor
  } = attributes;
  const colorProps = getColorClassesAndStyles(attributes);
  const colorObject = getColorObjectByAttributeValues(colors, backgroundColor);
  return colorObject?.color || colorProps.style?.backgroundColor || colorProps.style?.background || style?.backgroundColor;
};
const getTextColor = ({
  attributes,
  colors,
  style
}) => {
  const colorProps = getColorClassesAndStyles(attributes);
  const colorObject = getColorObjectByAttributeValues(colors, attributes.textColor);
  return colorObject?.color || colorProps.style?.color || style?.color || style?.baseColors?.color?.text;
};
const getBorderColor = props => {
  const {
    wrapperProps
  } = props;
  const defaultColor = getTextColor(props);
  return wrapperProps?.style?.borderColor || defaultColor;
};
/**
 * Internal dependencies
 */

function PullQuoteEdit(props) {
  const {
    attributes,
    setAttributes,
    isSelected,
    insertBlocksAfter
  } = props;
  const {
    textAlign,
    citation,
    value
  } = attributes;
  const blockProps = useBlockProps({
    backgroundColor: getBackgroundColor(props),
    borderColor: getBorderColor(props)
  });
  const shouldShowCitation = !RichText.isEmpty(citation) || isSelected;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsx(Figure, {
      ...blockProps,
      children: /*#__PURE__*/_jsxs(BlockQuote, {
        textColor: getTextColor(props),
        children: [/*#__PURE__*/_jsx(RichText, {
          identifier: "value",
          value: value,
          onChange: nextValue => setAttributes({
            value: nextValue
          }),
          "aria-label": __('Pullquote text'),
          placeholder:
          // translators: placeholder text used for the quote
          __('Add quote'),
          textAlign: textAlign !== null && textAlign !== void 0 ? textAlign : 'center'
        }), shouldShowCitation && /*#__PURE__*/_jsx(RichText, {
          identifier: "citation",
          value: citation,
          "aria-label": __('Pullquote citation text'),
          placeholder:
          // translators: placeholder text used for the citation
          __('Add citation'),
          onChange: nextCitation => setAttributes({
            citation: nextCitation
          }),
          __unstableMobileNoFocusOnMount: true,
          textAlign: textAlign !== null && textAlign !== void 0 ? textAlign : 'center',
          __unstableOnSplitAtEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName()))
        })]
      })
    })]
  });
}
export default PullQuoteEdit;
//# sourceMappingURL=edit.native.js.map