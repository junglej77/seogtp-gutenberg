/**
 * External dependencies
 */
import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function InserterNoResults() {
  const {
    'inserter-search-no-results__container': containerStyle,
    'inserter-search-no-results__text-primary': textPrimaryBaseStyle,
    'inserter-search-no-results__text-primary--dark': textPrimaryDarkStyle,
    'inserter-search-no-results__text-secondary': textSecondaryBaseStyle,
    'inserter-search-no-results__text-secondary--dark': textSecondaryDarkStyle
  } = styles;
  const textPrimaryStyle = usePreferredColorSchemeStyle(textPrimaryBaseStyle, textPrimaryDarkStyle);
  const textSecondaryStyle = usePreferredColorSchemeStyle(textSecondaryBaseStyle, textSecondaryDarkStyle);
  return /*#__PURE__*/_jsx(View, {
    children: /*#__PURE__*/_jsxs(View, {
      style: containerStyle,
      children: [/*#__PURE__*/_jsx(Text, {
        style: textPrimaryStyle,
        children: __('No blocks found')
      }), /*#__PURE__*/_jsx(Text, {
        style: textSecondaryStyle,
        children: __('Try another search term')
      })]
    })
  });
}
export default InserterNoResults;
//# sourceMappingURL=no-results.native.js.map