/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { ToolbarButton } from '@wordpress/components';
import { NavigableToolbar } from '@wordpress/block-editor';
import { createPortal, useEffect, useState } from '@wordpress/element';
import { displayShortcut, isAppleOS } from '@wordpress/keycodes';
import { __, _x, isRTL } from '@wordpress/i18n';
import { plus, undo as undoIcon, redo as redoIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Inserter from '../inserter';
import MoreMenu from '../more-menu';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function Header({
  sidebar,
  inserter,
  isInserterOpened,
  setIsInserterOpened,
  isFixedToolbarActive
}) {
  const [[hasUndo, hasRedo], setUndoRedo] = useState([sidebar.hasUndo(), sidebar.hasRedo()]);
  const shortcut = isAppleOS() ? displayShortcut.primaryShift('z') : displayShortcut.primary('y');
  useEffect(() => {
    return sidebar.subscribeHistory(() => {
      setUndoRedo([sidebar.hasUndo(), sidebar.hasRedo()]);
    });
  }, [sidebar]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: clsx('customize-widgets-header', {
        'is-fixed-toolbar-active': isFixedToolbarActive
      }),
      children: /*#__PURE__*/_jsxs(NavigableToolbar, {
        className: "customize-widgets-header-toolbar",
        "aria-label": __('Document tools'),
        children: [/*#__PURE__*/_jsx(ToolbarButton, {
          icon: !isRTL() ? undoIcon : redoIcon
          /* translators: button label text should, if possible, be under 16 characters. */,
          label: __('Undo'),
          shortcut: displayShortcut.primary('z'),
          disabled: !hasUndo,
          onClick: sidebar.undo,
          className: "customize-widgets-editor-history-button undo-button"
        }), /*#__PURE__*/_jsx(ToolbarButton, {
          icon: !isRTL() ? redoIcon : undoIcon
          /* translators: button label text should, if possible, be under 16 characters. */,
          label: __('Redo'),
          shortcut: shortcut,
          disabled: !hasRedo,
          onClick: sidebar.redo,
          className: "customize-widgets-editor-history-button redo-button"
        }), /*#__PURE__*/_jsx(ToolbarButton, {
          className: "customize-widgets-header-toolbar__inserter-toggle",
          isPressed: isInserterOpened,
          variant: "primary",
          icon: plus,
          label: _x('Add block', 'Generic label for block inserter button'),
          onClick: () => {
            setIsInserterOpened(isOpen => !isOpen);
          }
        }), /*#__PURE__*/_jsx(MoreMenu, {})]
      })
    }), createPortal( /*#__PURE__*/_jsx(Inserter, {
      setIsOpened: setIsInserterOpened
    }), inserter.contentContainer[0])]
  });
}
export default Header;
//# sourceMappingURL=index.js.map