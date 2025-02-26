/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@wordpress/compose';
import { Button } from '@wordpress/components';
import { Icon, plusCircleFilled } from '@wordpress/icons';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Inserter from '../inserter';
import styles from './styles.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ButtonBlockAppender({
  rootClientId,
  getStylesFromColorScheme,
  showSeparator,
  isFloating = false,
  onAddBlock
}) {
  const onAppenderPress = useCallback(onToggle => () => {
    if (onAddBlock) {
      onAddBlock();
      return;
    }
    if (onToggle) {
      onToggle();
    }
  }, [onAddBlock]);
  const appenderStyle = {
    ...styles.appender,
    ...getStylesFromColorScheme(styles.appenderLight, styles.appenderDark)
  };
  const addBlockButtonStyle = getStylesFromColorScheme(styles.addBlockButton, isFloating ? styles.floatingAddBlockButtonDark : styles.addBlockButtonDark);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(Inserter, {
      rootClientId: rootClientId,
      renderToggle: ({
        onToggle,
        disabled,
        isOpen
      }) => /*#__PURE__*/_jsx(Button, {
        testID: "appender-button",
        onClick: onAppenderPress(onToggle),
        "aria-expanded": isOpen,
        disabled: disabled,
        fixedRatio: false,
        children: /*#__PURE__*/_jsx(View, {
          style: [appenderStyle, isFloating && styles.floatingAppender],
          children: /*#__PURE__*/_jsx(Icon, {
            icon: plusCircleFilled,
            style: addBlockButtonStyle,
            color: addBlockButtonStyle.color,
            size: addBlockButtonStyle.size
          })
        })
      }),
      isAppender: true,
      showSeparator: showSeparator
    })
  });
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/button-block-appender/README.md
 */
export default withPreferredColorScheme(ButtonBlockAppender);
//# sourceMappingURL=index.native.js.map