/**
 * WordPress dependencies
 */
import { Button, __unstableMotion as motion, __unstableAnimatePresence as AnimatePresence } from '@wordpress/components';
import { chevronLeftSmall, chevronRightSmall } from '@wordpress/icons';
import { useReducedMotion, useInstanceId } from '@wordpress/compose';
import { _x, isRTL } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function LinkSettingsDrawer({
  children,
  settingsOpen,
  setSettingsOpen
}) {
  const prefersReducedMotion = useReducedMotion();
  const MaybeAnimatePresence = prefersReducedMotion ? Fragment : AnimatePresence;
  const MaybeMotionDiv = prefersReducedMotion ? 'div' : motion.div;
  const id = useInstanceId(LinkSettingsDrawer);
  const settingsDrawerId = `link-control-settings-drawer-${id}`;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "block-editor-link-control__drawer-toggle",
      "aria-expanded": settingsOpen,
      onClick: () => setSettingsOpen(!settingsOpen),
      icon: isRTL() ? chevronLeftSmall : chevronRightSmall,
      "aria-controls": settingsDrawerId,
      children: _x('Advanced', 'Additional link settings')
    }), /*#__PURE__*/_jsx(MaybeAnimatePresence, {
      children: settingsOpen && /*#__PURE__*/_jsx(MaybeMotionDiv, {
        className: "block-editor-link-control__drawer",
        hidden: !settingsOpen,
        id: settingsDrawerId,
        initial: "collapsed",
        animate: "open",
        exit: "collapsed",
        variants: {
          open: {
            opacity: 1,
            height: 'auto'
          },
          collapsed: {
            opacity: 0,
            height: 0
          }
        },
        transition: {
          duration: 0.1
        },
        children: /*#__PURE__*/_jsx("div", {
          className: "block-editor-link-control__drawer-inner",
          children: children
        })
      })
    })]
  });
}
export default LinkSettingsDrawer;
//# sourceMappingURL=settings-drawer.js.map