/**
 * External dependencies
 */
import { Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { useEffect, useMemo, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { LinkPicker } from './';
import { jsx as _jsx } from "react/jsx-runtime";
const LinkPickerScreen = ({
  returnScreenName
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const navigateToLinkTimeoutRef = useRef(null);
  const navigateBackTimeoutRef = useRef(null);
  const onLinkPicked = ({
    url,
    title
  }) => {
    Keyboard.dismiss();
    navigateToLinkTimeoutRef.current = setTimeout(() => {
      navigation.navigate(returnScreenName, {
        inputValue: url,
        text: title
      });
    }, 100);
  };
  const onCancel = () => {
    Keyboard.dismiss();
    navigateBackTimeoutRef.current = setTimeout(() => {
      navigation.goBack();
    }, 100);
  };
  useEffect(() => {
    return () => {
      clearTimeout(navigateToLinkTimeoutRef.current);
      clearTimeout(navigateBackTimeoutRef.current);
    };
  }, []);
  const {
    inputValue
  } = route.params;
  return useMemo(() => {
    return /*#__PURE__*/_jsx(LinkPicker, {
      value: inputValue,
      onLinkPicked: onLinkPicked,
      onCancel: onCancel
    });
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
};
export default LinkPickerScreen;
//# sourceMappingURL=link-picker-screen.native.js.map