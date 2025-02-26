/**
 * External dependencies
 */
import { Keyboard, LayoutAnimation, Platform, StyleSheet, View, Dimensions } from 'react-native';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * This is a simplified version of Facebook's KeyboardAvoidingView.
 * It's meant to work specifically with BottomSheets.
 * This fixes an issue in the bottom padding calculation, when the
 * BottomSheet was presented on Landscape, with the keyboard already present,
 * and a TextField on Autofocus (situation present on Links UI)
 */
import { jsx as _jsx } from "react/jsx-runtime";
class KeyboardAvoidingView extends Component {
  constructor() {
    super(...arguments);
    this._onKeyboardChange = this._onKeyboardChange.bind(this);
    this._subscriptions = [];
    this.state = {
      bottom: 0
    };
  }
  _relativeKeyboardHeight(keyboardFrame) {
    if (!keyboardFrame) {
      return 0;
    }
    const windowWidth = Dimensions.get('window').width;
    const isFloatingKeyboard = keyboardFrame.width !== windowWidth;
    if (isFloatingKeyboard) {
      return 0;
    }
    const windowHeight = Dimensions.get('window').height;
    const keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;
    const final = Math.max(windowHeight - keyboardY, 0);
    return final;
  }

  /**
   * @param {Object} event Keyboard event.
   */
  _onKeyboardChange(event) {
    if (event === null) {
      this.setState({
        bottom: 0
      });
      return;
    }
    const {
      duration,
      easing,
      endCoordinates
    } = event;
    const height = this._relativeKeyboardHeight(endCoordinates);
    if (this.state.bottom === height) {
      return;
    }
    if (duration && easing) {
      LayoutAnimation.configureNext({
        duration,
        update: {
          duration,
          type: LayoutAnimation.Types[easing] || 'keyboard'
        }
      });
    }
    this.setState({
      bottom: height
    });
  }
  componentDidMount() {
    if (Platform.OS === 'ios') {
      this._subscriptions = [Keyboard.addListener('keyboardWillChangeFrame', this._onKeyboardChange)];
    }
  }
  componentWillUnmount() {
    this._subscriptions.forEach(subscription => {
      subscription.remove();
    });
  }
  render() {
    const {
      children,
      enabled,
      keyboardVerticalOffset,
      style,
      ...props
    } = this.props;
    let finalStyle = style;
    if (Platform.OS === 'ios') {
      const bottomHeight = enabled ? this.state.bottom : 0;
      finalStyle = StyleSheet.compose(style, {
        paddingBottom: bottomHeight
      });
    }
    return /*#__PURE__*/_jsx(View, {
      style: finalStyle,
      ...props,
      children: children
    });
  }
}
KeyboardAvoidingView.defaultProps = {
  enabled: true,
  keyboardVerticalOffset: 0
};
export default KeyboardAvoidingView;
//# sourceMappingURL=keyboard-avoiding-view.native.js.map