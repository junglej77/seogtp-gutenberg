/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useReducer } from '@wordpress/element';
import { MenuItem } from '@wordpress/components';
import { lockOutline, unlock } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import useBlockLock from './use-block-lock';
import BlockLockModal from './modal';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockLockMenuItem({
  clientId
}) {
  const {
    canLock,
    isLocked
  } = useBlockLock(clientId);
  const [isModalOpen, toggleModal] = useReducer(isActive => !isActive, false);
  if (!canLock) {
    return null;
  }
  const label = isLocked ? __('Unlock') : __('Lock');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(MenuItem, {
      icon: isLocked ? unlock : lockOutline,
      onClick: toggleModal,
      "aria-expanded": isModalOpen,
      "aria-haspopup": "dialog",
      children: label
    }), isModalOpen && /*#__PURE__*/_jsx(BlockLockModal, {
      clientId: clientId,
      onClose: toggleModal
    })]
  });
}
//# sourceMappingURL=menu-item.js.map