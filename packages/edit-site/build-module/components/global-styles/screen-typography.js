/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalVStack as VStack } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import TypographyElements from './typography-elements';
import ScreenHeader from './header';
import FontSizesCount from './font-sizes/font-sizes-count';
import TypesetButton from './typeset-button';
import FontFamilies from './font-families';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ScreenTypography() {
  const fontLibraryEnabled = useSelect(select => select(editorStore).getEditorSettings().fontLibraryEnabled, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Typography'),
      description: __('Typography styles and the application of those styles on site elements.')
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-site-global-styles-screen",
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 7,
        children: [/*#__PURE__*/_jsx(TypesetButton, {}), fontLibraryEnabled && /*#__PURE__*/_jsx(FontFamilies, {}), /*#__PURE__*/_jsx(TypographyElements, {}), /*#__PURE__*/_jsx(FontSizesCount, {})]
      })
    })]
  });
}
export default ScreenTypography;
//# sourceMappingURL=screen-typography.js.map