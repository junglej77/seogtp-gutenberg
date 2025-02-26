/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { HelpDetailBodyText, HelpDetailImage } from './view-sections';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const CustomizeBlocks = () => {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HelpDetailImage, {
      source: require('./images/settings-light.png'),
      sourceDarkMode: require('./images/settings-dark.png')
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.helpDetailContainer,
      children: [/*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Each block has its own settings. To find them, tap on a block. Its settings will appear on the toolbar at the bottom of the screen.')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Some blocks have additional settings. Tap the settings icon on the bottom right of the block to view more options.')
      })]
    })]
  });
};
export default CustomizeBlocks;
//# sourceMappingURL=customize-blocks.native.js.map