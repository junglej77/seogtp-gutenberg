/**
 * External dependencies
 */
import { useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { ColorControl, PanelBody } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { blockSettingsScreens } from '../block-settings';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PanelColorGradientSettings({
  settings,
  title,
  children
}) {
  const navigation = useNavigation();
  const mappedSettings = useMemo(() => {
    return settings.map(({
      onColorChange,
      onColorCleared,
      colorValue,
      onGradientChange,
      gradientValue,
      label
    }) => /*#__PURE__*/_jsx(ColorControl, {
      onPress: () => {
        navigation.navigate(blockSettingsScreens.color, {
          onColorChange,
          colorValue: gradientValue || colorValue,
          gradientValue,
          onGradientChange,
          onColorCleared,
          label
        });
      },
      label: label,
      color: gradientValue || colorValue
    }, `color-setting-${label}`));
  }, [settings]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(PanelBody, {
      title: title,
      children: mappedSettings
    }), /*#__PURE__*/_jsx(PanelBody, {
      children: children
    })]
  });
}
//# sourceMappingURL=panel-color-gradient-settings.native.js.map