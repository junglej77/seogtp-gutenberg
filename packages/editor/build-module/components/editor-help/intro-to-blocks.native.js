/**
 * External dependencies
 */
import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { HelpDetailBodyText, HelpDetailSectionHeadingText, HelpDetailImage } from './view-sections';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const IntroToBlocks = () => {
  const titleStyle = usePreferredColorSchemeStyle(styles.helpDetailTitle, styles.helpDetailTitleDark);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(HelpDetailImage, {
      source: require('./images/block-layout-collage.png')
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.helpDetailContainer,
      children: [/*#__PURE__*/_jsx(Text, {
        accessibilityRole: "header",
        selectable: true,
        style: titleStyle,
        children: __('Welcome to the world of blocks')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Blocks are pieces of content that you can insert, rearrange, and style without needing to know how to code. Blocks are an easy and modern way for you to create beautiful layouts.')
      }), /*#__PURE__*/_jsx(HelpDetailSectionHeadingText, {
        text: __('Rich text editing')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Blocks allow you to focus on writing your content, knowing that all the formatting tools you need are there to help you get your message across.')
      }), /*#__PURE__*/_jsx(HelpDetailImage, {
        accessible: true,
        accessibilityLabel: __('Text formatting controls are located within the toolbar positioned above the keyboard while editing a text block'),
        source: require('./images/rich-text-light.png'),
        sourceDarkMode: require('./images/rich-text-dark.png')
      }), /*#__PURE__*/_jsx(HelpDetailSectionHeadingText, {
        text: __('Embed media')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Make your content stand out by adding images, gifs, videos, and embedded media to your pages.')
      }), /*#__PURE__*/_jsx(HelpDetailImage, {
        source: require('./images/embed-media-light.png'),
        sourceDarkMode: require('./images/embed-media-dark.png')
      }), /*#__PURE__*/_jsx(HelpDetailSectionHeadingText, {
        text: __('Build layouts')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Arrange your content into columns, add Call to Action buttons, and overlay images with text.')
      }), /*#__PURE__*/_jsx(HelpDetailImage, {
        source: require('./images/build-layouts-light.png'),
        sourceDarkMode: require('./images/build-layouts-dark.png')
      }), /*#__PURE__*/_jsx(HelpDetailBodyText, {
        text: __('Give it a try by adding a few blocks to your post or page!')
      })]
    })]
  });
};
export default IntroToBlocks;
//# sourceMappingURL=intro-to-blocks.native.js.map