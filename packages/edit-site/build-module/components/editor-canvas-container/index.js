/**
 * WordPress dependencies
 */
import { Children, cloneElement, useState } from '@wordpress/element';
import { Button, __experimentalUseSlotFills as useSlotFills } from '@wordpress/components';
import { ESCAPE } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { backup, closeSmall, seen } from '@wordpress/icons';
import { useFocusOnMount, useFocusReturn } from '@wordpress/compose';
import { store as preferencesStore } from '@wordpress/preferences';
import { store as editorStore, privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  EditorContentSlotFill,
  ResizableEditor
} = unlock(editorPrivateApis);

/**
 * Returns a translated string for the title of the editor canvas container.
 *
 * @param {string} view Editor canvas container view.
 *
 * @return {Object} Translated string for the view title and associated icon, both defaulting to ''.
 */
function getEditorCanvasContainerTitleAndIcon(view) {
  switch (view) {
    case 'style-book':
      return {
        title: __('Style Book'),
        icon: seen
      };
    case 'global-styles-revisions':
    case 'global-styles-revisions:style-book':
      return {
        title: __('Style Revisions'),
        icon: backup
      };
    default:
      return {
        title: '',
        icon: ''
      };
  }
}
function EditorCanvasContainer({
  children,
  closeButtonLabel,
  onClose,
  enableResizing = false
}) {
  const {
    editorCanvasContainerView,
    showListViewByDefault
  } = useSelect(select => {
    const _editorCanvasContainerView = unlock(select(editSiteStore)).getEditorCanvasContainerView();
    const _showListViewByDefault = select(preferencesStore).get('core', 'showListViewByDefault');
    return {
      editorCanvasContainerView: _editorCanvasContainerView,
      showListViewByDefault: _showListViewByDefault
    };
  }, []);
  const [isClosed, setIsClosed] = useState(false);
  const {
    setEditorCanvasContainerView
  } = unlock(useDispatch(editSiteStore));
  const {
    setIsListViewOpened
  } = useDispatch(editorStore);
  const focusOnMountRef = useFocusOnMount('firstElement');
  const sectionFocusReturnRef = useFocusReturn();
  function onCloseContainer() {
    setIsListViewOpened(showListViewByDefault);
    setEditorCanvasContainerView(undefined);
    setIsClosed(true);
    if (typeof onClose === 'function') {
      onClose();
    }
  }
  function closeOnEscape(event) {
    if (event.keyCode === ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      onCloseContainer();
    }
  }
  const childrenWithProps = Array.isArray(children) ? Children.map(children, (child, index) => index === 0 ? cloneElement(child, {
    ref: sectionFocusReturnRef
  }) : child) : cloneElement(children, {
    ref: sectionFocusReturnRef
  });
  if (isClosed) {
    return null;
  }
  const {
    title
  } = getEditorCanvasContainerTitleAndIcon(editorCanvasContainerView);
  const shouldShowCloseButton = onClose || closeButtonLabel;
  return /*#__PURE__*/_jsx(EditorContentSlotFill.Fill, {
    children: /*#__PURE__*/_jsx("div", {
      className: "edit-site-editor-canvas-container",
      children: /*#__PURE__*/_jsx(ResizableEditor, {
        enableResizing: enableResizing,
        children: /*#__PURE__*/_jsxs("section", {
          className: "edit-site-editor-canvas-container__section",
          ref: shouldShowCloseButton ? focusOnMountRef : null,
          onKeyDown: closeOnEscape,
          "aria-label": title,
          children: [shouldShowCloseButton && /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            className: "edit-site-editor-canvas-container__close-button",
            icon: closeSmall,
            label: closeButtonLabel || __('Close'),
            onClick: onCloseContainer
          }), childrenWithProps]
        })
      })
    })
  });
}
function useHasEditorCanvasContainer() {
  const fills = useSlotFills(EditorContentSlotFill.privateKey);
  return !!fills?.length;
}
export default EditorCanvasContainer;
export { useHasEditorCanvasContainer, getEditorCanvasContainerTitleAndIcon };
//# sourceMappingURL=index.js.map