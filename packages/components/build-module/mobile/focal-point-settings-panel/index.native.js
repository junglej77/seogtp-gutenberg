/**
 * External dependencies
 */
import { SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { memo, useContext, useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import NavBar from '../bottom-sheet/nav-bar';
import styles from './styles.scss';
import { BottomSheetContext } from '../bottom-sheet/bottom-sheet-context';
import FocalPointPicker from '../../focal-point-picker';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const FocalPointSettingsPanelMemo = memo(({
  focalPoint,
  onFocalPointChange,
  shouldEnableBottomSheetScroll,
  url
}) => {
  const navigation = useNavigation();
  function onButtonPress(action) {
    navigation.goBack();
    if (action === 'apply') {
      onFocalPointChange(draftFocalPoint);
    }
  }
  const [draftFocalPoint, setDraftFocalPoint] = useState(focalPoint);
  function setPosition(coordinates) {
    setDraftFocalPoint(prevState => ({
      ...prevState,
      ...coordinates
    }));
  }
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.safearea,
    children: [/*#__PURE__*/_jsxs(NavBar, {
      children: [/*#__PURE__*/_jsx(NavBar.DismissButton, {
        onPress: () => onButtonPress('cancel')
      }), /*#__PURE__*/_jsx(NavBar.Heading, {
        children: __('Edit focal point')
      }), /*#__PURE__*/_jsx(NavBar.ApplyButton, {
        onPress: () => onButtonPress('apply')
      })]
    }), /*#__PURE__*/_jsx(FocalPointPicker, {
      focalPoint: draftFocalPoint,
      onChange: useCallback(setPosition, []),
      shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll,
      url: url
    })]
  });
});
function FocalPointSettingsPanel(props) {
  const route = useRoute();
  const {
    shouldEnableBottomSheetScroll
  } = useContext(BottomSheetContext);
  return /*#__PURE__*/_jsx(FocalPointSettingsPanelMemo, {
    shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll,
    ...props,
    ...route.params
  });
}
export default FocalPointSettingsPanel;
//# sourceMappingURL=index.native.js.map