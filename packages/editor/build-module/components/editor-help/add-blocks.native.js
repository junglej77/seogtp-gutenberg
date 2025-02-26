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
const AddBlocks = () => {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HelpDetailImage, {
      source: require('./images/add-light.png'),
      sourceDarkMode: require('./images/add-dark.png')
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.helpDetailContainer,
      children: [/*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Add a new block at any time by tapping on the + icon in the toolbar on the bottom left.')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Once you become familiar with the names of different blocks, you can add a block by typing a forward slash followed by the block name — for example, /image or /heading.')
      })]
    })]
  });
};
export default AddBlocks;
//# sourceMappingURL=add-blocks.native.js.map