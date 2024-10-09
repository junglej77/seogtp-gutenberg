/**
 * WordPress dependencies
 */
import { MenuGroup, MenuItem, ToolbarDropdownMenu, VisuallyHidden } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { external, moreVertical } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { PreferenceToggleMenuItem } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import KeyboardShortcutHelpModal from '../keyboard-shortcut-help-modal';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function MoreMenu() {
  const [isKeyboardShortcutsModalActive, setIsKeyboardShortcutsModalVisible] = useState(false);
  const toggleKeyboardShortcutsModal = () => setIsKeyboardShortcutsModalVisible(!isKeyboardShortcutsModalActive);
  useShortcut('core/customize-widgets/keyboard-shortcuts', toggleKeyboardShortcutsModal);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolbarDropdownMenu, {
      icon: moreVertical,
      label: __('Options'),
      popoverProps: {
        placement: 'bottom-end',
        className: 'more-menu-dropdown__content'
      },
      toggleProps: {
        tooltipPosition: 'bottom',
        size: 'compact'
      },
      children: () => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(MenuGroup, {
          label: _x('View', 'noun'),
          children: /*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
            scope: "core/customize-widgets",
            name: "fixedToolbar",
            label: __('Top toolbar'),
            info: __('Access all block and document tools in a single place'),
            messageActivated: __('Top toolbar activated'),
            messageDeactivated: __('Top toolbar deactivated')
          })
        }), /*#__PURE__*/_jsxs(MenuGroup, {
          label: __('Tools'),
          children: [/*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              setIsKeyboardShortcutsModalVisible(true);
            },
            shortcut: displayShortcut.access('h'),
            children: __('Keyboard shortcuts')
          }), /*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
            scope: "core/customize-widgets",
            name: "welcomeGuide",
            label: __('Welcome Guide')
          }), /*#__PURE__*/_jsxs(MenuItem, {
            role: "menuitem",
            icon: external,
            href: __('https://wordpress.org/documentation/article/block-based-widgets-editor/'),
            target: "_blank",
            rel: "noopener noreferrer",
            children: [__('Help'), /*#__PURE__*/_jsx(VisuallyHidden, {
              as: "span",
              children: /* translators: accessibility text */
              __('(opens in a new tab)')
            })]
          })]
        }), /*#__PURE__*/_jsx(MenuGroup, {
          label: __('Preferences'),
          children: /*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
            scope: "core/customize-widgets",
            name: "keepCaretInsideBlock",
            label: __('Contain text cursor inside block'),
            info: __('Aids screen readers by stopping text caret from leaving blocks.'),
            messageActivated: __('Contain text cursor inside block activated'),
            messageDeactivated: __('Contain text cursor inside block deactivated')
          })
        })]
      })
    }), /*#__PURE__*/_jsx(KeyboardShortcutHelpModal, {
      isModalActive: isKeyboardShortcutsModalActive,
      toggleModal: toggleKeyboardShortcutsModal
    })]
  });
}
//# sourceMappingURL=index.js.map