/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { displayShortcut } from '@wordpress/keycodes';
import { external, moreVertical } from '@wordpress/icons';
import { MenuGroup, MenuItem, VisuallyHidden, DropdownMenu } from '@wordpress/components';
import { PreferenceToggleMenuItem, store as preferencesStore } from '@wordpress/preferences';
import { store as interfaceStore, ActionItem } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import CopyContentMenuItem from './copy-content-menu-item';
import ModeSwitcher from '../mode-switcher';
import ToolsMoreMenuGroup from './tools-more-menu-group';
import ViewMoreMenuGroup from './view-more-menu-group';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function MoreMenu() {
  const {
    openModal
  } = useDispatch(interfaceStore);
  const {
    set: setPreference
  } = useDispatch(preferencesStore);
  const {
    toggleDistractionFree
  } = useDispatch(editorStore);
  const showIconLabels = useSelect(select => select(preferencesStore).get('core', 'showIconLabels'), []);
  const turnOffDistractionFree = () => {
    setPreference('core', 'distractionFree', false);
  };
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(DropdownMenu, {
      icon: moreVertical,
      label: __('Options'),
      popoverProps: {
        placement: 'bottom-end',
        className: 'more-menu-dropdown__content'
      },
      toggleProps: {
        showTooltip: !showIconLabels,
        ...(showIconLabels && {
          variant: 'tertiary'
        }),
        tooltipPosition: 'bottom',
        size: 'compact'
      },
      children: ({
        onClose
      }) => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(MenuGroup, {
          label: _x('View', 'noun'),
          children: [/*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
            scope: "core",
            name: "fixedToolbar",
            onToggle: turnOffDistractionFree,
            label: __('Top toolbar'),
            info: __('Access all block and document tools in a single place'),
            messageActivated: __('Top toolbar activated'),
            messageDeactivated: __('Top toolbar deactivated')
          }), /*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
            scope: "core",
            name: "distractionFree",
            label: __('Distraction free'),
            info: __('Write with calmness'),
            handleToggling: false,
            onToggle: toggleDistractionFree,
            messageActivated: __('Distraction free mode activated'),
            messageDeactivated: __('Distraction free mode deactivated'),
            shortcut: displayShortcut.primaryShift('\\')
          }), /*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
            scope: "core",
            name: "focusMode",
            label: __('Spotlight mode'),
            info: __('Focus on one block at a time'),
            messageActivated: __('Spotlight mode activated'),
            messageDeactivated: __('Spotlight mode deactivated')
          }), /*#__PURE__*/_jsx(ViewMoreMenuGroup.Slot, {
            fillProps: {
              onClose
            }
          })]
        }), /*#__PURE__*/_jsx(ModeSwitcher, {}), /*#__PURE__*/_jsx(ActionItem.Slot, {
          name: "core/plugin-more-menu",
          label: __('Plugins'),
          as: MenuGroup,
          fillProps: {
            onClick: onClose
          }
        }), /*#__PURE__*/_jsxs(MenuGroup, {
          label: __('Tools'),
          children: [/*#__PURE__*/_jsx(MenuItem, {
            onClick: () => openModal('editor/keyboard-shortcut-help'),
            shortcut: displayShortcut.access('h'),
            children: __('Keyboard shortcuts')
          }), /*#__PURE__*/_jsx(CopyContentMenuItem, {}), /*#__PURE__*/_jsxs(MenuItem, {
            icon: external,
            href: __('https://wordpress.org/documentation/article/wordpress-block-editor/'),
            target: "_blank",
            rel: "noopener noreferrer",
            children: [__('Help'), /*#__PURE__*/_jsx(VisuallyHidden, {
              as: "span",
              children: /* translators: accessibility text */
              __('(opens in a new tab)')
            })]
          }), /*#__PURE__*/_jsx(ToolsMoreMenuGroup.Slot, {
            fillProps: {
              onClose
            }
          })]
        }), /*#__PURE__*/_jsx(MenuGroup, {
          children: /*#__PURE__*/_jsx(MenuItem, {
            onClick: () => openModal('editor/preferences'),
            children: __('Preferences')
          })
        })]
      })
    })
  });
}
//# sourceMappingURL=index.js.map