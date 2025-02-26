/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import { Button, DropdownMenu, MenuGroup, MenuItemsChoice, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, VisuallyHidden } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { chevronDown } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function VariationsButtons({
  className,
  onSelectVariation,
  selectedValue,
  variations
}) {
  return /*#__PURE__*/_jsxs("fieldset", {
    className: className,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      as: "legend",
      children: __('Transform to variation')
    }), variations.map(variation => /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      icon: /*#__PURE__*/_jsx(BlockIcon, {
        icon: variation.icon,
        showColors: true
      }),
      isPressed: selectedValue === variation.name,
      label: selectedValue === variation.name ? variation.title : sprintf( /* translators: %s: Name of the block variation */
      __('Transform to %s'), variation.title),
      onClick: () => onSelectVariation(variation.name),
      "aria-label": variation.title,
      showTooltip: true
    }, variation.name))]
  });
}
function VariationsDropdown({
  className,
  onSelectVariation,
  selectedValue,
  variations
}) {
  const selectOptions = variations.map(({
    name,
    title,
    description
  }) => ({
    value: name,
    label: title,
    info: description
  }));
  return /*#__PURE__*/_jsx(DropdownMenu, {
    className: className,
    label: __('Transform to variation'),
    text: __('Transform to variation'),
    popoverProps: {
      position: 'bottom center',
      className: `${className}__popover`
    },
    icon: chevronDown,
    toggleProps: {
      iconPosition: 'right'
    },
    children: () => /*#__PURE__*/_jsx("div", {
      className: `${className}__container`,
      children: /*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsx(MenuItemsChoice, {
          choices: selectOptions,
          value: selectedValue,
          onSelect: onSelectVariation
        })
      })
    })
  });
}
function VariationsToggleGroupControl({
  className,
  onSelectVariation,
  selectedValue,
  variations
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(ToggleGroupControl, {
      label: __('Transform to variation'),
      value: selectedValue,
      hideLabelFromVision: true,
      onChange: onSelectVariation,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      children: variations.map(variation => /*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
        icon: /*#__PURE__*/_jsx(BlockIcon, {
          icon: variation.icon,
          showColors: true
        }),
        value: variation.name,
        label: selectedValue === variation.name ? variation.title : sprintf( /* translators: %s: Name of the block variation */
        __('Transform to %s'), variation.title)
      }, variation.name))
    })
  });
}
function __experimentalBlockVariationTransforms({
  blockClientId
}) {
  const {
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  const {
    activeBlockVariation,
    variations
  } = useSelect(select => {
    const {
      getActiveBlockVariation,
      getBlockVariations
    } = select(blocksStore);
    const {
      getBlockName,
      getBlockAttributes
    } = select(blockEditorStore);
    const name = blockClientId && getBlockName(blockClientId);
    return {
      activeBlockVariation: getActiveBlockVariation(name, getBlockAttributes(blockClientId)),
      variations: name && getBlockVariations(name, 'transform')
    };
  }, [blockClientId]);
  const selectedValue = activeBlockVariation?.name;

  // Check if each variation has a unique icon.
  const hasUniqueIcons = useMemo(() => {
    const variationIcons = new Set();
    if (!variations) {
      return false;
    }
    variations.forEach(variation => {
      if (variation.icon) {
        variationIcons.add(variation.icon?.src || variation.icon);
      }
    });
    return variationIcons.size === variations.length;
  }, [variations]);
  const onSelectVariation = variationName => {
    updateBlockAttributes(blockClientId, {
      ...variations.find(({
        name
      }) => name === variationName).attributes
    });
  };

  // Skip rendering if there are no variations
  if (!variations?.length) {
    return null;
  }
  const baseClass = 'block-editor-block-variation-transforms';

  // Show buttons if there are more than 5 variations because the ToggleGroupControl does not wrap
  const showButtons = variations.length > 5;
  const ButtonComponent = showButtons ? VariationsButtons : VariationsToggleGroupControl;
  const Component = hasUniqueIcons ? ButtonComponent : VariationsDropdown;
  return /*#__PURE__*/_jsx(Component, {
    className: baseClass,
    onSelectVariation: onSelectVariation,
    selectedValue: selectedValue,
    variations: variations
  });
}
export default __experimentalBlockVariationTransforms;
//# sourceMappingURL=index.js.map