/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem, __experimentalItemGroup as ItemGroup, __experimentalHStack as HStack, __experimentalZStack as ZStack, __experimentalDropdownContentWrapper as DropdownContentWrapper, Button, MenuGroup, ColorIndicator, DuotonePicker, DuotoneSwatch, Dropdown, Flex, FlexItem } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getValueFromVariable, useToolsPanelDropdownMenuProps } from './utils';
import { setImmutably } from '../../utils/object';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
function useMultiOriginColorPresets(settings, {
  presetSetting,
  defaultSetting
}) {
  const disableDefault = !settings?.color?.[defaultSetting];
  const userPresets = settings?.color?.[presetSetting]?.custom || EMPTY_ARRAY;
  const themePresets = settings?.color?.[presetSetting]?.theme || EMPTY_ARRAY;
  const defaultPresets = settings?.color?.[presetSetting]?.default || EMPTY_ARRAY;
  return useMemo(() => [...userPresets, ...themePresets, ...(disableDefault ? EMPTY_ARRAY : defaultPresets)], [disableDefault, userPresets, themePresets, defaultPresets]);
}
export function useHasFiltersPanel(settings) {
  return useHasDuotoneControl(settings);
}
function useHasDuotoneControl(settings) {
  return settings.color.customDuotone || settings.color.defaultDuotone || settings.color.duotone.length > 0;
}
function FiltersToolsPanel({
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
    label: _x('Filters', 'Name for applying graphical effects'),
    resetAll: resetAll,
    panelId: panelId,
    dropdownMenuProps: dropdownMenuProps,
    children: children
  });
}
const DEFAULT_CONTROLS = {
  duotone: true
};
const popoverProps = {
  placement: 'left-start',
  offset: 36,
  shift: true,
  className: 'block-editor-duotone-control__popover',
  headerTitle: __('Duotone')
};
const LabeledColorIndicator = ({
  indicator,
  label
}) => /*#__PURE__*/_jsxs(HStack, {
  justify: "flex-start",
  children: [/*#__PURE__*/_jsx(ZStack, {
    isLayered: false,
    offset: -8,
    children: /*#__PURE__*/_jsx(Flex, {
      expanded: false,
      children: indicator === 'unset' || !indicator ? /*#__PURE__*/_jsx(ColorIndicator, {
        className: "block-editor-duotone-control__unset-indicator"
      }) : /*#__PURE__*/_jsx(DuotoneSwatch, {
        values: indicator
      })
    })
  }), /*#__PURE__*/_jsx(FlexItem, {
    title: label,
    children: label
  })]
});
export default function FiltersPanel({
  as: Wrapper = FiltersToolsPanel,
  value,
  onChange,
  inheritedValue = value,
  settings,
  panelId,
  defaultControls = DEFAULT_CONTROLS
}) {
  const decodeValue = rawValue => getValueFromVariable({
    settings
  }, '', rawValue);

  // Duotone
  const hasDuotoneEnabled = useHasDuotoneControl(settings);
  const duotonePalette = useMultiOriginColorPresets(settings, {
    presetSetting: 'duotone',
    defaultSetting: 'defaultDuotone'
  });
  const colorPalette = useMultiOriginColorPresets(settings, {
    presetSetting: 'palette',
    defaultSetting: 'defaultPalette'
  });
  const duotone = decodeValue(inheritedValue?.filter?.duotone);
  const setDuotone = newValue => {
    const duotonePreset = duotonePalette.find(({
      colors
    }) => {
      return colors === newValue;
    });
    const settedValue = duotonePreset ? `var:preset|duotone|${duotonePreset.slug}` : newValue;
    onChange(setImmutably(value, ['filter', 'duotone'], settedValue));
  };
  const hasDuotone = () => !!value?.filter?.duotone;
  const resetDuotone = () => setDuotone(undefined);
  const resetAllFilter = useCallback(previousValue => {
    return {
      ...previousValue,
      filter: {
        ...previousValue.filter,
        duotone: undefined
      }
    };
  }, []);
  return /*#__PURE__*/_jsx(Wrapper, {
    resetAllFilter: resetAllFilter,
    value: value,
    onChange: onChange,
    panelId: panelId,
    children: hasDuotoneEnabled && /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Duotone'),
      hasValue: hasDuotone,
      onDeselect: resetDuotone,
      isShownByDefault: defaultControls.duotone,
      panelId: panelId,
      children: /*#__PURE__*/_jsx(Dropdown, {
        popoverProps: popoverProps,
        className: "block-editor-global-styles-filters-panel__dropdown",
        renderToggle: ({
          onToggle,
          isOpen
        }) => {
          const toggleProps = {
            onClick: onToggle,
            className: clsx({
              'is-open': isOpen
            }),
            'aria-expanded': isOpen
          };
          return /*#__PURE__*/_jsx(ItemGroup, {
            isBordered: true,
            isSeparated: true,
            children: /*#__PURE__*/_jsx(Button
            // TODO: Switch to `true` (40px size) if possible
            , {
              __next40pxDefaultSize: false,
              ...toggleProps,
              children: /*#__PURE__*/_jsx(LabeledColorIndicator, {
                indicator: duotone,
                label: __('Duotone')
              })
            })
          });
        },
        renderContent: () => /*#__PURE__*/_jsx(DropdownContentWrapper, {
          paddingSize: "small",
          children: /*#__PURE__*/_jsxs(MenuGroup, {
            label: __('Duotone'),
            children: [/*#__PURE__*/_jsx("p", {
              children: __('Create a two-tone color effect without losing your original image.')
            }), /*#__PURE__*/_jsx(DuotonePicker, {
              colorPalette: colorPalette,
              duotonePalette: duotonePalette
              // TODO: Re-enable both when custom colors are supported for block-level styles.
              ,
              disableCustomColors: true,
              disableCustomDuotone: true,
              value: duotone,
              onChange: setDuotone
            })]
          })
        })
      })
    })
  });
}
//# sourceMappingURL=filters-panel.js.map