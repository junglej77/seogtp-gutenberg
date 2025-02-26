/**
 * External dependencies
 */

import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import a11yPlugin from 'colord/plugins/a11y';
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { useCallback, useMemo, useState, forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Dropdown from '../dropdown';
import { ColorPicker } from '../color-picker';
import CircularOptionPicker from '../circular-option-picker';
import { VStack } from '../v-stack';
import { Truncate } from '../truncate';
import { ColorHeading } from './styles';
import DropdownContentWrapper from '../dropdown/dropdown-content-wrapper';
import { extractColorNameFromCurrentValue, isMultiplePaletteArray, normalizeColorValue } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
extend([namesPlugin, a11yPlugin]);
function SinglePalette({
  className,
  clearColor,
  colors,
  onChange,
  value,
  ...additionalProps
}) {
  const colorOptions = useMemo(() => {
    return colors.map(({
      color,
      name
    }, index) => {
      const colordColor = colord(color);
      const isSelected = value === color;
      return /*#__PURE__*/_jsx(CircularOptionPicker.Option, {
        isSelected: isSelected,
        selectedIconProps: isSelected ? {
          fill: colordColor.contrast() > colordColor.contrast('#000') ? '#fff' : '#000'
        } : {},
        tooltipText: name ||
        // translators: %s: color hex code e.g: "#f00".
        sprintf(__('Color code: %s'), color),
        style: {
          backgroundColor: color,
          color
        },
        onClick: isSelected ? clearColor : () => onChange(color, index),
        "aria-label": name ?
        // translators: %s: The name of the color e.g: "vivid red".
        sprintf(__('Color: %s'), name) :
        // translators: %s: color hex code e.g: "#f00".
        sprintf(__('Color code: %s'), color)
      }, `${color}-${index}`);
    });
  }, [colors, value, onChange, clearColor]);
  return /*#__PURE__*/_jsx(CircularOptionPicker.OptionGroup, {
    className: className,
    options: colorOptions,
    ...additionalProps
  });
}
function MultiplePalettes({
  className,
  clearColor,
  colors,
  onChange,
  value,
  headingLevel
}) {
  const instanceId = useInstanceId(MultiplePalettes, 'color-palette');
  if (colors.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(VStack, {
    spacing: 3,
    className: className,
    children: colors.map(({
      name,
      colors: colorPalette
    }, index) => {
      const id = `${instanceId}-${index}`;
      return /*#__PURE__*/_jsxs(VStack, {
        spacing: 2,
        children: [/*#__PURE__*/_jsx(ColorHeading, {
          id: id,
          level: headingLevel,
          children: name
        }), /*#__PURE__*/_jsx(SinglePalette, {
          clearColor: clearColor,
          colors: colorPalette,
          onChange: newColor => onChange(newColor, index),
          value: value,
          "aria-labelledby": id
        })]
      }, index);
    })
  });
}
export function CustomColorPickerDropdown({
  isRenderedInSidebar,
  popoverProps: receivedPopoverProps,
  ...props
}) {
  const popoverProps = useMemo(() => ({
    shift: true,
    // Disabling resize as it would otherwise cause the popover to show
    // scrollbars while dragging the color picker's handle close to the
    // popover edge.
    resize: false,
    ...(isRenderedInSidebar ? {
      // When in the sidebar: open to the left (stacking),
      // leaving the same gap as the parent popover.
      placement: 'left-start',
      offset: 34
    } : {
      // Default behavior: open below the anchor
      placement: 'bottom',
      offset: 8
    }),
    ...receivedPopoverProps
  }), [isRenderedInSidebar, receivedPopoverProps]);
  return /*#__PURE__*/_jsx(Dropdown, {
    contentClassName: "components-color-palette__custom-color-dropdown-content",
    popoverProps: popoverProps,
    ...props
  });
}
function UnforwardedColorPalette(props, forwardedRef) {
  const {
    asButtons,
    loop,
    clearable = true,
    colors = [],
    disableCustomColors = false,
    enableAlpha = false,
    onChange,
    value,
    __experimentalIsRenderedInSidebar = false,
    headingLevel = 2,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...additionalProps
  } = props;
  const [normalizedColorValue, setNormalizedColorValue] = useState(value);
  const clearColor = useCallback(() => onChange(undefined), [onChange]);
  const customColorPaletteCallbackRef = useCallback(node => {
    setNormalizedColorValue(normalizeColorValue(value, node));
  }, [value]);
  const hasMultipleColorOrigins = isMultiplePaletteArray(colors);
  const buttonLabelName = useMemo(() => extractColorNameFromCurrentValue(value, colors, hasMultipleColorOrigins), [value, colors, hasMultipleColorOrigins]);
  const renderCustomColorPicker = () => /*#__PURE__*/_jsx(DropdownContentWrapper, {
    paddingSize: "none",
    children: /*#__PURE__*/_jsx(ColorPicker, {
      color: normalizedColorValue,
      onChange: color => onChange(color),
      enableAlpha: enableAlpha
    })
  });
  const isHex = value?.startsWith('#');

  // Leave hex values as-is. Remove the `var()` wrapper from CSS vars.
  const displayValue = value?.replace(/^var\((.+)\)$/, '$1');
  const customColorAccessibleLabel = !!displayValue ? sprintf(
  // translators: %1$s: The name of the color e.g: "vivid red". %2$s: The color's hex code e.g: "#f00".
  __('Custom color picker. The currently selected color is called "%1$s" and has a value of "%2$s".'), buttonLabelName, displayValue) : __('Custom color picker.');
  const paletteCommonProps = {
    clearColor,
    onChange,
    value
  };
  const actions = !!clearable && /*#__PURE__*/_jsx(CircularOptionPicker.ButtonAction, {
    onClick: clearColor,
    children: __('Clear')
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
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 3,
    ref: forwardedRef,
    ...additionalProps,
    children: [!disableCustomColors && /*#__PURE__*/_jsx(CustomColorPickerDropdown, {
      isRenderedInSidebar: __experimentalIsRenderedInSidebar,
      renderContent: renderCustomColorPicker,
      renderToggle: ({
        isOpen,
        onToggle
      }) => /*#__PURE__*/_jsxs(VStack, {
        className: "components-color-palette__custom-color-wrapper",
        spacing: 0,
        children: [/*#__PURE__*/_jsx("button", {
          ref: customColorPaletteCallbackRef,
          className: "components-color-palette__custom-color-button",
          "aria-expanded": isOpen,
          "aria-haspopup": "true",
          onClick: onToggle,
          "aria-label": customColorAccessibleLabel,
          style: {
            background: value
          },
          type: "button"
        }), /*#__PURE__*/_jsxs(VStack, {
          className: "components-color-palette__custom-color-text-wrapper",
          spacing: 0.5,
          children: [/*#__PURE__*/_jsx(Truncate, {
            className: "components-color-palette__custom-color-name",
            children: value ? buttonLabelName : __('No color selected')
          }), /*#__PURE__*/_jsx(Truncate, {
            className: clsx('components-color-palette__custom-color-value', {
              'components-color-palette__custom-color-value--is-hex': isHex
            }),
            children: displayValue
          })]
        })]
      })
    }), (colors.length > 0 || actions) && /*#__PURE__*/_jsx(CircularOptionPicker, {
      ...metaProps,
      actions: actions,
      options: hasMultipleColorOrigins ? /*#__PURE__*/_jsx(MultiplePalettes, {
        ...paletteCommonProps,
        headingLevel: headingLevel,
        colors: colors,
        value: value
      }) : /*#__PURE__*/_jsx(SinglePalette, {
        ...paletteCommonProps,
        colors: colors,
        value: value
      })
    })]
  });
}

/**
 * Allows the user to pick a color from a list of pre-defined color entries.
 *
 * ```jsx
 * import { ColorPalette } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyColorPalette = () => {
 *   const [ color, setColor ] = useState ( '#f00' )
 *   const colors = [
 *     { name: 'red', color: '#f00' },
 *     { name: 'white', color: '#fff' },
 *     { name: 'blue', color: '#00f' },
 *   ];
 *   return (
 *     <ColorPalette
 *       colors={ colors }
 *       value={ color }
 *       onChange={ ( color ) => setColor( color ) }
 *     />
 *   );
 * } );
 * ```
 */
export const ColorPalette = forwardRef(UnforwardedColorPalette);
export default ColorPalette;
//# sourceMappingURL=index.js.map