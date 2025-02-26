/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalVStack as VStack, __experimentalHeading as Heading, __experimentalHStack as HStack, __experimentalDropdownContentWrapper as DropdownContentWrapper, Button, FlexItem, Dropdown, Composite } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { shadow as shadowIcon, Icon, check } from '@wordpress/icons';

/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array}
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
export function ShadowPopoverContainer({
  shadow,
  onShadowChange,
  settings
}) {
  const shadows = useShadowPresets(settings);
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-global-styles__shadow-popover-container",
    children: /*#__PURE__*/_jsxs(VStack, {
      spacing: 4,
      children: [/*#__PURE__*/_jsx(Heading, {
        level: 5,
        children: __('Drop shadow')
      }), /*#__PURE__*/_jsx(ShadowPresets, {
        presets: shadows,
        activeShadow: shadow,
        onSelect: onShadowChange
      }), /*#__PURE__*/_jsx("div", {
        className: "block-editor-global-styles__clear-shadow",
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: () => onShadowChange(undefined),
          children: __('Clear')
        })
      })]
    })
  });
}
export function ShadowPresets({
  presets,
  activeShadow,
  onSelect
}) {
  return !presets ? null : /*#__PURE__*/_jsx(Composite, {
    role: "listbox",
    className: "block-editor-global-styles__shadow__list",
    "aria-label": __('Drop shadows'),
    children: presets.map(({
      name,
      slug,
      shadow
    }) => /*#__PURE__*/_jsx(ShadowIndicator, {
      label: name,
      isActive: shadow === activeShadow,
      type: slug === 'unset' ? 'unset' : 'preset',
      onSelect: () => onSelect(shadow === activeShadow ? undefined : shadow),
      shadow: shadow
    }, slug))
  });
}
export function ShadowIndicator({
  type,
  label,
  isActive,
  onSelect,
  shadow
}) {
  return /*#__PURE__*/_jsx(Composite.Item, {
    role: "option",
    "aria-label": label,
    "aria-selected": isActive,
    className: clsx('block-editor-global-styles__shadow__item', {
      'is-active': isActive
    }),
    render: /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: clsx('block-editor-global-styles__shadow-indicator', {
        unset: type === 'unset'
      }),
      onClick: onSelect,
      label: label,
      style: {
        boxShadow: shadow
      },
      showTooltip: true,
      children: isActive && /*#__PURE__*/_jsx(Icon, {
        icon: check
      })
    })
  });
}
export function ShadowPopover({
  shadow,
  onShadowChange,
  settings
}) {
  const popoverProps = {
    placement: 'left-start',
    offset: 36,
    shift: true
  };
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: popoverProps,
    className: "block-editor-global-styles__shadow-dropdown",
    renderToggle: renderShadowToggle(),
    renderContent: () => /*#__PURE__*/_jsx(DropdownContentWrapper, {
      paddingSize: "medium",
      children: /*#__PURE__*/_jsx(ShadowPopoverContainer, {
        shadow: shadow,
        onShadowChange: onShadowChange,
        settings: settings
      })
    })
  });
}
function renderShadowToggle() {
  return ({
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
    return /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      ...toggleProps,
      children: /*#__PURE__*/_jsxs(HStack, {
        justify: "flex-start",
        children: [/*#__PURE__*/_jsx(Icon, {
          className: "block-editor-global-styles__toggle-icon",
          icon: shadowIcon,
          size: 24
        }), /*#__PURE__*/_jsx(FlexItem, {
          children: __('Drop shadow')
        })]
      })
    });
  };
}
export function useShadowPresets(settings) {
  return useMemo(() => {
    var _settings$shadow$pres;
    if (!settings?.shadow) {
      return EMPTY_ARRAY;
    }
    const defaultPresetsEnabled = settings?.shadow?.defaultPresets;
    const {
      default: defaultShadows,
      theme: themeShadows,
      custom: customShadows
    } = (_settings$shadow$pres = settings?.shadow?.presets) !== null && _settings$shadow$pres !== void 0 ? _settings$shadow$pres : {};
    const unsetShadow = {
      name: __('Unset'),
      slug: 'unset',
      shadow: 'none'
    };
    const shadowPresets = [...(defaultPresetsEnabled && defaultShadows || EMPTY_ARRAY), ...(themeShadows || EMPTY_ARRAY), ...(customShadows || EMPTY_ARRAY)];
    if (shadowPresets.length) {
      shadowPresets.unshift(unsetShadow);
    }
    return shadowPresets;
  }, [settings]);
}
//# sourceMappingURL=shadow-panel-components.js.map