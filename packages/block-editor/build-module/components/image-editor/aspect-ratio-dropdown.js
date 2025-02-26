/**
 * WordPress dependencies
 */
import { check, aspectRatio as aspectRatioIcon } from '@wordpress/icons';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useSettings } from '../use-settings';
import { POPOVER_PROPS } from './constants';
import { useImageEditingContext } from './context';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function AspectRatioGroup({
  aspectRatios,
  isDisabled,
  label,
  onClick,
  value
}) {
  return /*#__PURE__*/_jsx(MenuGroup, {
    label: label,
    children: aspectRatios.map(({
      name,
      slug,
      ratio
    }) => /*#__PURE__*/_jsx(MenuItem, {
      disabled: isDisabled,
      onClick: () => {
        onClick(ratio);
      },
      role: "menuitemradio",
      isSelected: ratio === value,
      icon: ratio === value ? check : undefined,
      children: name
    }, slug))
  });
}
export function ratioToNumber(str) {
  // TODO: support two-value aspect ratio?
  // https://css-tricks.com/almanac/properties/a/aspect-ratio/#aa-it-can-take-two-values
  const [a, b, ...rest] = str.split('/').map(Number);
  if (a <= 0 || b <= 0 || Number.isNaN(a) || Number.isNaN(b) || rest.length) {
    return NaN;
  }
  return b ? a / b : a;
}
function presetRatioAsNumber({
  ratio,
  ...rest
}) {
  return {
    ratio: ratioToNumber(ratio),
    ...rest
  };
}
export default function AspectRatioDropdown({
  toggleProps
}) {
  const {
    isInProgress,
    aspect,
    setAspect,
    defaultAspect
  } = useImageEditingContext();
  const [defaultRatios, themeRatios, showDefaultRatios] = useSettings('dimensions.aspectRatios.default', 'dimensions.aspectRatios.theme', 'dimensions.defaultAspectRatios');
  return /*#__PURE__*/_jsx(DropdownMenu, {
    icon: aspectRatioIcon,
    label: __('Aspect Ratio'),
    popoverProps: POPOVER_PROPS,
    toggleProps: toggleProps,
    children: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(AspectRatioGroup, {
        isDisabled: isInProgress,
        onClick: newAspect => {
          setAspect(newAspect);
          onClose();
        },
        value: aspect,
        aspectRatios: [
        // All ratios should be mirrored in AspectRatioTool in @wordpress/block-editor.
        {
          slug: 'original',
          name: __('Original'),
          aspect: defaultAspect
        }, ...(showDefaultRatios ? defaultRatios.map(presetRatioAsNumber).filter(({
          ratio
        }) => ratio === 1) : [])]
      }), themeRatios?.length > 0 && /*#__PURE__*/_jsx(AspectRatioGroup, {
        label: __('Theme'),
        isDisabled: isInProgress,
        onClick: newAspect => {
          setAspect(newAspect);
          onClose();
        },
        value: aspect,
        aspectRatios: themeRatios
      }), showDefaultRatios && /*#__PURE__*/_jsx(AspectRatioGroup, {
        label: __('Landscape'),
        isDisabled: isInProgress,
        onClick: newAspect => {
          setAspect(newAspect);
          onClose();
        },
        value: aspect,
        aspectRatios: defaultRatios.map(presetRatioAsNumber).filter(({
          ratio
        }) => ratio > 1)
      }), showDefaultRatios && /*#__PURE__*/_jsx(AspectRatioGroup, {
        label: __('Portrait'),
        isDisabled: isInProgress,
        onClick: newAspect => {
          setAspect(newAspect);
          onClose();
        },
        value: aspect,
        aspectRatios: defaultRatios.map(presetRatioAsNumber).filter(({
          ratio
        }) => ratio < 1)
      })]
    })
  });
}
//# sourceMappingURL=aspect-ratio-dropdown.js.map