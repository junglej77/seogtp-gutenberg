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
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const RemoveBlocks = () => {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HelpDetailImage, {
      source: require('./images/options-light.png'),
      sourceDarkMode: require('./images/options-dark.png')
    }), /*#__PURE__*/_jsx(View, {
      style: styles.helpDetailContainer,
      children: /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('To remove a block, select the block and click the three dots in the bottom right of the block to view the settings. From there, choose the option to remove the block.')
      })
    })]
  });
};
export default RemoveBlocks;
//# sourceMappingURL=remove-blocks.native.js.map