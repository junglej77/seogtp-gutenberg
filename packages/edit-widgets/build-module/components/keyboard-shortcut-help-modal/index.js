/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useShortcut, store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { textFormattingShortcuts } from './config';
import Shortcut from './shortcut';
import DynamicShortcut from './dynamic-shortcut';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ShortcutList = ({
  shortcuts
}) =>
/*#__PURE__*/
/*
 * Disable reason: The `list` ARIA role is redundant but
 * Safari+VoiceOver won't announce the list otherwise.
 */
/* eslint-disable jsx-a11y/no-redundant-roles */
_jsx("ul", {
  className: "edit-widgets-keyboard-shortcut-help-modal__shortcut-list",
  role: "list",
  children: shortcuts.map((shortcut, index) => /*#__PURE__*/_jsx("li", {
    className: "edit-widgets-keyboard-shortcut-help-modal__shortcut",
    children: typeof shortcut === 'string' ? /*#__PURE__*/_jsx(DynamicShortcut, {
      name: shortcut
    }) : /*#__PURE__*/_jsx(Shortcut, {
      ...shortcut
    })
  }, index))
})
/* eslint-enable jsx-a11y/no-redundant-roles */;
const ShortcutSection = ({
  title,
  shortcuts,
  className
}) => /*#__PURE__*/_jsxs("section", {
  className: clsx('edit-widgets-keyboard-shortcut-help-modal__section', className),
  children: [!!title && /*#__PURE__*/_jsx("h2", {
    className: "edit-widgets-keyboard-shortcut-help-modal__section-title",
    children: title
  }), /*#__PURE__*/_jsx(ShortcutList, {
    shortcuts: shortcuts
  })]
});
const ShortcutCategorySection = ({
  title,
  categoryName,
  additionalShortcuts = []
}) => {
  const categoryShortcuts = useSelect(select => {
    return select(keyboardShortcutsStore).getCategoryShortcuts(categoryName);
  }, [categoryName]);
  return /*#__PURE__*/_jsx(ShortcutSection, {
    title: title,
    shortcuts: categoryShortcuts.concat(additionalShortcuts)
  });
};
export default function KeyboardShortcutHelpModal({
  isModalActive,
  toggleModal
}) {
  useShortcut('core/edit-widgets/keyboard-shortcuts', toggleModal, {
    bindGlobal: true
  });
  if (!isModalActive) {
    return null;
  }
  return /*#__PURE__*/_jsxs(Modal, {
    className: "edit-widgets-keyboard-shortcut-help-modal",
    title: __('Keyboard shortcuts'),
    onRequestClose: toggleModal,
    children: [/*#__PURE__*/_jsx(ShortcutSection, {
      className: "edit-widgets-keyboard-shortcut-help-modal__main-shortcuts",
      shortcuts: ['core/edit-widgets/keyboard-shortcuts']
    }), /*#__PURE__*/_jsx(ShortcutCategorySection, {
      title: __('Global shortcuts'),
      categoryName: "global"
    }), /*#__PURE__*/_jsx(ShortcutCategorySection, {
      title: __('Selection shortcuts'),
      categoryName: "selection"
    }), /*#__PURE__*/_jsx(ShortcutCategorySection, {
      title: __('Block shortcuts'),
      categoryName: "block",
      additionalShortcuts: [{
        keyCombination: {
          character: '/'
        },
        description: __('Change the block type after adding a new paragraph.'),
        /* translators: The forward-slash character. e.g. '/'. */
        ariaLabel: __('Forward-slash')
      }]
    }), /*#__PURE__*/_jsx(ShortcutSection, {
      title: __('Text formatting'),
      shortcuts: textFormattingShortcuts
    }), /*#__PURE__*/_jsx(ShortcutCategorySection, {
      title: __('List View shortcuts'),
      categoryName: "list-view"
    })]
  });
}
//# sourceMappingURL=index.js.map