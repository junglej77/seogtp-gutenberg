/**
 * External dependencies
 */
import fastDeepEqual from 'fast-deep-equal/es6';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ColorListPicker from './color-list-picker';
import CircularOptionPicker from '../circular-option-picker';
import { VStack } from '../v-stack';
import CustomDuotoneBar from './custom-duotone-bar';
import { getDefaultColors, getGradientFromCSSColors } from './utils';
import { Spacer } from '../spacer';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ```jsx
 * import { DuotonePicker, DuotoneSwatch } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const DUOTONE_PALETTE = [
 * 	{ colors: [ '#8c00b7', '#fcff41' ], name: 'Purple and yellow', slug: 'purple-yellow' },
 * 	{ colors: [ '#000097', '#ff4747' ], name: 'Blue and red', slug: 'blue-red' },
 * ];
 *
 * const COLOR_PALETTE = [
 * 	{ color: '#ff4747', name: 'Red', slug: 'red' },
 * 	{ color: '#fcff41', name: 'Yellow', slug: 'yellow' },
 * 	{ color: '#000097', name: 'Blue', slug: 'blue' },
 * 	{ color: '#8c00b7', name: 'Purple', slug: 'purple' },
 * ];
 *
 * const Example = () => {
 * 	const [ duotone, setDuotone ] = useState( [ '#000000', '#ffffff' ] );
 * 	return (
 * 		<>
 * 			<DuotonePicker
 * 				duotonePalette={ DUOTONE_PALETTE }
 * 				colorPalette={ COLOR_PALETTE }
 * 				value={ duotone }
 * 				onChange={ setDuotone }
 * 			/>
 * 			<DuotoneSwatch values={ duotone } />
 * 		</>
 * 	);
 * };
 * ```
 */
function DuotonePicker({
  asButtons,
  loop,
  clearable = true,
  unsetable = true,
  colorPalette,
  duotonePalette,
  disableCustomColors,
  disableCustomDuotone,
  value,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...otherProps
}) {
  const [defaultDark, defaultLight] = useMemo(() => getDefaultColors(colorPalette), [colorPalette]);
  const isUnset = value === 'unset';
  const unsetOptionLabel = __('Unset');
  const unsetOption = /*#__PURE__*/_jsx(CircularOptionPicker.Option, {
    value: "unset",
    isSelected: isUnset,
    tooltipText: unsetOptionLabel,
    "aria-label": unsetOptionLabel,
    className: "components-duotone-picker__color-indicator",
    onClick: () => {
      onChange(isUnset ? undefined : 'unset');
    }
  }, "unset");
  const duotoneOptions = duotonePalette.map(({
    colors,
    slug,
    name
  }) => {
    const style = {
      background: getGradientFromCSSColors(colors, '135deg'),
      color: 'transparent'
    };
    const tooltipText = name !== null && name !== void 0 ? name : sprintf(
    // translators: %s: duotone code e.g: "dark-grayscale" or "7f7f7f-ffffff".
    __('Duotone code: %s'), slug);
    const label = name ? sprintf(
    // translators: %s: The name of the option e.g: "Dark grayscale".
    __('Duotone: %s'), name) : tooltipText;
    const isSelected = fastDeepEqual(colors, value);
    return /*#__PURE__*/_jsx(CircularOptionPicker.Option, {
      value: colors,
      isSelected: isSelected,
      "aria-label": label,
      tooltipText: tooltipText,
      style: style,
      onClick: () => {
        onChange(isSelected ? undefined : colors);
      }
    }, slug);
  });
  let metaProps;
  if (asButtons) {
    metaProps = {
      asButtons: true
    };
  } else {
    const _metaProps = {
      asButtons: false,
      loop
    };
    if (ariaLabel) {
      metaProps = {
        ..._metaProps,
        'aria-label': ariaLabel
      };
    } else if (ariaLabelledby) {
      metaProps = {
        ..._metaProps,
        'aria-labelledby': ariaLabelledby
      };
    } else {
      metaProps = {
        ..._metaProps,
        'aria-label': __('Custom color picker.')
      };
    }
  }
  const options = unsetable ? [unsetOption, ...duotoneOptions] : duotoneOptions;
  return /*#__PURE__*/_jsx(CircularOptionPicker, {
    ...otherProps,
    ...metaProps,
    options: options,
    actions: !!clearable && /*#__PURE__*/_jsx(CircularOptionPicker.ButtonAction, {
      onClick: () => onChange(undefined),
      children: __('Clear')
    }),
    children: /*#__PURE__*/_jsx(Spacer, {
      paddingTop: options.length === 0 ? 0 : 4,
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 3,
        children: [!disableCustomColors && !disableCustomDuotone && /*#__PURE__*/_jsx(CustomDuotoneBar, {
          value: isUnset ? undefined : value,
          onChange: onChange
        }), !disableCustomDuotone && /*#__PURE__*/_jsx(ColorListPicker, {
          labels: [__('Shadows'), __('Highlights')],
          colors: colorPalette,
          value: isUnset ? undefined : value,
          disableCustomColors: disableCustomColors,
          enableAlpha: true,
          onChange: newColors => {
            if (!newColors[0]) {
              newColors[0] = defaultDark;
            }
            if (!newColors[1]) {
              newColors[1] = defaultLight;
            }
            const newValue = newColors.length >= 2 ? newColors : undefined;
            // @ts-expect-error TODO: The color arrays for a DuotonePicker should be a tuple of two colors,
            // but it's currently typed as a string[].
            // See also https://github.com/WordPress/gutenberg/pull/49060#discussion_r1136951035
            onChange(newValue);
          }
        })]
      })
    })
  });
}
export default DuotonePicker;
//# sourceMappingURL=duotone-picker.js.map