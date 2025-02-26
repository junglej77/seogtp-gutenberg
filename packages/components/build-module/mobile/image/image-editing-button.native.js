/**
 * External dependencies
 */
import { TouchableWithoutFeedback, View, Platform } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { MediaEdit } from '../media-edit';
import SvgIconCustomize from './icon-customize';
import styles from './style.scss';
import Icon from '../../icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const accessibilityHint = Platform.OS === 'ios' ? __('Double tap to open Action Sheet to edit, replace, or clear the image') : __('Double tap to open Bottom Sheet to edit, replace, or clear the image');
const ImageEditingButton = ({
  onSelectMediaUploadOption,
  openMediaOptions,
  pickerOptions,
  url
}) => {
  return /*#__PURE__*/_jsx(MediaEdit, {
    onSelect: onSelectMediaUploadOption,
    source: {
      uri: url
    },
    openReplaceMediaOptions: openMediaOptions,
    render: ({
      open,
      mediaOptions
    }) => /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      accessibilityHint: accessibilityHint,
      accessibilityLabel: __('Edit image'),
      accessibilityRole: "button",
      onPress: open,
      children: /*#__PURE__*/_jsx(View, {
        style: styles.editContainer,
        children: /*#__PURE__*/_jsxs(View, {
          style: styles.edit,
          children: [mediaOptions(), /*#__PURE__*/_jsx(Icon, {
            size: 16,
            icon: SvgIconCustomize,
            ...styles.iconCustomise
          })]
        })
      })
    }),
    pickerOptions: pickerOptions
  });
};
export default ImageEditingButton;
//# sourceMappingURL=image-editing-button.native.js.map