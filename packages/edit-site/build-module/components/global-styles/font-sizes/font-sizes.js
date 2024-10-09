/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { __, sprintf, isRTL } from '@wordpress/i18n';
import { privateApis as componentsPrivateApis, __experimentalSpacer as Spacer, __experimentalView as View, __experimentalItemGroup as ItemGroup, __experimentalVStack as VStack, __experimentalHStack as HStack, FlexItem, FlexBlock, Button } from '@wordpress/components';
import { Icon, plus, moreVertical, chevronLeft, chevronRight } from '@wordpress/icons';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../../lock-unlock';
const {
  DropdownMenuV2
} = unlock(componentsPrivateApis);
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
import Subtitle from '../subtitle';
import { NavigationButtonAsItem } from '../navigation-button';
import { getNewIndexFromPresets } from '../utils';
import ScreenHeader from '../header';
import ConfirmResetFontSizesDialog from './confirm-reset-font-sizes-dialog';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function FontSizeGroup({
  label,
  origin,
  sizes,
  handleAddFontSize,
  handleResetFontSizes
}) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const toggleResetDialog = () => setIsResetDialogOpen(!isResetDialogOpen);
  const resetDialogText = origin === 'custom' ? __('Are you sure you want to remove all custom font size presets?') : __('Are you sure you want to reset all font size presets to their default values?');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isResetDialogOpen && /*#__PURE__*/_jsx(ConfirmResetFontSizesDialog, {
      text: resetDialogText,
      confirmButtonText: origin === 'custom' ? __('Remove') : __('Reset'),
      isOpen: isResetDialogOpen,
      toggleOpen: toggleResetDialog,
      onConfirm: handleResetFontSizes
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 4,
      children: [/*#__PURE__*/_jsxs(HStack, {
        justify: "space-between",
        align: "center",
        children: [/*#__PURE__*/_jsx(Subtitle, {
          level: 3,
          children: label
        }), /*#__PURE__*/_jsxs(FlexItem, {
          children: [origin === 'custom' && /*#__PURE__*/_jsx(Button, {
            label: __('Add font size'),
            icon: plus,
            size: "small",
            onClick: handleAddFontSize
          }), !!handleResetFontSizes && /*#__PURE__*/_jsx(DropdownMenuV2, {
            trigger: /*#__PURE__*/_jsx(Button, {
              size: "small",
              icon: moreVertical,
              label: __('Font size presets options')
            }),
            children: /*#__PURE__*/_jsx(DropdownMenuV2.Item, {
              onClick: toggleResetDialog,
              children: /*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
                children: origin === 'custom' ? __('Remove font size presets') : __('Reset font size presets')
              })
            })
          })]
        })]
      }), !!sizes.length && /*#__PURE__*/_jsx(ItemGroup, {
        isBordered: true,
        isSeparated: true,
        children: sizes.map(size => /*#__PURE__*/_jsx(NavigationButtonAsItem, {
          path: `/typography/font-sizes/${origin}/${size.slug}`,
          children: /*#__PURE__*/_jsxs(HStack, {
            direction: "row",
            children: [/*#__PURE__*/_jsx(FlexItem, {
              className: "edit-site-font-size__item",
              children: size.name
            }), /*#__PURE__*/_jsx(FlexItem, {
              children: /*#__PURE__*/_jsxs(HStack, {
                justify: "flex-end",
                children: [/*#__PURE__*/_jsx(FlexBlock, {
                  className: "edit-site-font-size__item edit-site-font-size__item-value",
                  children: size.size
                }), /*#__PURE__*/_jsx(Icon, {
                  icon: isRTL() ? chevronLeft : chevronRight
                })]
              })
            })]
          })
        }, size.slug))
      })]
    })]
  });
}
function FontSizes() {
  const [themeFontSizes, setThemeFontSizes] = useGlobalSetting('typography.fontSizes.theme');
  const [baseThemeFontSizes] = useGlobalSetting('typography.fontSizes.theme', null, 'base');
  const [defaultFontSizes, setDefaultFontSizes] = useGlobalSetting('typography.fontSizes.default');
  const [baseDefaultFontSizes] = useGlobalSetting('typography.fontSizes.default', null, 'base');
  const [customFontSizes = [], setCustomFontSizes] = useGlobalSetting('typography.fontSizes.custom');
  const [defaultFontSizesEnabled] = useGlobalSetting('typography.defaultFontSizes');
  const handleAddFontSize = () => {
    const index = getNewIndexFromPresets(customFontSizes, 'custom-');
    const newFontSize = {
      /* translators: %d: font size index */
      name: sprintf(__('New Font Size %d'), index),
      size: '16px',
      slug: `custom-${index}`
    };
    setCustomFontSizes([...customFontSizes, newFontSize]);
  };
  const hasSameSizeValues = (arr1, arr2) => arr1.map(item => item.size).join('') === arr2.map(item => item.size).join('');
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 2,
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Font size presets'),
      description: __('Create and edit the presets used for font sizes across the site.')
    }), /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(Spacer, {
        paddingX: 4,
        children: /*#__PURE__*/_jsxs(VStack, {
          spacing: 8,
          children: [!!themeFontSizes?.length && /*#__PURE__*/_jsx(FontSizeGroup, {
            label: __('Theme'),
            origin: "theme",
            sizes: themeFontSizes,
            baseSizes: baseThemeFontSizes,
            handleAddFontSize: handleAddFontSize,
            handleResetFontSizes: hasSameSizeValues(themeFontSizes, baseThemeFontSizes) ? null : () => setThemeFontSizes(baseThemeFontSizes)
          }), defaultFontSizesEnabled && !!defaultFontSizes?.length && /*#__PURE__*/_jsx(FontSizeGroup, {
            label: __('Default'),
            origin: "default",
            sizes: defaultFontSizes,
            baseSizes: baseDefaultFontSizes,
            handleAddFontSize: handleAddFontSize,
            handleResetFontSizes: hasSameSizeValues(defaultFontSizes, baseDefaultFontSizes) ? null : () => setDefaultFontSizes(baseDefaultFontSizes)
          }), /*#__PURE__*/_jsx(FontSizeGroup, {
            label: __('Custom'),
            origin: "custom",
            sizes: customFontSizes,
            handleAddFontSize: handleAddFontSize,
            handleResetFontSizes: customFontSizes.length > 0 ? () => setCustomFontSizes([]) : null
          })]
        })
      })
    })]
  });
}
export default FontSizes;
//# sourceMappingURL=font-sizes.js.map