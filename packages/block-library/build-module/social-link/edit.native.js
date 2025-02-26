/**
 * External dependencies
 */
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

/**
 * WordPress dependencies
 */
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton, LinkSettingsNavigation } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { link, Icon } from '@wordpress/icons';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { getIconBySite, getNameBySite } from './social-list';
import styles from './editor.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_ACTIVE_ICON_STYLES = {
  backgroundColor: '#f0f0f0',
  color: '#444'
};
const ANIMATION_DELAY = 300;
const ANIMATION_DURATION = 400;
const linkSettingsOptions = {
  url: {
    label: __('URL'),
    placeholder: __('Add URL'),
    autoFocus: true
  },
  linkLabel: {
    label: __('Link label'),
    placeholder: __('None')
  },
  footer: {
    label: __('Briefly describe the link to help screen reader user')
  }
};
const SocialLinkEdit = ({
  attributes,
  setAttributes,
  isSelected,
  onFocus,
  name
}) => {
  const {
    url,
    service = name
  } = attributes;
  const [isLinkSheetVisible, setIsLinkSheetVisible] = useState(false);
  const [hasUrl, setHasUrl] = useState(!!url);
  const activeIcon = styles[`wp-social-link-${service}`] || styles[`wp-social-link`] || DEFAULT_ACTIVE_ICON_STYLES;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const IconComponent = getIconBySite(service)();
  const socialLinkName = getNameBySite(service);

  // When new social icon is added link sheet is opened automatically.
  useEffect(() => {
    if (isSelected && !url) {
      setIsLinkSheetVisible(true);
    }
  }, []);
  useEffect(() => {
    if (!url) {
      setHasUrl(false);
      animatedValue.setValue(0);
    } else if (url) {
      animateColors();
    }
  }, [url]);
  const interpolationColors = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    })
  };
  const {
    opacity
  } = hasUrl ? activeIcon : interpolationColors;
  function animateColors() {
    Animated.sequence([Animated.delay(ANIMATION_DELAY), Animated.timing(animatedValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.circle,
      useNativeDriver: false
    })]).start(() => setHasUrl(true));
  }
  const onCloseSettingsSheet = useCallback(() => {
    setIsLinkSheetVisible(false);
  }, []);
  const onOpenSettingsSheet = useCallback(() => {
    setIsLinkSheetVisible(true);
  }, []);
  const onEmptyURL = useCallback(() => {
    animatedValue.setValue(0);
    setHasUrl(false);
  }, [animatedValue]);
  function onIconPress() {
    if (isSelected) {
      setIsLinkSheetVisible(true);
    } else {
      onFocus();
    }
  }
  const accessibilityHint = url ? sprintf(
  // translators: %s: social link name e.g: "Instagram".
  __('%s has URL set'), socialLinkName) : sprintf(
  // translators: %s: social link name e.g: "Instagram".
  __('%s has no URL set'), socialLinkName);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [isSelected && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockControls, {
        children: /*#__PURE__*/_jsx(ToolbarGroup, {
          children: /*#__PURE__*/_jsx(ToolbarButton, {
            title: sprintf(
            // translators: %s: social link name e.g: "Instagram".
            __('Add link to %s'), socialLinkName),
            icon: link,
            onClick: onOpenSettingsSheet,
            isActive: url
          })
        })
      }), /*#__PURE__*/_jsx(LinkSettingsNavigation, {
        isVisible: isLinkSheetVisible,
        url: attributes.url,
        label: attributes.label,
        rel: attributes.rel,
        onEmptyURL: onEmptyURL,
        onClose: onCloseSettingsSheet,
        setAttributes: setAttributes,
        options: linkSettingsOptions,
        withBottomSheet: true
      })]
    }), /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      onPress: onIconPress,
      accessibilityRole: "button",
      accessibilityLabel: sprintf(
      // translators: %s: social link name e.g: "Instagram".
      __('%s social icon'), socialLinkName),
      accessibilityHint: accessibilityHint,
      children: /*#__PURE__*/_jsx(Animated.View, {
        style: [styles.iconContainer, {
          backgroundColor: activeIcon.backgroundColor,
          opacity
        }],
        children: /*#__PURE__*/_jsx(Icon, {
          animated: true,
          icon: IconComponent,
          style: {
            color: activeIcon.color
          }
        })
      })
    })]
  });
};
export default compose([withSelect((select, {
  clientId
}) => {
  const {
    getBlock
  } = select(blockEditorStore);
  const block = getBlock(clientId);
  const name = block?.name.substring(17);
  return {
    name
  };
})])(SocialLinkEdit);
//# sourceMappingURL=edit.native.js.map