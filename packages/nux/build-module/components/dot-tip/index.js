/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { Popover, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { useCallback, useRef } from '@wordpress/element';
import { close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as nuxStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function onClick(event) {
  // Tips are often nested within buttons. We stop propagation so that clicking
  // on a tip doesn't result in the button being clicked.
  event.stopPropagation();
}
export function DotTip({
  position = 'middle right',
  children,
  isVisible,
  hasNextTip,
  onDismiss,
  onDisable
}) {
  const anchorParent = useRef(null);
  const onFocusOutsideCallback = useCallback(event => {
    if (!anchorParent.current) {
      return;
    }
    if (anchorParent.current.contains(event.relatedTarget)) {
      return;
    }
    onDisable();
  }, [onDisable, anchorParent]);
  if (!isVisible) {
    return null;
  }
  return /*#__PURE__*/_jsxs(Popover, {
    className: "nux-dot-tip",
    position: position,
    focusOnMount: true,
    role: "dialog",
    "aria-label": __('Editor tips'),
    onClick: onClick,
    onFocusOutside: onFocusOutsideCallback,
    children: [/*#__PURE__*/_jsx("p", {
      children: children
    }), /*#__PURE__*/_jsx("p", {
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "link",
        onClick: onDismiss,
        children: hasNextTip ? __('See next tip') : __('Got it')
      })
    }), /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "nux-dot-tip__disable",
      icon: close,
      label: __('Disable tips'),
      onClick: onDisable
    })]
  });
}
export default compose(withSelect((select, {
  tipId
}) => {
  const {
    isTipVisible,
    getAssociatedGuide
  } = select(nuxStore);
  const associatedGuide = getAssociatedGuide(tipId);
  return {
    isVisible: isTipVisible(tipId),
    hasNextTip: !!(associatedGuide && associatedGuide.nextTipId)
  };
}), withDispatch((dispatch, {
  tipId
}) => {
  const {
    dismissTip,
    disableTips
  } = dispatch(nuxStore);
  return {
    onDismiss() {
      dismissTip(tipId);
    },
    onDisable() {
      disableTips();
    }
  };
}))(DotTip);
//# sourceMappingURL=index.js.map