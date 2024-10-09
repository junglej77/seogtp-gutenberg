/**
 * WordPress dependencies
 */
import { Button, VisuallyHidden } from '@wordpress/components';
import { close } from '@wordpress/icons';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { useViewportMatch, __experimentalUseDialog as useDialog } from '@wordpress/compose';
import { useCallback, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useWidgetLibraryInsertionPoint from '../../hooks/use-widget-library-insertion-point';
import { store as editWidgetsStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function InserterSidebar() {
  const isMobileViewport = useViewportMatch('medium', '<');
  const {
    rootClientId,
    insertionIndex
  } = useWidgetLibraryInsertionPoint();
  const {
    setIsInserterOpened
  } = useDispatch(editWidgetsStore);
  const closeInserter = useCallback(() => {
    return setIsInserterOpened(false);
  }, [setIsInserterOpened]);
  const TagName = !isMobileViewport ? VisuallyHidden : 'div';
  const [inserterDialogRef, inserterDialogProps] = useDialog({
    onClose: closeInserter,
    focusOnMount: true
  });
  const libraryRef = useRef();
  return /*#__PURE__*/_jsxs("div", {
    ref: inserterDialogRef,
    ...inserterDialogProps,
    className: "edit-widgets-layout__inserter-panel",
    children: [/*#__PURE__*/_jsx(TagName, {
      className: "edit-widgets-layout__inserter-panel-header",
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        icon: close,
        onClick: closeInserter,
        label: __('Close block inserter')
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-widgets-layout__inserter-panel-content",
      children: /*#__PURE__*/_jsx(Library, {
        showInserterHelpPanel: true,
        shouldFocusBlock: isMobileViewport,
        rootClientId: rootClientId,
        __experimentalInsertionIndex: insertionIndex,
        ref: libraryRef
      })
    })]
  });
}
//# sourceMappingURL=inserter-sidebar.js.map