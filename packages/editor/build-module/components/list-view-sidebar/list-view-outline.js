/**
 * WordPress dependencies
 */
import { __experimentalText as Text } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CharacterCount from '../character-count';
import WordCount from '../word-count';
import TimeToRead from '../time-to-read';
import DocumentOutline from '../document-outline';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function ListViewOutline() {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "editor-list-view-sidebar__outline",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Text, {
          children: __('Characters:')
        }), /*#__PURE__*/_jsx(Text, {
          children: /*#__PURE__*/_jsx(CharacterCount, {})
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Text, {
          children: __('Words:')
        }), /*#__PURE__*/_jsx(WordCount, {})]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Text, {
          children: __('Time to read:')
        }), /*#__PURE__*/_jsx(TimeToRead, {})]
      })]
    }), /*#__PURE__*/_jsx(DocumentOutline, {})]
  });
}
//# sourceMappingURL=list-view-outline.js.map