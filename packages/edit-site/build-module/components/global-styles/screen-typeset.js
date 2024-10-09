/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import TypographyVariations from './variations/variations-typography';
import ScreenHeader from './header';
import FontFamilies from './font-families';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ScreenTypeset() {
  const fontLibraryEnabled = useSelect(select => select(editorStore).getEditorSettings().fontLibraryEnabled, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Typesets'),
      description: __('Fonts and typographic styling applied across the site.')
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-site-global-styles-screen",
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 7,
        children: [/*#__PURE__*/_jsx(TypographyVariations, {}), fontLibraryEnabled && /*#__PURE__*/_jsx(FontFamilies, {})]
      })
    })]
  });
}
export default ScreenTypeset;
//# sourceMappingURL=screen-typeset.js.map