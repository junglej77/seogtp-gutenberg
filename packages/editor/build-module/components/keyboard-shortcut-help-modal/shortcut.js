/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { displayShortcutList, shortcutAriaLabel } from '@wordpress/keycodes';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function KeyCombination({
  keyCombination,
  forceAriaLabel
}) {
  const shortcut = keyCombination.modifier ? displayShortcutList[keyCombination.modifier](keyCombination.character) : keyCombination.character;
  const ariaLabel = keyCombination.modifier ? shortcutAriaLabel[keyCombination.modifier](keyCombination.character) : keyCombination.character;
  return /*#__PURE__*/_jsx("kbd", {
    className: "editor-keyboard-shortcut-help-modal__shortcut-key-combination",
    "aria-label": forceAriaLabel || ariaLabel,
    children: (Array.isArray(shortcut) ? shortcut : [shortcut]).map((character, index) => {
      if (character === '+') {
        return /*#__PURE__*/_jsx(Fragment, {
          children: character
        }, index);
      }
      return /*#__PURE__*/_jsx("kbd", {
        className: "editor-keyboard-shortcut-help-modal__shortcut-key",
        children: character
      }, index);
    })
  });
}
function Shortcut({
  description,
  keyCombination,
  aliases = [],
  ariaLabel
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: "editor-keyboard-shortcut-help-modal__shortcut-description",
      children: description
    }), /*#__PURE__*/_jsxs("div", {
      className: "editor-keyboard-shortcut-help-modal__shortcut-term",
      children: [/*#__PURE__*/_jsx(KeyCombination, {
        keyCombination: keyCombination,
        forceAriaLabel: ariaLabel
      }), aliases.map((alias, index) => /*#__PURE__*/_jsx(KeyCombination, {
        keyCombination: alias,
        forceAriaLabel: ariaLabel
      }, index))]
    })]
  });
}
export default Shortcut;
//# sourceMappingURL=shortcut.js.map