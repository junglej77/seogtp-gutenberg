/**
 * External dependencies
 */
import { TouchableOpacity, Text, View, TextInput, I18nManager, AccessibilityInfo, Platform } from 'react-native';

/**
 * WordPress dependencies
 */
import { check } from '@wordpress/icons';
import { Component } from '@wordpress/element';
import { __, _x, sprintf } from '@wordpress/i18n';
import { withPreferredColorScheme } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './styles.scss';
import platformStyles from './cellStyles.scss';
import TouchableRipple from './ripple';
import LockIcon from './lock-icon';
import Icon from '../../icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const isIOS = Platform.OS === 'ios';
class BottomSheetCell extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      isEditingValue: props.autoFocus || false,
      isScreenReaderEnabled: false
    };
    this.handleScreenReaderToggled = this.handleScreenReaderToggled.bind(this);
    this.isCurrent = false;
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isEditingValue && this.state.isEditingValue) {
      this._valueTextInput.focus();
    }
  }
  componentDidMount() {
    this.isCurrent = true;
    this.a11yInfoChangeSubscription = AccessibilityInfo.addEventListener('screenReaderChanged', this.handleScreenReaderToggled);
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
      if (this.isCurrent && isScreenReaderEnabled) {
        this.setState({
          isScreenReaderEnabled
        });
      }
    });
  }
  componentWillUnmount() {
    this.isCurrent = false;
    this.a11yInfoChangeSubscription.remove();
  }
  handleScreenReaderToggled(isScreenReaderEnabled) {
    this.setState({
      isScreenReaderEnabled
    });
  }
  typeToKeyboardType(type, step) {
    let keyboardType = `default`;
    if (type === `number`) {
      if (step && Math.abs(step) < 1) {
        keyboardType = `decimal-pad`;
      } else {
        keyboardType = `number-pad`;
      }
    }
    return keyboardType;
  }
  render() {
    const {
      accessible,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      disabled = false,
      disabledStyle = styles.cellDisabled,
      showLockIcon = true,
      activeOpacity,
      onPress,
      onLongPress,
      label,
      subLabel,
      value,
      valuePlaceholder = '',
      icon,
      leftAlign,
      iconStyle = {},
      labelStyle = {},
      valueStyle = {},
      cellContainerStyle = {},
      cellRowContainerStyle = {},
      onChangeValue,
      onSubmit,
      children,
      editable = true,
      isSelected = false,
      separatorType,
      style = {},
      getStylesFromColorScheme,
      customActionButton,
      type,
      step,
      borderless,
      help,
      ...valueProps
    } = this.props;
    const showValue = value !== undefined;
    const isValueEditable = editable && onChangeValue !== undefined;
    const cellLabelStyle = getStylesFromColorScheme(styles.cellLabel, styles.cellTextDark);
    const cellLabelCenteredStyle = getStylesFromColorScheme(styles.cellLabelCentered, styles.cellTextDark);
    const cellLabelLeftAlignNoIconStyle = getStylesFromColorScheme(styles.cellLabelLeftAlignNoIcon, styles.cellTextDark);
    const defaultMissingIconAndValue = leftAlign ? cellLabelLeftAlignNoIconStyle : cellLabelCenteredStyle;
    const defaultLabelStyle = showValue || customActionButton || icon ? cellLabelStyle : defaultMissingIconAndValue;
    const defaultSubLabelStyleText = getStylesFromColorScheme(styles.cellSubLabelText, styles.cellSubLabelTextDark);
    const drawSeparator = separatorType && separatorType !== 'none' || separatorStyle === undefined;
    const drawTopSeparator = drawSeparator && separatorType === 'topFullWidth';
    const cellContainerStyles = [styles.cellContainer, cellContainerStyle];
    const rowContainerStyles = [styles.cellRowContainer, cellRowContainerStyle];
    const isInteractive = isValueEditable || onPress !== undefined || onLongPress !== undefined;
    const onCellPress = () => {
      if (isValueEditable) {
        startEditing();
      } else if (onPress !== undefined) {
        onPress();
      }
    };
    const finishEditing = () => {
      this.setState({
        isEditingValue: false
      });
    };
    const startEditing = () => {
      if (this.state.isEditingValue === false) {
        this.setState({
          isEditingValue: true
        });
      }
    };
    const separatorStyle = () => {
      // eslint-disable-next-line @wordpress/no-unused-vars-before-return
      const defaultSeparatorStyle = this.props.getStylesFromColorScheme(styles.separator, styles.separatorDark);
      const cellSeparatorStyle = this.props.getStylesFromColorScheme(styles.cellSeparator, styles.cellSeparatorDark);
      const leftMarginStyle = {
        ...cellSeparatorStyle,
        ...platformStyles.separatorMarginLeft
      };
      switch (separatorType) {
        case 'leftMargin':
          return leftMarginStyle;
        case 'fullWidth':
        case 'topFullWidth':
          return defaultSeparatorStyle;
        case 'none':
          return undefined;
        case undefined:
          if (showValue && icon) {
            return leftMarginStyle;
          }
          return defaultSeparatorStyle;
      }
    };
    const getValueComponent = () => {
      const styleRTL = I18nManager.isRTL && styles.cellValueRTL;
      const cellValueStyle = this.props.getStylesFromColorScheme(styles.cellValue, styles.cellTextDark);
      const textInputStyle = {
        ...cellValueStyle,
        ...valueStyle,
        ...styleRTL
      };
      const placeholderTextColor = disabled ? this.props.getStylesFromColorScheme(styles.placeholderColorDisabled, styles.placeholderColorDisabledDark).color : styles.placeholderColor.color;
      const textStyle = {
        ...(disabled && styles.cellDisabled),
        ...cellValueStyle,
        ...valueStyle
      };

      // To be able to show the `middle` ellipsizeMode on editable cells
      // we show the TextInput just when the user wants to edit the value,
      // and the Text component to display it.
      // We also show the TextInput to display placeholder.
      const shouldShowPlaceholder = isInteractive && value === '';
      return this.state.isEditingValue || shouldShowPlaceholder ? /*#__PURE__*/_jsx(TextInput, {
        ref: c => this._valueTextInput = c,
        numberOfLines: 1,
        style: textInputStyle,
        value: value,
        placeholder: valuePlaceholder,
        placeholderTextColor: placeholderTextColor,
        onChangeText: onChangeValue,
        editable: isValueEditable && !disabled,
        pointerEvents: this.state.isEditingValue ? 'auto' : 'none',
        onFocus: startEditing,
        onBlur: finishEditing,
        onSubmitEditing: onSubmit,
        keyboardType: this.typeToKeyboardType(type, step),
        disabled: disabled,
        ...valueProps
      }) : /*#__PURE__*/_jsx(Text, {
        style: textStyle,
        numberOfLines: 1,
        ellipsizeMode: "middle",
        children: value
      });
    };
    const getAccessibilityLabel = () => {
      if (accessible === false) {
        return;
      }
      if (accessibilityLabel || !showValue) {
        return accessibilityLabel || label;
      }
      if (!value) {
        return !help ? sprintf( /* translators: accessibility text. Empty state of a inline textinput cell. %s: The cell's title */
        _x('%s. Empty', 'inline textinput cell'), label) :
        // Separating by ',' is necessary to make a pause on urls (non-capitalized text)
        sprintf( /* translators: accessibility text. Empty state of a inline textinput cell. %1: Cell title, %2: cell help. */
        _x('%1$s, %2$s. Empty', 'inline textinput cell'), label, help);
      }
      return !help ? sprintf( /* translators: accessibility text. Inline textinput title and value.%1: Cell title, %2: cell value. */
      _x('%1$s, %2$s', 'inline textinput cell'), label, value) // Separating by ',' is necessary to make a pause on urls (non-capitalized text)
      : sprintf( /* translators: accessibility text. Inline textinput title, value and help text.%1: Cell title, %2: cell value, , %3: cell help. */
      _x('%1$s, %2$s, %3$s', 'inline textinput cell'), label, value, help);
    };
    const iconStyleBase = getStylesFromColorScheme(styles.icon, styles.iconDark);
    const resetButtonStyle = getStylesFromColorScheme(styles.resetButton, styles.resetButtonDark);
    const cellHelpStyle = [styles.cellHelpLabel, isIOS && styles.cellHelpLabelIOS];
    const containerPointerEvents = this.state.isScreenReaderEnabled && accessible ? 'none' : 'auto';
    const {
      title,
      handler
    } = customActionButton || {};
    const opacity = activeOpacity !== undefined ? activeOpacity : platformStyles.activeOpacity?.opacity;
    return /*#__PURE__*/_jsxs(TouchableRipple, {
      accessible: accessible !== undefined ? accessible : !this.state.isEditingValue,
      accessibilityLabel: getAccessibilityLabel(),
      accessibilityRole: accessibilityRole || 'button',
      accessibilityHint: isValueEditable ? /* translators: accessibility text */
      __('Double tap to edit this value') : accessibilityHint,
      disabled: disabled || !isInteractive,
      activeOpacity: opacity,
      onPress: onCellPress,
      onLongPress: onLongPress,
      style: [styles.clipToBounds, style],
      borderless: borderless,
      children: [drawTopSeparator && /*#__PURE__*/_jsx(View, {
        style: separatorStyle()
      }), /*#__PURE__*/_jsxs(View, {
        style: cellContainerStyles,
        pointerEvents: containerPointerEvents,
        children: [/*#__PURE__*/_jsxs(View, {
          style: rowContainerStyles,
          children: [/*#__PURE__*/_jsxs(View, {
            style: styles.cellRowContainer,
            children: [icon && /*#__PURE__*/_jsxs(View, {
              style: [styles.cellRowContainer, styles.cellRowIcon],
              children: [/*#__PURE__*/_jsx(Icon, {
                lock: true,
                icon: icon,
                size: 24,
                fill: iconStyle.color || iconStyleBase.color,
                style: iconStyle,
                isPressed: false
              }), /*#__PURE__*/_jsx(View, {
                style: platformStyles.labelIconSeparator
              })]
            }), subLabel && label && /*#__PURE__*/_jsxs(View, {
              children: [/*#__PURE__*/_jsx(Text, {
                style: [defaultLabelStyle, labelStyle],
                children: label
              }), /*#__PURE__*/_jsx(Text, {
                style: defaultSubLabelStyleText,
                children: subLabel
              })]
            }), !subLabel && label && /*#__PURE__*/_jsx(Text, {
              style: [defaultLabelStyle, labelStyle],
              children: label
            })]
          }), customActionButton && /*#__PURE__*/_jsx(TouchableOpacity, {
            onPress: handler,
            accessibilityRole: "button",
            children: /*#__PURE__*/_jsx(Text, {
              style: resetButtonStyle,
              children: title
            })
          })]
        }), isSelected && /*#__PURE__*/_jsx(Icon, {
          icon: check,
          fill: platformStyles.isSelected.color,
          testID: "bottom-sheet-cell-selected-icon"
        }), showValue && getValueComponent(), /*#__PURE__*/_jsx(View, {
          style: [disabled && disabledStyle, styles.cellRowContainer],
          pointerEvents: disabled ? 'none' : 'auto',
          children: children
        }), disabled && showLockIcon && /*#__PURE__*/_jsx(View, {
          style: styles.cellDisabled,
          children: /*#__PURE__*/_jsx(LockIcon, {})
        })]
      }), help && /*#__PURE__*/_jsx(Text, {
        style: [cellHelpStyle, styles.placeholderColor],
        children: help
      }), !drawTopSeparator && /*#__PURE__*/_jsx(View, {
        style: separatorStyle()
      })]
    });
  }
}
export default withPreferredColorScheme(BottomSheetCell);
//# sourceMappingURL=cell.native.js.map