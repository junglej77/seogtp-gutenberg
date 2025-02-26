/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useReducer, useRef, useEffect } from '@wordpress/element';
import { lock, unlock } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BlockLockModal from './modal';
import useBlockLock from './use-block-lock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockLockToolbar({
  clientId
}) {
  const {
    canLock,
    isLocked
  } = useBlockLock(clientId);
  const [isModalOpen, toggleModal] = useReducer(isActive => !isActive, false);
  const hasLockButtonShownRef = useRef(false);

  // If the block lock button has been shown, we don't want to remove it
  // from the toolbar until the toolbar is rendered again without it.
  // Removing it beforehand can cause focus loss issues, such as when
  // unlocking the block from the modal. It needs to return focus from
  // whence it came, and to do that, we need to leave the button in the toolbar.
  useEffect(() => {
    if (isLocked) {
      hasLockButtonShownRef.current = true;
    }
  }, [isLocked]);
  if (!isLocked && !hasLockButtonShownRef.current) {
    return null;
  }
  let label = isLocked ? __('Unlock') : __('Lock');
  if (!canLock && isLocked) {
    label = __('Locked');
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolbarGroup, {
      className: "block-editor-block-lock-toolbar",
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        disabled: !canLock,
        icon: isLocked ? lock : unlock,
        label: label,
        onClick: toggleModal,
        "aria-expanded": isModalOpen,
        "aria-haspopup": "dialog"
      })
    }), isModalOpen && /*#__PURE__*/_jsx(BlockLockModal, {
      clientId: clientId,
      onClose: toggleModal
    })]
  });
}
//# sourceMappingURL=toolbar.js.map