/**
 * External dependencies
 */
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, check, chevronRight } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
import { BottomSheet, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import styles from './style.native.scss';
import { blockSettingsScreens } from '../block-settings';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const LINK_DESTINATION_NONE = 'none';
const LINK_DESTINATION_MEDIA = 'media';
const LINK_DESTINATION_ATTACHMENT = 'attachment';
const LINK_DESTINATION_CUSTOM = 'custom';
function LinkDestination({
  children,
  isSelected,
  label,
  onPress,
  value,
  valueStyle
}) {
  const optionIcon = usePreferredColorSchemeStyle(styles.optionIcon, styles.optionIconDark);
  return /*#__PURE__*/_jsx(BottomSheet.Cell, {
    icon: check,
    iconStyle: StyleSheet.flatten([optionIcon, !isSelected && styles.unselectedOptionIcon]),
    label: label,
    leftAlign: true,
    onPress: onPress,
    value: value,
    valueStyle: valueStyle,
    separatorType: "leftMargin",
    children: children
  });
}
function ImageLinkDestinationsScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    url = ''
  } = props;
  const {
    inputValue = url,
    imageUrl,
    attachmentPageUrl,
    linkDestination
  } = route.params || {};
  function goToLinkPicker() {
    navigation.navigate(blockSettingsScreens.linkPicker, {
      inputValue: linkDestination === LINK_DESTINATION_CUSTOM ? inputValue : ''
    });
  }
  const setLinkDestination = newLinkDestination => () => {
    let newUrl;
    switch (newLinkDestination) {
      case LINK_DESTINATION_MEDIA:
        newUrl = imageUrl;
        break;
      case LINK_DESTINATION_ATTACHMENT:
        newUrl = attachmentPageUrl;
        break;
      default:
        newUrl = '';
        break;
    }
    navigation.navigate(blockSettingsScreens.settings, {
      // The `inputValue` name is reused from LinkPicker, as it helps avoid
      // bugs from stale values remaining in the React Navigation route
      // parameters.
      inputValue: newUrl,
      // Clear link text value that may be set from LinkPicker.
      text: ''
    });
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(BottomSheet.NavBar, {
      children: [/*#__PURE__*/_jsx(BottomSheet.NavBar.BackButton, {
        onPress: navigation.goBack
      }), /*#__PURE__*/_jsx(BottomSheet.NavBar.Heading, {
        children: __('Link To')
      })]
    }), /*#__PURE__*/_jsxs(PanelBody, {
      children: [/*#__PURE__*/_jsx(LinkDestination, {
        isSelected: linkDestination === LINK_DESTINATION_NONE,
        label: __('None'),
        onPress: setLinkDestination(LINK_DESTINATION_NONE)
      }), /*#__PURE__*/_jsx(LinkDestination, {
        isSelected: linkDestination === LINK_DESTINATION_MEDIA,
        label: __('Media File'),
        onPress: setLinkDestination(LINK_DESTINATION_MEDIA)
      }), !!attachmentPageUrl && /*#__PURE__*/_jsx(LinkDestination, {
        isSelected: linkDestination === LINK_DESTINATION_ATTACHMENT,
        label: __('Attachment Page'),
        onPress: setLinkDestination(LINK_DESTINATION_ATTACHMENT)
      }), /*#__PURE__*/_jsx(LinkDestination, {
        isSelected: linkDestination === LINK_DESTINATION_CUSTOM,
        label: __('Custom URL'),
        onPress: goToLinkPicker,
        value: linkDestination === LINK_DESTINATION_CUSTOM ? inputValue : '',
        valueStyle: linkDestination === LINK_DESTINATION_CUSTOM ? undefined : styles.placeholderTextColor,
        children: /*#__PURE__*/_jsx(Icon, {
          icon: chevronRight
        })
      })]
    })]
  });
}
export default ImageLinkDestinationsScreen;
//# sourceMappingURL=index.native.js.map