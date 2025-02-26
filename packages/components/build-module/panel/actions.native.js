/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import styles from './actions.scss';
import BottomSeparatorCover from './bottom-separator-cover';
import TextControl from '../text-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PanelActions({
  actions,
  getStylesFromColorScheme
}) {
  const mappedActions = useMemo(() => {
    return actions.map(({
      label,
      onPress
    }) => {
      return /*#__PURE__*/_jsx(TextControl, {
        label: label,
        onPress: onPress,
        labelStyle: styles.defaultLabelStyle
      }, label);
    });
  }, [actions]);
  return /*#__PURE__*/_jsxs(View, {
    style: getStylesFromColorScheme(styles.panelActionsContainer, styles.panelActionsContainerDark),
    children: [mappedActions, /*#__PURE__*/_jsx(BottomSeparatorCover, {})]
  });
}
export default withPreferredColorScheme(PanelActions);
//# sourceMappingURL=actions.native.js.map