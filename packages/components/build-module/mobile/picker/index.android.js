/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BottomSheet from '../bottom-sheet';
import styles from './styles.scss';
import PanelBody from '../../panel/body';
import TextControl from '../../text-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Separator() {
  const separatorStyle = usePreferredColorSchemeStyle(styles['components-picker__separator'], styles['components-picker__separator--dark']);
  return /*#__PURE__*/_jsx(View, {
    style: separatorStyle
  });
}
export default class Picker extends Component {
  constructor() {
    super(...arguments);
    this.onClose = this.onClose.bind(this);
    this.onCellPress = this.onCellPress.bind(this);
    this.state = {
      isVisible: false
    };
  }
  presentPicker() {
    this.setState({
      isVisible: true
    });
  }
  onClose() {
    this.setState({
      isVisible: false
    });
  }
  onCellPress(value) {
    const {
      onChange
    } = this.props;
    onChange(value);
    this.onClose();
  }
  getOptions() {
    const {
      options,
      leftAlign
    } = this.props;
    return options.map(option => /*#__PURE__*/_jsxs(Fragment, {
      children: [options.length > 1 && option.separated && /*#__PURE__*/_jsx(Separator, {}), /*#__PURE__*/_jsx(BottomSheet.Cell, {
        icon: option.icon,
        leftAlign: leftAlign,
        label: option.label,
        separatorType: "none",
        onPress: () => this.onCellPress(option.value),
        disabled: option.disabled,
        style: option.disabled && styles['components-picker__button--disabled']
      })]
    }, `${option.label}-${option.value}`));
  }
  render() {
    const {
      hideCancelButton,
      title,
      testID
    } = this.props;
    const {
      isVisible
    } = this.state;
    return /*#__PURE__*/_jsx(BottomSheet, {
      isVisible: isVisible,
      onClose: this.onClose,
      hideHeader: true,
      testID: testID,
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: title,
        style: styles['components-picker__panel'],
        children: [this.getOptions(), !hideCancelButton && /*#__PURE__*/_jsx(TextControl, {
          label: __('Cancel'),
          onPress: this.onClose,
          separatorType: "none"
        })]
      })
    });
  }
}
//# sourceMappingURL=index.android.js.map