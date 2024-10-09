/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack, __experimentalSpacer as Spacer } from '@wordpress/components';

/**
 * Internal dependencies
 */
import LibraryFontVariant from './library-font-variant';
import { sortFontFaces } from './utils/sort-font-faces';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function LibraryFontDetails({
  font
}) {
  const fontFaces = font.fontFace && font.fontFace.length ? sortFontFaces(font.fontFace) : [{
    fontFamily: font.fontFamily,
    fontStyle: 'normal',
    fontWeight: '400'
  }];
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Spacer, {
      margin: 4
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 0,
      children: [/*#__PURE__*/_jsx(Spacer, {
        margin: 8
      }), fontFaces.map((face, i) => /*#__PURE__*/_jsx(LibraryFontVariant, {
        font: font,
        face: face
      }, `face${i}`))]
    }), /*#__PURE__*/_jsx(Spacer, {
      margin: 8
    })]
  });
}
export default LibraryFontDetails;
//# sourceMappingURL=library-font-details.js.map