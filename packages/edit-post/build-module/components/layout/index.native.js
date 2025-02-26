/**
 * External dependencies
 */
import { Platform, SafeAreaView, View } from 'react-native';
import SafeArea from 'react-native-safe-area';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { BottomSheetSettings, FloatingToolbar, store as blockEditorStore } from '@wordpress/block-editor';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { HTMLTextInput, KeyboardAvoidingView, NoticeList, Tooltip, __unstableAutocompletionItemsSlot as AutocompletionItemsSlot } from '@wordpress/components';
import { AutosaveMonitor, OfflineStatus, store as editorStore } from '@wordpress/editor';
import { sendNativeEditorDidLayout } from '@wordpress/react-native-bridge';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import headerToolbarStyles from '../header/header-toolbar/style.scss';
import Header from '../header';
import VisualEditor from '../visual-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
class Layout extends Component {
  constructor() {
    super(...arguments);
    this.onSafeAreaInsetsUpdate = this.onSafeAreaInsetsUpdate.bind(this);
    this.onRootViewLayout = this.onRootViewLayout.bind(this);
    this.state = {
      rootViewHeight: 0,
      safeAreaInsets: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }
    };
    SafeArea.getSafeAreaInsetsForRootView().then(this.onSafeAreaInsetsUpdate);
  }
  componentDidMount() {
    this._isMounted = true;
    this.safeAreaSubscription = SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
  }
  componentWillUnmount() {
    this.safeAreaSubscription?.remove();
    this._isMounted = false;
  }
  onSafeAreaInsetsUpdate(result) {
    const {
      safeAreaInsets
    } = result;
    if (this._isMounted) {
      this.setState({
        safeAreaInsets
      });
    }
  }
  onRootViewLayout(event) {
    if (this._isMounted) {
      this.setHeightState(event);
    }
  }
  setHeightState(event) {
    const {
      height
    } = event.nativeEvent.layout;
    if (height !== this.state.rootViewHeight) {
      this.setState({
        rootViewHeight: height
      }, sendNativeEditorDidLayout);
    }
  }
  renderHTML() {
    const {
      globalStyles
    } = this.props;
    return /*#__PURE__*/_jsx(HTMLTextInput, {
      parentHeight: this.state.rootViewHeight,
      style: globalStyles
    });
  }
  renderVisual() {
    const {
      isReady
    } = this.props;
    if (!isReady) {
      return null;
    }
    return /*#__PURE__*/_jsx(VisualEditor, {
      setTitleRef: this.props.setTitleRef
    });
  }
  render() {
    const {
      getStylesFromColorScheme,
      mode,
      globalStyles
    } = this.props;
    const isHtmlView = mode === 'text';

    // Add a margin view at the bottom for the header.
    const marginBottom = Platform.OS === 'android' && !isHtmlView ? headerToolbarStyles['header-toolbar__container'].height : 0;
    const containerStyles = getStylesFromColorScheme(styles.container, styles.containerDark);
    const toolbarKeyboardAvoidingViewStyle = {
      ...styles.toolbarKeyboardAvoidingView,
      left: this.state.safeAreaInsets.left,
      right: this.state.safeAreaInsets.right,
      bottom: this.state.safeAreaInsets.bottom,
      backgroundColor: containerStyles.backgroundColor
    };
    const editorStyles = [getStylesFromColorScheme(styles.background, styles.backgroundDark), globalStyles?.background && {
      backgroundColor: globalStyles.background
    }];
    return /*#__PURE__*/_jsx(Tooltip.Slot, {
      children: /*#__PURE__*/_jsxs(SafeAreaView, {
        style: containerStyles,
        onLayout: this.onRootViewLayout,
        children: [/*#__PURE__*/_jsx(AutosaveMonitor, {
          disableIntervalChecks: true
        }), /*#__PURE__*/_jsx(OfflineStatus, {}), /*#__PURE__*/_jsxs(View, {
          style: editorStyles,
          children: [isHtmlView ? this.renderHTML() : this.renderVisual(), !isHtmlView && Platform.OS === 'android' && /*#__PURE__*/_jsx(FloatingToolbar, {}), /*#__PURE__*/_jsx(NoticeList, {})]
        }), /*#__PURE__*/_jsx(View, {
          style: {
            flex: 0,
            flexBasis: marginBottom,
            height: marginBottom
          }
        }), !isHtmlView && /*#__PURE__*/_jsxs(KeyboardAvoidingView, {
          parentHeight: this.state.rootViewHeight,
          style: toolbarKeyboardAvoidingViewStyle,
          withAnimatedHeight: true,
          children: [Platform.OS === 'ios' && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(AutocompletionItemsSlot, {}), /*#__PURE__*/_jsx(FloatingToolbar, {})]
          }), /*#__PURE__*/_jsx(Header, {}), /*#__PURE__*/_jsx(BottomSheetSettings, {})]
        }), Platform.OS === 'android' && /*#__PURE__*/_jsx(AutocompletionItemsSlot, {})]
      })
    });
  }
}
export default compose([withSelect(select => {
  const {
    __unstableIsEditorReady: isEditorReady,
    getEditorMode
  } = select(editorStore);
  const {
    getSettings
  } = select(blockEditorStore);
  const globalStyles = getSettings()?.__experimentalGlobalStylesBaseStyles?.color;
  return {
    isReady: isEditorReady(),
    mode: getEditorMode(),
    globalStyles
  };
}), withPreferredColorScheme])(Layout);
//# sourceMappingURL=index.native.js.map