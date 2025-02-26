/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import WordCount from '../word-count';
import TimeToRead from '../time-to-read';
import DocumentOutline from '../document-outline';
import CharacterCount from '../character-count';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function TableOfContentsPanel({
  hasOutlineItemsDisabled,
  onRequestClose
}) {
  const {
    headingCount,
    paragraphCount,
    numberOfBlocks
  } = useSelect(select => {
    const {
      getGlobalBlockCount
    } = select(blockEditorStore);
    return {
      headingCount: getGlobalBlockCount('core/heading'),
      paragraphCount: getGlobalBlockCount('core/paragraph'),
      numberOfBlocks: getGlobalBlockCount()
    };
  }, []);
  return (
    /*#__PURE__*/
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */
    /* eslint-disable jsx-a11y/no-redundant-roles */
    _jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        className: "table-of-contents__wrapper",
        role: "note",
        "aria-label": __('Document Statistics'),
        tabIndex: "0",
        children: /*#__PURE__*/_jsxs("ul", {
          role: "list",
          className: "table-of-contents__counts",
          children: [/*#__PURE__*/_jsxs("li", {
            className: "table-of-contents__count",
            children: [__('Words'), /*#__PURE__*/_jsx(WordCount, {})]
          }), /*#__PURE__*/_jsxs("li", {
            className: "table-of-contents__count",
            children: [__('Characters'), /*#__PURE__*/_jsx("span", {
              className: "table-of-contents__number",
              children: /*#__PURE__*/_jsx(CharacterCount, {})
            })]
          }), /*#__PURE__*/_jsxs("li", {
            className: "table-of-contents__count",
            children: [__('Time to read'), /*#__PURE__*/_jsx(TimeToRead, {})]
          }), /*#__PURE__*/_jsxs("li", {
            className: "table-of-contents__count",
            children: [__('Headings'), /*#__PURE__*/_jsx("span", {
              className: "table-of-contents__number",
              children: headingCount
            })]
          }), /*#__PURE__*/_jsxs("li", {
            className: "table-of-contents__count",
            children: [__('Paragraphs'), /*#__PURE__*/_jsx("span", {
              className: "table-of-contents__number",
              children: paragraphCount
            })]
          }), /*#__PURE__*/_jsxs("li", {
            className: "table-of-contents__count",
            children: [__('Blocks'), /*#__PURE__*/_jsx("span", {
              className: "table-of-contents__number",
              children: numberOfBlocks
            })]
          })]
        })
      }), headingCount > 0 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("hr", {}), /*#__PURE__*/_jsx("h2", {
          className: "table-of-contents__title",
          children: __('Document Outline')
        }), /*#__PURE__*/_jsx(DocumentOutline, {
          onSelect: onRequestClose,
          hasOutlineItemsDisabled: hasOutlineItemsDisabled
        })]
      })]
    })
    /* eslint-enable jsx-a11y/no-redundant-roles */
  );
}
export default TableOfContentsPanel;
//# sourceMappingURL=panel.js.map