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
import { HelpDetailBodyText, HelpDetailImage, HelpDetailSectionHeadingText } from './view-sections';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MoveBlocks = () => {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HelpDetailImage, {
      source: require('./images/drag-and-drop-light.png'),
      sourceDarkMode: require('./images/drag-and-drop-dark.png')
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.helpDetailContainer,
      children: [/*#__PURE__*/_jsx(HelpDetailSectionHeadingText, {
        text: __('Drag & drop'),
        badge: __('NEW')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Drag & drop makes rearranging blocks a breeze. Press and hold on a block, then drag it to its new location and release.')
      })]
    }), /*#__PURE__*/_jsx(HelpDetailImage, {
      source: require('./images/move-light.png'),
      sourceDarkMode: require('./images/move-dark.png')
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.helpDetailContainer,
      children: [/*#__PURE__*/_jsx(HelpDetailSectionHeadingText, {
        text: __('Arrow buttons')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('You can also rearrange blocks by tapping a block and then tapping the up and down arrows that appear on the bottom left side of the block to move it up or down.')
      })]
    })]
  });
};
export default MoveBlocks;
//# sourceMappingURL=move-blocks.native.js.map