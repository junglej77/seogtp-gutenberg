/**
 * External dependencies
 */
import { ScrollView, View, Text, TouchableWithoutFeedback, Platform } from 'react-native';

/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { PanelBody, BottomSheet, FooterMessageControl } from '@wordpress/components';
import { Icon, close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { store as blockEditorStore } from '../../store';
import InserterButton from '../inserter-button';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const hitSlop = {
  top: 22,
  bottom: 22,
  left: 22,
  right: 22
};
function BlockVariationPicker({
  isVisible,
  onClose,
  clientId,
  variations
}) {
  const {
    replaceInnerBlocks
  } = useDispatch(blockEditorStore);
  const isIOS = Platform.OS === 'ios';
  const cancelButtonStyle = usePreferredColorSchemeStyle(styles.cancelButton, styles.cancelButtonDark);
  const leftButton = /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    onPress: onClose,
    hitSlop: hitSlop,
    children: /*#__PURE__*/_jsx(View, {
      children: isIOS ? /*#__PURE__*/_jsx(Text, {
        style: cancelButtonStyle,
        maxFontSizeMultiplier: 2,
        children: __('Cancel')
      }) : /*#__PURE__*/_jsx(Icon, {
        icon: close,
        size: 24,
        style: styles.closeIcon
      })
    })
  });
  const onVariationSelect = variation => {
    replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(variation.innerBlocks));
    onClose();
  };
  return /*#__PURE__*/_jsxs(BottomSheet, {
    isVisible: isVisible,
    onClose: onClose,
    title: __('Select a layout'),
    contentStyle: styles.contentStyle,
    leftButton: leftButton,
    testID: "block-variation-modal",
    children: [/*#__PURE__*/_jsx(ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      contentContainerStyle: styles.contentContainerStyle,
      style: styles.containerStyle,
      children: variations.map(v => /*#__PURE__*/_jsx(InserterButton, {
        item: v,
        onSelect: () => onVariationSelect(v)
      }, v.name))
    }), /*#__PURE__*/_jsx(PanelBody, {
      children: /*#__PURE__*/_jsx(FooterMessageControl, {
        label: __('Note: Column layout may vary between themes and screen sizes')
      })
    })]
  });
}
export default BlockVariationPicker;
//# sourceMappingURL=index.native.js.map