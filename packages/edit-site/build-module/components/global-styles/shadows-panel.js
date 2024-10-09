/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalItemGroup as ItemGroup, Button, Flex, FlexItem } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { plus, shadow as shadowIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import Subtitle from './subtitle';
import { NavigationButtonAsItem } from './navigation-button';
import ScreenHeader from './header';
import { getNewIndexFromPresets } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
export const defaultShadow = '6px 6px 9px rgba(0, 0, 0, 0.2)';
export default function ShadowsPanel() {
  const [defaultShadows] = useGlobalSetting('shadow.presets.default');
  const [defaultShadowsEnabled] = useGlobalSetting('shadow.defaultPresets');
  const [themeShadows] = useGlobalSetting('shadow.presets.theme');
  const [customShadows, setCustomShadows] = useGlobalSetting('shadow.presets.custom');
  const onCreateShadow = shadow => {
    setCustomShadows([...(customShadows || []), shadow]);
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Shadows'),
      description: __('Manage and create shadow styles for use across the site.')
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-site-global-styles-screen",
      children: /*#__PURE__*/_jsxs(VStack, {
        className: "edit-site-global-styles__shadows-panel",
        spacing: 7,
        children: [defaultShadowsEnabled && /*#__PURE__*/_jsx(ShadowList, {
          label: __('Default'),
          shadows: defaultShadows || [],
          category: "default"
        }), themeShadows && themeShadows.length > 0 && /*#__PURE__*/_jsx(ShadowList, {
          label: __('Theme'),
          shadows: themeShadows || [],
          category: "theme"
        }), /*#__PURE__*/_jsx(ShadowList, {
          label: __('Custom'),
          shadows: customShadows || [],
          category: "custom",
          canCreate: true,
          onCreate: onCreateShadow
        })]
      })
    })]
  });
}
function ShadowList({
  label,
  shadows,
  category,
  canCreate,
  onCreate
}) {
  const handleAddShadow = () => {
    const newIndex = getNewIndexFromPresets(shadows, 'shadow-');
    onCreate({
      name: sprintf( /* translators: %s: is an index for a preset */
      __('Shadow %s'), newIndex),
      shadow: defaultShadow,
      slug: `shadow-${newIndex}`
    });
  };
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 2,
    children: [/*#__PURE__*/_jsxs(HStack, {
      justify: "space-between",
      children: [/*#__PURE__*/_jsx(Flex, {
        align: "center",
        className: "edit-site-global-styles__shadows-panel__title",
        children: /*#__PURE__*/_jsx(Subtitle, {
          level: 3,
          children: label
        })
      }), canCreate && /*#__PURE__*/_jsx(FlexItem, {
        className: "edit-site-global-styles__shadows-panel__options-container",
        children: /*#__PURE__*/_jsx(Button, {
          size: "small",
          icon: plus,
          label: __('Add shadow'),
          onClick: () => {
            handleAddShadow();
          }
        })
      })]
    }), shadows.length > 0 && /*#__PURE__*/_jsx(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: shadows.map(shadow => /*#__PURE__*/_jsx(ShadowItem, {
        shadow: shadow,
        category: category
      }, shadow.slug))
    })]
  });
}
function ShadowItem({
  shadow,
  category
}) {
  return /*#__PURE__*/_jsx(NavigationButtonAsItem, {
    path: `/shadows/edit/${category}/${shadow.slug}`,
    "aria-label":
    // translators: %s: name of the shadow
    sprintf('Edit shadow %s', shadow.name),
    icon: shadowIcon,
    children: shadow.name
  });
}
//# sourceMappingURL=shadows-panel.js.map