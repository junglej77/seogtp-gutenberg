/**
 * External dependencies
 */
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { Icon, chevronRight } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './styles.scss';
import BottomSheet from '../bottom-sheet';
import PanelBody from '../../panel/body';
import FooterMessageControl from '../../footer-message-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const BottomSheetTextControl = ({
  initialValue,
  onChange,
  placeholder,
  label,
  icon,
  footerNote,
  cellPlaceholder,
  disabled
}) => {
  const [showSubSheet, setShowSubSheet] = useState(false);
  const navigation = useNavigation();
  const goBack = () => {
    setShowSubSheet(false);
    navigation.goBack();
  };
  const openSubSheet = () => {
    navigation.navigate(BottomSheet.SubSheet.screenName);
    setShowSubSheet(true);
  };
  const horizontalBorderStyle = usePreferredColorSchemeStyle(styles.horizontalBorder, styles.horizontalBorderDark);
  const textEditorStyle = usePreferredColorSchemeStyle(styles.textEditor, styles.textEditorDark);
  return /*#__PURE__*/_jsxs(BottomSheet.SubSheet, {
    navigationButton: /*#__PURE__*/_jsx(BottomSheet.Cell, {
      icon: icon,
      label: label,
      onPress: openSubSheet,
      value: initialValue || '',
      placeholder: cellPlaceholder || placeholder || '',
      disabled: disabled,
      children: disabled ? null : /*#__PURE__*/_jsx(Icon, {
        icon: chevronRight
      })
    }),
    showSheet: showSubSheet,
    children: [/*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(BottomSheet.NavBar, {
        children: [/*#__PURE__*/_jsx(BottomSheet.NavBar.BackButton, {
          onPress: goBack
        }), /*#__PURE__*/_jsx(BottomSheet.NavBar.Heading, {
          children: label
        })]
      }), /*#__PURE__*/_jsx(PanelBody, {
        style: horizontalBorderStyle,
        children: /*#__PURE__*/_jsx(TextInput, {
          label: label,
          onChangeText: text => onChange(text),
          defaultValue: initialValue,
          multiline: true,
          placeholder: placeholder,
          placeholderTextColor: "#87a6bc",
          style: textEditorStyle,
          textAlignVertical: "top"
        })
      })]
    }), footerNote && /*#__PURE__*/_jsx(PanelBody, {
      style: styles.textFooternote,
      children: /*#__PURE__*/_jsx(FooterMessageControl, {
        label: footerNote,
        textAlign: "left"
      })
    })]
  });
};
export default BottomSheetTextControl;
//# sourceMappingURL=index.native.js.map