/**
 * WordPress dependencies
 */
import { useEffect, useState, useCallback, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { EntityProvider } from '@wordpress/core-data';
import { __unstableDisclosureContent as DisclosureContent, Panel, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import WidgetAreaInnerBlocks from './inner-blocks';
import { store as editWidgetsStore } from '../../../store';
import useIsDraggingWithin from './use-is-dragging-within';

/** @typedef {import('@wordpress/element').RefObject} RefObject */
import { jsx as _jsx } from "react/jsx-runtime";
export default function WidgetAreaEdit({
  clientId,
  className,
  attributes: {
    id,
    name
  }
}) {
  const isOpen = useSelect(select => select(editWidgetsStore).getIsWidgetAreaOpen(clientId), [clientId]);
  const {
    setIsWidgetAreaOpen
  } = useDispatch(editWidgetsStore);
  const wrapper = useRef();
  const setOpen = useCallback(openState => setIsWidgetAreaOpen(clientId, openState), [clientId]);
  const isDragging = useIsDragging(wrapper);
  const isDraggingWithin = useIsDraggingWithin(wrapper);
  const [openedWhileDragging, setOpenedWhileDragging] = useState(false);
  useEffect(() => {
    if (!isDragging) {
      setOpenedWhileDragging(false);
      return;
    }
    if (isDraggingWithin && !isOpen) {
      setOpen(true);
      setOpenedWhileDragging(true);
    } else if (!isDraggingWithin && isOpen && openedWhileDragging) {
      setOpen(false);
    }
  }, [isOpen, isDragging, isDraggingWithin, openedWhileDragging]);
  return /*#__PURE__*/_jsx(Panel, {
    className: className,
    ref: wrapper,
    children: /*#__PURE__*/_jsx(PanelBody, {
      title: name,
      opened: isOpen,
      onToggle: () => {
        setIsWidgetAreaOpen(clientId, !isOpen);
      },
      scrollAfterOpen: !isDragging,
      children: ({
        opened
      }) =>
      /*#__PURE__*/
      // This is required to ensure LegacyWidget blocks are not
      // unmounted when the panel is collapsed. Unmounting legacy
      // widgets may have unintended consequences (e.g.  TinyMCE
      // not being properly reinitialized)
      _jsx(DisclosureContent, {
        className: "wp-block-widget-area__panel-body-content",
        visible: opened,
        children: /*#__PURE__*/_jsx(EntityProvider, {
          kind: "root",
          type: "postType",
          id: `widget-area-${id}`,
          children: /*#__PURE__*/_jsx(WidgetAreaInnerBlocks, {
            id: id
          })
        })
      })
    })
  });
}

/**
 * A React hook to determine if dragging is active.
 *
 * @param {RefObject<HTMLElement>} elementRef The target elementRef object.
 *
 * @return {boolean} Is dragging within the entire document.
 */
const useIsDragging = elementRef => {
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const {
      ownerDocument
    } = elementRef.current;
    function handleDragStart() {
      setIsDragging(true);
    }
    function handleDragEnd() {
      setIsDragging(false);
    }
    ownerDocument.addEventListener('dragstart', handleDragStart);
    ownerDocument.addEventListener('dragend', handleDragEnd);
    return () => {
      ownerDocument.removeEventListener('dragstart', handleDragStart);
      ownerDocument.removeEventListener('dragend', handleDragEnd);
    };
  }, []);
  return isDragging;
};
//# sourceMappingURL=index.js.map