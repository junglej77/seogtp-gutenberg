/**
 * External dependencies
 */
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { getProtocol, isURL, prependHTTP } from '@wordpress/url';
import { link, cancelCircleFilled } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import LinkPickerResults from './link-picker-results';
import NavBar from '../bottom-sheet/nav-bar';
import styles from './styles.scss';
import BottomSheet from '../bottom-sheet';
import Icon from '../../icon';

// This creates a search suggestion for adding a url directly.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const createDirectEntry = value => {
  let type = 'URL';
  const protocol = getProtocol(value)?.toLowerCase() || '';
  if (protocol.includes('mailto')) {
    type = 'mailto';
  }
  if (protocol.includes('tel')) {
    type = 'tel';
  }
  if (value?.startsWith('#')) {
    type = 'internal';
  }
  return {
    isDirectEntry: true,
    title: value,
    url: type === 'URL' ? prependHTTP(value) : value,
    type
  };
};
const getURLFromClipboard = async () => {
  const text = await Clipboard.getString();
  return !!text && isURL(text) ? text : '';
};
export const LinkPicker = ({
  value: initialValue,
  onLinkPicked,
  onCancel: cancel
}) => {
  const [value, setValue] = useState(initialValue);
  const [clipboardUrl, setClipboardUrl] = useState('');
  const directEntry = createDirectEntry(value);

  // The title of a direct entry is displayed as the raw input value, but if we
  // are replacing empty text, we want to use the generated url.
  const pickLink = ({
    title,
    url,
    isDirectEntry
  }) => {
    onLinkPicked({
      title: isDirectEntry ? url : title,
      url
    });
  };
  const onSubmit = () => {
    pickLink(directEntry);
  };
  const clear = () => {
    setValue('');
    setClipboardUrl('');
  };
  const omniCellStyle = usePreferredColorSchemeStyle(styles.omniCell, styles.omniCellDark);
  const iconStyle = usePreferredColorSchemeStyle(styles.icon, styles.iconDark);
  useEffect(() => {
    getURLFromClipboard().then(setClipboardUrl).catch(() => setClipboardUrl(''));
  }, []);

  // TODO: Localize the accessibility label.
  // TODO: Decide on if `LinkSuggestionItemCell` with `isDirectEntry` makes sense.
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.safeArea,
    children: [/*#__PURE__*/_jsxs(NavBar, {
      children: [/*#__PURE__*/_jsx(NavBar.DismissButton, {
        onPress: cancel
      }), /*#__PURE__*/_jsx(NavBar.Heading, {
        children: __('Link to')
      }), /*#__PURE__*/_jsx(NavBar.ApplyButton, {
        onPress: onSubmit
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.contentContainer,
      children: [/*#__PURE__*/_jsx(BottomSheet.Cell, {
        icon: link,
        style: omniCellStyle,
        valueStyle: styles.omniInput,
        value: value,
        placeholder: __('Search or type URL'),
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "url",
        onChangeValue: setValue,
        onSubmit: onSubmit
        /* eslint-disable-next-line jsx-a11y/no-autofocus */,
        autoFocus: true,
        separatorType: "none",
        children: value !== '' && /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: clear,
          style: styles.clearIcon,
          children: /*#__PURE__*/_jsx(Icon, {
            icon: cancelCircleFilled,
            fill: iconStyle.color,
            size: 24
          })
        })
      }), !!clipboardUrl && clipboardUrl !== value && /*#__PURE__*/_jsx(BottomSheet.LinkSuggestionItemCell, {
        accessible: true,
        accessibilityLabel: sprintf( /* translators: Copy URL from the clipboard, https://sample.url */
        __('Copy URL from the clipboard, %s'), clipboardUrl),
        suggestion: {
          type: 'clipboard',
          url: clipboardUrl,
          isDirectEntry: true
        },
        onLinkPicked: pickLink
      }), !!value && /*#__PURE__*/_jsx(LinkPickerResults, {
        query: value,
        onLinkPicked: pickLink,
        directEntry: directEntry
      })]
    })]
  });
};
//# sourceMappingURL=index.native.js.map