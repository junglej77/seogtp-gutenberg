/**
 * WordPress dependencies
 */
import { BlockList, BlockToolbar, BlockTools, BlockSelectionClearer, WritingFlow, __unstableEditorStyles as EditorStyles } from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import Notices from '../notices';
import KeyboardShortcuts from '../keyboard-shortcuts';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WidgetAreasBlockEditorContent({
  blockEditorSettings
}) {
  const hasThemeStyles = useSelect(select => !!select(preferencesStore).get('core/edit-widgets', 'themeStyles'), []);
  const isLargeViewport = useViewportMatch('medium');
  const styles = useMemo(() => {
    return hasThemeStyles ? blockEditorSettings.styles : [];
  }, [blockEditorSettings, hasThemeStyles]);
  return /*#__PURE__*/_jsxs("div", {
    className: "edit-widgets-block-editor",
    children: [/*#__PURE__*/_jsx(Notices, {}), !isLargeViewport && /*#__PURE__*/_jsx(BlockToolbar, {
      hideDragHandle: true
    }), /*#__PURE__*/_jsxs(BlockTools, {
      children: [/*#__PURE__*/_jsx(KeyboardShortcuts, {}), /*#__PURE__*/_jsx(EditorStyles, {
        styles: styles,
        scope: ":where(.editor-styles-wrapper)"
      }), /*#__PURE__*/_jsx(BlockSelectionClearer, {
        children: /*#__PURE__*/_jsx(WritingFlow, {
          children: /*#__PURE__*/_jsx(BlockList, {
            className: "edit-widgets-main-block-list"
          })
        })
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map