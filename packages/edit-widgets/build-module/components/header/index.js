/**
 * WordPress dependencies
 */
import { BlockToolbar } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Popover, VisuallyHidden } from '@wordpress/components';
import { PinnedItems } from '@wordpress/interface';
import { useViewportMatch } from '@wordpress/compose';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import DocumentTools from './document-tools';
import SaveButton from '../save-button';
import MoreMenu from '../more-menu';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Header() {
  const isLargeViewport = useViewportMatch('medium');
  const blockToolbarRef = useRef();
  const {
    hasFixedToolbar
  } = useSelect(select => ({
    hasFixedToolbar: !!select(preferencesStore).get('core/edit-widgets', 'fixedToolbar')
  }), []);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: "edit-widgets-header",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "edit-widgets-header__navigable-toolbar-wrapper",
        children: [isLargeViewport && /*#__PURE__*/_jsx("h1", {
          className: "edit-widgets-header__title",
          children: __('Widgets')
        }), !isLargeViewport && /*#__PURE__*/_jsx(VisuallyHidden, {
          as: "h1",
          className: "edit-widgets-header__title",
          children: __('Widgets')
        }), /*#__PURE__*/_jsx(DocumentTools, {}), hasFixedToolbar && isLargeViewport && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "selected-block-tools-wrapper",
            children: /*#__PURE__*/_jsx(BlockToolbar, {
              hideDragHandle: true
            })
          }), /*#__PURE__*/_jsx(Popover.Slot, {
            ref: blockToolbarRef,
            name: "block-toolbar"
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "edit-widgets-header__actions",
        children: [/*#__PURE__*/_jsx(PinnedItems.Slot, {
          scope: "core/edit-widgets"
        }), /*#__PURE__*/_jsx(SaveButton, {}), /*#__PURE__*/_jsx(MoreMenu, {})]
      })]
    })
  });
}
export default Header;
//# sourceMappingURL=index.js.map