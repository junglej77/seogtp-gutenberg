/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem, __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, __experimentalUseCustomUnits as useCustomUnits, __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper } from '@wordpress/components';
import { Icon, alignNone, stretchWide } from '@wordpress/icons';
import { useCallback, useState, Platform } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getValueFromVariable, useToolsPanelDropdownMenuProps } from './utils';
import SpacingSizesControl from '../spacing-sizes-control';
import HeightControl from '../height-control';
import ChildLayoutControl from '../child-layout-control';
import AspectRatioTool from '../dimensions-tool/aspect-ratio-tool';
import { cleanEmptyObject } from '../../hooks/utils';
import { setImmutably } from '../../utils/object';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const AXIAL_SIDES = ['horizontal', 'vertical'];
export function useHasDimensionsPanel(settings) {
  const hasContentSize = useHasContentSize(settings);
  const hasWideSize = useHasWideSize(settings);
  const hasPadding = useHasPadding(settings);
  const hasMargin = useHasMargin(settings);
  const hasGap = useHasGap(settings);
  const hasMinHeight = useHasMinHeight(settings);
  const hasAspectRatio = useHasAspectRatio(settings);
  const hasChildLayout = useHasChildLayout(settings);
  return Platform.OS === 'web' && (hasContentSize || hasWideSize || hasPadding || hasMargin || hasGap || hasMinHeight || hasAspectRatio || hasChildLayout);
}
function useHasContentSize(settings) {
  return settings?.layout?.contentSize;
}
function useHasWideSize(settings) {
  return settings?.layout?.wideSize;
}
function useHasPadding(settings) {
  return settings?.spacing?.padding;
}
function useHasMargin(settings) {
  return settings?.spacing?.margin;
}
function useHasGap(settings) {
  return settings?.spacing?.blockGap;
}
function useHasMinHeight(settings) {
  return settings?.dimensions?.minHeight;
}
function useHasAspectRatio(settings) {
  return settings?.dimensions?.aspectRatio;
}
function useHasChildLayout(settings) {
  var _settings$parentLayou;
  const {
    type: parentLayoutType = 'default',
    default: {
      type: defaultParentLayoutType = 'default'
    } = {},
    allowSizingOnChildren = false
  } = (_settings$parentLayou = settings?.parentLayout) !== null && _settings$parentLayou !== void 0 ? _settings$parentLayou : {};
  const support = (defaultParentLayoutType === 'flex' || parentLayoutType === 'flex' || defaultParentLayoutType === 'grid' || parentLayoutType === 'grid') && allowSizingOnChildren;
  return !!settings?.layout && support;
}
function useHasSpacingPresets(settings) {
  const {
    defaultSpacingSizes,
    spacingSizes
  } = settings?.spacing || {};
  return defaultSpacingSizes !== false && spacingSizes?.default?.length > 0 || spacingSizes?.theme?.length > 0 || spacingSizes?.custom?.length > 0;
}
function filterValuesBySides(values, sides) {
  // If no custom side configuration, all sides are opted into by default.
  // Without any values, we have nothing to filter either.
  if (!sides || !values) {
    return values;
  }

  // Only include sides opted into within filtered values.
  const filteredValues = {};
  sides.forEach(side => {
    if (side === 'vertical') {
      filteredValues.top = values.top;
      filteredValues.bottom = values.bottom;
    }
    if (side === 'horizontal') {
      filteredValues.left = values.left;
      filteredValues.right = values.right;
    }
    filteredValues[side] = values?.[side];
  });
  return filteredValues;
}
function splitStyleValue(value) {
  // Check for shorthand value (a string value).
  if (value && typeof value === 'string') {
    // Convert to value for individual sides for BoxControl.
    return {
      top: value,
      right: value,
      bottom: value,
      left: value
    };
  }
  return value;
}
function splitGapValue(value) {
  // Check for shorthand value (a string value).
  if (value && typeof value === 'string') {
    // If the value is a string, treat it as a single side (top) for the spacing controls.
    return {
      top: value
    };
  }
  if (value) {
    return {
      ...value,
      right: value?.left,
      bottom: value?.top
    };
  }
  return value;
}
function DimensionsToolsPanel({
  resetAllFilter,
  onChange,
  value,
  panelId,
  children
}) {
  const dropdownMenuProps = useToolsPanelDropdownMenuProps();
  const resetAll = () => {
    const updatedValue = resetAllFilter(value);
    onChange(updatedValue);
  };
  return /*#__PURE__*/_jsx(ToolsPanel, {
    label: __('Dimensions'),
    resetAll: resetAll,
    panelId: panelId,
    dropdownMenuProps: dropdownMenuProps,
    children: children
  });
}
const DEFAULT_CONTROLS = {
  contentSize: true,
  wideSize: true,
  padding: true,
  margin: true,
  blockGap: true,
  minHeight: true,
  aspectRatio: true,
  childLayout: true
};
export default function DimensionsPanel({
  as: Wrapper = DimensionsToolsPanel,
  value,
  onChange,
  inheritedValue = value,
  settings,
  panelId,
  defaultControls = DEFAULT_CONTROLS,
  onVisualize = () => {},
  // Special case because the layout controls are not part of the dimensions panel
  // in global styles but not in block inspector.
  includeLayoutControls = false
}) {
  var _defaultControls$cont, _defaultControls$wide, _defaultControls$padd, _defaultControls$marg, _defaultControls$bloc, _defaultControls$chil, _defaultControls$minH, _defaultControls$aspe;
  const {
    dimensions,
    spacing
  } = settings;
  const decodeValue = rawValue => {
    if (rawValue && typeof rawValue === 'object') {
      return Object.keys(rawValue).reduce((acc, key) => {
        acc[key] = getValueFromVariable({
          settings: {
            dimensions,
            spacing
          }
        }, '', rawValue[key]);
        return acc;
      }, {});
    }
    return getValueFromVariable({
      settings: {
        dimensions,
        spacing
      }
    }, '', rawValue);
  };
  const showSpacingPresetsControl = useHasSpacingPresets(settings);
  const units = useCustomUnits({
    availableUnits: settings?.spacing?.units || ['%', 'px', 'em', 'rem', 'vw']
  });

  //Minimum Margin Value
  const minimumMargin = -Infinity;
  const [minMarginValue, setMinMarginValue] = useState(minimumMargin);

  // Content Width
  const showContentSizeControl = useHasContentSize(settings) && includeLayoutControls;
  const contentSizeValue = decodeValue(inheritedValue?.layout?.contentSize);
  const setContentSizeValue = newValue => {
    onChange(setImmutably(value, ['layout', 'contentSize'], newValue || undefined));
  };
  const hasUserSetContentSizeValue = () => !!value?.layout?.contentSize;
  const resetContentSizeValue = () => setContentSizeValue(undefined);

  // Wide Width
  const showWideSizeControl = useHasWideSize(settings) && includeLayoutControls;
  const wideSizeValue = decodeValue(inheritedValue?.layout?.wideSize);
  const setWideSizeValue = newValue => {
    onChange(setImmutably(value, ['layout', 'wideSize'], newValue || undefined));
  };
  const hasUserSetWideSizeValue = () => !!value?.layout?.wideSize;
  const resetWideSizeValue = () => setWideSizeValue(undefined);

  // Padding
  const showPaddingControl = useHasPadding(settings);
  const rawPadding = decodeValue(inheritedValue?.spacing?.padding);
  const paddingValues = splitStyleValue(rawPadding);
  const paddingSides = Array.isArray(settings?.spacing?.padding) ? settings?.spacing?.padding : settings?.spacing?.padding?.sides;
  const isAxialPadding = paddingSides && paddingSides.some(side => AXIAL_SIDES.includes(side));
  const setPaddingValues = newPaddingValues => {
    const padding = filterValuesBySides(newPaddingValues, paddingSides);
    onChange(setImmutably(value, ['spacing', 'padding'], padding));
  };
  const hasPaddingValue = () => !!value?.spacing?.padding && Object.keys(value?.spacing?.padding).length;
  const resetPaddingValue = () => setPaddingValues(undefined);
  const onMouseOverPadding = () => onVisualize('padding');

  // Margin
  const showMarginControl = useHasMargin(settings);
  const rawMargin = decodeValue(inheritedValue?.spacing?.margin);
  const marginValues = splitStyleValue(rawMargin);
  const marginSides = Array.isArray(settings?.spacing?.margin) ? settings?.spacing?.margin : settings?.spacing?.margin?.sides;
  const isAxialMargin = marginSides && marginSides.some(side => AXIAL_SIDES.includes(side));
  const setMarginValues = newMarginValues => {
    const margin = filterValuesBySides(newMarginValues, marginSides);
    onChange(setImmutably(value, ['spacing', 'margin'], margin));
  };
  const hasMarginValue = () => !!value?.spacing?.margin && Object.keys(value?.spacing?.margin).length;
  const resetMarginValue = () => setMarginValues(undefined);
  const onMouseOverMargin = () => onVisualize('margin');

  // Block Gap
  const showGapControl = useHasGap(settings);
  const gapValue = decodeValue(inheritedValue?.spacing?.blockGap);
  const gapValues = splitGapValue(gapValue);
  const gapSides = Array.isArray(settings?.spacing?.blockGap) ? settings?.spacing?.blockGap : settings?.spacing?.blockGap?.sides;
  const isAxialGap = gapSides && gapSides.some(side => AXIAL_SIDES.includes(side));
  const setGapValue = newGapValue => {
    onChange(setImmutably(value, ['spacing', 'blockGap'], newGapValue));
  };
  const setGapValues = nextBoxGapValue => {
    if (!nextBoxGapValue) {
      setGapValue(null);
    }
    // If axial gap is not enabled, treat the 'top' value as the shorthand gap value.
    if (!isAxialGap && nextBoxGapValue?.hasOwnProperty('top')) {
      setGapValue(nextBoxGapValue.top);
    } else {
      setGapValue({
        top: nextBoxGapValue?.top,
        left: nextBoxGapValue?.left
      });
    }
  };
  const resetGapValue = () => setGapValue(undefined);
  const hasGapValue = () => !!value?.spacing?.blockGap;

  // Min Height
  const showMinHeightControl = useHasMinHeight(settings);
  const minHeightValue = decodeValue(inheritedValue?.dimensions?.minHeight);
  const setMinHeightValue = newValue => {
    const tempValue = setImmutably(value, ['dimensions', 'minHeight'], newValue);
    // Apply min-height, while removing any applied aspect ratio.
    onChange(setImmutably(tempValue, ['dimensions', 'aspectRatio'], undefined));
  };
  const resetMinHeightValue = () => {
    setMinHeightValue(undefined);
  };
  const hasMinHeightValue = () => !!value?.dimensions?.minHeight;

  // Aspect Ratio
  const showAspectRatioControl = useHasAspectRatio(settings);
  const aspectRatioValue = decodeValue(inheritedValue?.dimensions?.aspectRatio);
  const setAspectRatioValue = newValue => {
    const tempValue = setImmutably(value, ['dimensions', 'aspectRatio'], newValue);
    // Apply aspect-ratio, while removing any applied min-height.
    onChange(setImmutably(tempValue, ['dimensions', 'minHeight'], undefined));
  };
  const hasAspectRatioValue = () => !!value?.dimensions?.aspectRatio;

  // Child Layout
  const showChildLayoutControl = useHasChildLayout(settings);
  const childLayout = inheritedValue?.layout;
  const setChildLayout = newChildLayout => {
    onChange({
      ...value,
      layout: {
        ...newChildLayout
      }
    });
  };
  const resetAllFilter = useCallback(previousValue => {
    return {
      ...previousValue,
      layout: cleanEmptyObject({
        ...previousValue?.layout,
        contentSize: undefined,
        wideSize: undefined,
        selfStretch: undefined,
        flexSize: undefined,
        columnStart: undefined,
        rowStart: undefined,
        columnSpan: undefined,
        rowSpan: undefined
      }),
      spacing: {
        ...previousValue?.spacing,
        padding: undefined,
        margin: undefined,
        blockGap: undefined
      },
      dimensions: {
        ...previousValue?.dimensions,
        minHeight: undefined,
        aspectRatio: undefined
      }
    };
  }, []);
  const onMouseLeaveControls = () => onVisualize(false);
  const inputProps = {
    min: minMarginValue,
    onDragStart: () => {
      //Reset to 0 in case the value was negative.
      setMinMarginValue(0);
    },
    onDragEnd: () => {
      setMinMarginValue(minimumMargin);
    }
  };
  return /*#__PURE__*/_jsxs(Wrapper, {
    resetAllFilter: resetAllFilter,
    value: value,
    onChange: onChange,
    panelId: panelId,
    children: [(showContentSizeControl || showWideSizeControl) && /*#__PURE__*/_jsx("span", {
      className: "span-columns",
      children: __('Set the width of the main content area.')
    }), showContentSizeControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Content width'),
      hasValue: hasUserSetContentSizeValue,
      onDeselect: resetContentSizeValue,
      isShownByDefault: (_defaultControls$cont = defaultControls.contentSize) !== null && _defaultControls$cont !== void 0 ? _defaultControls$cont : DEFAULT_CONTROLS.contentSize,
      panelId: panelId,
      children: /*#__PURE__*/_jsx(UnitControl, {
        __next40pxDefaultSize: true,
        label: __('Content width'),
        labelPosition: "top",
        value: contentSizeValue || '',
        onChange: nextContentSize => {
          setContentSizeValue(nextContentSize);
        },
        units: units,
        prefix: /*#__PURE__*/_jsx(InputControlPrefixWrapper, {
          variant: "icon",
          children: /*#__PURE__*/_jsx(Icon, {
            icon: alignNone
          })
        })
      })
    }), showWideSizeControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Wide width'),
      hasValue: hasUserSetWideSizeValue,
      onDeselect: resetWideSizeValue,
      isShownByDefault: (_defaultControls$wide = defaultControls.wideSize) !== null && _defaultControls$wide !== void 0 ? _defaultControls$wide : DEFAULT_CONTROLS.wideSize,
      panelId: panelId,
      children: /*#__PURE__*/_jsx(UnitControl, {
        __next40pxDefaultSize: true,
        label: __('Wide width'),
        labelPosition: "top",
        value: wideSizeValue || '',
        onChange: nextWideSize => {
          setWideSizeValue(nextWideSize);
        },
        units: units,
        prefix: /*#__PURE__*/_jsx(InputControlPrefixWrapper, {
          variant: "icon",
          children: /*#__PURE__*/_jsx(Icon, {
            icon: stretchWide
          })
        })
      })
    }), showPaddingControl && /*#__PURE__*/_jsxs(ToolsPanelItem, {
      hasValue: hasPaddingValue,
      label: __('Padding'),
      onDeselect: resetPaddingValue,
      isShownByDefault: (_defaultControls$padd = defaultControls.padding) !== null && _defaultControls$padd !== void 0 ? _defaultControls$padd : DEFAULT_CONTROLS.padding,
      className: clsx({
        'tools-panel-item-spacing': showSpacingPresetsControl
      }),
      panelId: panelId,
      children: [!showSpacingPresetsControl && /*#__PURE__*/_jsx(BoxControl, {
        values: paddingValues,
        onChange: setPaddingValues,
        label: __('Padding'),
        sides: paddingSides,
        units: units,
        allowReset: false,
        splitOnAxis: isAxialPadding,
        onMouseOver: onMouseOverPadding,
        onMouseOut: onMouseLeaveControls
      }), showSpacingPresetsControl && /*#__PURE__*/_jsx(SpacingSizesControl, {
        values: paddingValues,
        onChange: setPaddingValues,
        label: __('Padding'),
        sides: paddingSides,
        units: units,
        allowReset: false,
        onMouseOver: onMouseOverPadding,
        onMouseOut: onMouseLeaveControls
      })]
    }), showMarginControl && /*#__PURE__*/_jsxs(ToolsPanelItem, {
      hasValue: hasMarginValue,
      label: __('Margin'),
      onDeselect: resetMarginValue,
      isShownByDefault: (_defaultControls$marg = defaultControls.margin) !== null && _defaultControls$marg !== void 0 ? _defaultControls$marg : DEFAULT_CONTROLS.margin,
      className: clsx({
        'tools-panel-item-spacing': showSpacingPresetsControl
      }),
      panelId: panelId,
      children: [!showSpacingPresetsControl && /*#__PURE__*/_jsx(BoxControl, {
        values: marginValues,
        onChange: setMarginValues,
        inputProps: inputProps,
        label: __('Margin'),
        sides: marginSides,
        units: units,
        allowReset: false,
        splitOnAxis: isAxialMargin,
        onMouseOver: onMouseOverMargin,
        onMouseOut: onMouseLeaveControls
      }), showSpacingPresetsControl && /*#__PURE__*/_jsx(SpacingSizesControl, {
        values: marginValues,
        onChange: setMarginValues,
        minimumCustomValue: -Infinity,
        label: __('Margin'),
        sides: marginSides,
        units: units,
        allowReset: false,
        onMouseOver: onMouseOverMargin,
        onMouseOut: onMouseLeaveControls
      })]
    }), showGapControl && /*#__PURE__*/_jsxs(ToolsPanelItem, {
      hasValue: hasGapValue,
      label: __('Block spacing'),
      onDeselect: resetGapValue,
      isShownByDefault: (_defaultControls$bloc = defaultControls.blockGap) !== null && _defaultControls$bloc !== void 0 ? _defaultControls$bloc : DEFAULT_CONTROLS.blockGap,
      className: clsx({
        'tools-panel-item-spacing': showSpacingPresetsControl,
        'single-column':
        // If UnitControl is used, should be single-column.
        !showSpacingPresetsControl && !isAxialGap
      }),
      panelId: panelId,
      children: [!showSpacingPresetsControl && (isAxialGap ? /*#__PURE__*/_jsx(BoxControl, {
        label: __('Block spacing'),
        min: 0,
        onChange: setGapValues,
        units: units,
        sides: gapSides,
        values: gapValues,
        allowReset: false,
        splitOnAxis: isAxialGap
      }) : /*#__PURE__*/_jsx(UnitControl, {
        __next40pxDefaultSize: true,
        label: __('Block spacing'),
        min: 0,
        onChange: setGapValue,
        units: units,
        value: gapValue
      })), showSpacingPresetsControl && /*#__PURE__*/_jsx(SpacingSizesControl, {
        label: __('Block spacing'),
        min: 0,
        onChange: setGapValues,
        showSideInLabel: false,
        sides: isAxialGap ? gapSides : ['top'] // Use 'top' as the shorthand property in non-axial configurations.
        ,
        values: gapValues,
        allowReset: false
      })]
    }), showChildLayoutControl && /*#__PURE__*/_jsx(ChildLayoutControl, {
      value: childLayout,
      onChange: setChildLayout,
      parentLayout: settings?.parentLayout,
      panelId: panelId,
      isShownByDefault: (_defaultControls$chil = defaultControls.childLayout) !== null && _defaultControls$chil !== void 0 ? _defaultControls$chil : DEFAULT_CONTROLS.childLayout
    }), showMinHeightControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
      hasValue: hasMinHeightValue,
      label: __('Minimum height'),
      onDeselect: resetMinHeightValue,
      isShownByDefault: (_defaultControls$minH = defaultControls.minHeight) !== null && _defaultControls$minH !== void 0 ? _defaultControls$minH : DEFAULT_CONTROLS.minHeight,
      panelId: panelId,
      children: /*#__PURE__*/_jsx(HeightControl, {
        label: __('Minimum height'),
        value: minHeightValue,
        onChange: setMinHeightValue
      })
    }), showAspectRatioControl && /*#__PURE__*/_jsx(AspectRatioTool, {
      hasValue: hasAspectRatioValue,
      value: aspectRatioValue,
      onChange: setAspectRatioValue,
      panelId: panelId,
      isShownByDefault: (_defaultControls$aspe = defaultControls.aspectRatio) !== null && _defaultControls$aspe !== void 0 ? _defaultControls$aspe : DEFAULT_CONTROLS.aspectRatio
    })]
  });
}
//# sourceMappingURL=dimensions-panel.js.map