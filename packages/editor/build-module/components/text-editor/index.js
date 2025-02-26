/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostTextEditor from '../post-text-editor';
import PostTitleRaw from '../post-title/post-title-raw';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TextEditor({
  autoFocus = false
}) {
  const {
    switchEditorMode
  } = useDispatch(editorStore);
  const {
    shortcut,
    isRichEditingEnabled
  } = useSelect(select => {
    const {
      getEditorSettings
    } = select(editorStore);
    const {
      getShortcutRepresentation
    } = select(keyboardShortcutsStore);
    return {
      shortcut: getShortcutRepresentation('core/editor/toggle-mode'),
      isRichEditingEnabled: getEditorSettings().richEditingEnabled
    };
  }, []);
  const titleRef = useRef();
  useEffect(() => {
    if (autoFocus) {
      return;
    }
    titleRef?.current?.focus();
  }, [autoFocus]);
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-text-editor",
    children: [isRichEditingEnabled && /*#__PURE__*/_jsxs("div", {
      className: "editor-text-editor__toolbar",
      children: [/*#__PURE__*/_jsx("h2", {
        children: __('Editing code')
      }), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "tertiary",
        onClick: () => switchEditorMode('visual'),
        shortcut: shortcut,
        children: __('Exit code editor')
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "editor-text-editor__body",
      children: [/*#__PURE__*/_jsx(PostTitleRaw, {
        ref: titleRef
      }), /*#__PURE__*/_jsx(PostTextEditor, {})]
    })]
  });
}
//# sourceMappingURL=index.js.map