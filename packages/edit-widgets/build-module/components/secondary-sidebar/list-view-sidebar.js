/**
 * WordPress dependencies
 */
import { __experimentalListView as ListView } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useFocusOnMount, useMergeRefs } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { ESCAPE } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ListViewSidebar() {
  const {
    setIsListViewOpened
  } = useDispatch(editWidgetsStore);
  const {
    getListViewToggleRef
  } = unlock(useSelect(editWidgetsStore));

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the dropZoneElement updates.
  const [dropZoneElement, setDropZoneElement] = useState(null);
  const focusOnMountRef = useFocusOnMount('firstElement');

  // When closing the list view, focus should return to the toggle button.
  const closeListView = useCallback(() => {
    setIsListViewOpened(false);
    getListViewToggleRef().current?.focus();
  }, [getListViewToggleRef, setIsListViewOpened]);
  const closeOnEscape = useCallback(event => {
    if (event.keyCode === ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      closeListView();
    }
  }, [closeListView]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsxs("div", {
      className: "edit-widgets-editor__list-view-panel",
      onKeyDown: closeOnEscape,
      children: [/*#__PURE__*/_jsxs("div", {
        className: "edit-widgets-editor__list-view-panel-header",
        children: [/*#__PURE__*/_jsx("strong", {
          children: __('List View')
        }), /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          icon: closeSmall,
          label: __('Close'),
          onClick: closeListView
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "edit-widgets-editor__list-view-panel-content",
        ref: useMergeRefs([focusOnMountRef, setDropZoneElement]),
        children: /*#__PURE__*/_jsx(ListView, {
          dropZoneElement: dropZoneElement
        })
      })]
    })
  );
}
//# sourceMappingURL=list-view-sidebar.js.map