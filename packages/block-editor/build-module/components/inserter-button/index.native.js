/**
 * External dependencies
 */
import { View, TouchableHighlight, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Icon } from '@wordpress/components';
import { withPreferredColorScheme } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '../block-icon';
import styles from './style.scss';
import sparkles from './sparkles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
class MenuItem extends Component {
  constructor() {
    super(...arguments);
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    const {
      onSelect,
      item
    } = this.props;
    onSelect(item);
  }
  render() {
    const {
      getStylesFromColorScheme,
      item,
      itemWidth,
      maxWidth
    } = this.props;
    const modalIconWrapperStyle = getStylesFromColorScheme(styles.modalIconWrapper, styles.modalIconWrapperDark);
    const modalIconStyle = styles.modalIcon;
    const modalItemLabelStyle = getStylesFromColorScheme(styles.modalItemLabel, styles.modalItemLabelDark);
    const clipboardBlockStyles = getStylesFromColorScheme(styles.clipboardBlock, styles.clipboardBlockDark);
    const isClipboardBlock = item.id === 'clipboard';
    const blockTitle = isClipboardBlock ? __('Copied block') : item.title;
    const blockIsNew = item.isNew === true;
    const accessibilityLabelFormat = blockIsNew ?
    // translators: Newly available block name. %s: The localized block name
    __('%s block, newly available') :
    // translators: Block name. %s: The localized block name
    __('%s block');
    const accessibilityLabel = sprintf(accessibilityLabelFormat, item.title);
    return /*#__PURE__*/_jsx(TouchableHighlight, {
      style: [styles.touchableArea, item.isDisabled ? styles.disabled : null],
      underlayColor: "transparent",
      activeOpacity: 0.5,
      accessibilityRole: "button",
      accessibilityLabel: accessibilityLabel,
      onPress: this.onPress,
      disabled: item.isDisabled,
      children: /*#__PURE__*/_jsxs(View, {
        style: [styles.modalItem, {
          width: maxWidth
        }],
        children: [/*#__PURE__*/_jsxs(View, {
          style: [modalIconWrapperStyle, itemWidth && {
            width: itemWidth
          }, isClipboardBlock && clipboardBlockStyles],
          children: [blockIsNew && /*#__PURE__*/_jsx(Icon, {
            icon: sparkles,
            style: styles.newIndicator
          }), /*#__PURE__*/_jsx(View, {
            style: modalIconStyle,
            children: /*#__PURE__*/_jsx(BlockIcon, {
              icon: item.icon,
              size: modalIconStyle.width
            })
          })]
        }), /*#__PURE__*/_jsx(Text, {
          numberOfLines: 3,
          style: modalItemLabelStyle,
          children: blockTitle
        })]
      })
    });
  }
}
const InserterButton = withPreferredColorScheme(MenuItem);
InserterButton.Styles = {
  modalItem: styles.modalItem,
  modalIconWrapper: styles.modalIconWrapper
};
export default InserterButton;
//# sourceMappingURL=index.native.js.map