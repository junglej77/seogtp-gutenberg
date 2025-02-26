/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { useSettings } from '../use-settings';
import { jsx as _jsx } from "react/jsx-runtime";
export default createHigherOrderComponent(WrappedComponent => {
  return props => {
    const [colorsFeature, enableCustomColors] = useSettings('color.palette', 'color.custom');
    const {
      colors = colorsFeature,
      disableCustomColors = !enableCustomColors
    } = props;
    const hasColorsToChoose = colors && colors.length > 0 || !disableCustomColors;
    return /*#__PURE__*/_jsx(WrappedComponent, {
      ...props,
      colors,
      disableCustomColors,
      hasColorsToChoose
    });
  };
}, 'withColorContext');
//# sourceMappingURL=with-color-context.js.map