/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button, Panel, Slot, Fill, __unstableMotion as motion, __unstableAnimatePresence as AnimatePresence } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { check, starEmpty, starFilled } from '@wordpress/icons';
import { useEffect, useRef, useState } from '@wordpress/element';
import { store as viewportStore } from '@wordpress/viewport';
import { store as preferencesStore } from '@wordpress/preferences';
import { useReducedMotion, useViewportMatch, usePrevious } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import ComplementaryAreaHeader from '../complementary-area-header';
import ComplementaryAreaMoreMenuItem from '../complementary-area-more-menu-item';
import ComplementaryAreaToggle from '../complementary-area-toggle';
import withComplementaryAreaContext from '../complementary-area-context';
import PinnedItems from '../pinned-items';
import { store as interfaceStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ANIMATION_DURATION = 0.3;
function ComplementaryAreaSlot({
  scope,
  ...props
}) {
  return /*#__PURE__*/_jsx(Slot, {
    name: `ComplementaryArea/${scope}`,
    ...props
  });
}
const SIDEBAR_WIDTH = 280;
const variants = {
  open: {
    width: SIDEBAR_WIDTH
  },
  closed: {
    width: 0
  },
  mobileOpen: {
    width: '100vw'
  }
};
function ComplementaryAreaFill({
  activeArea,
  isActive,
  scope,
  children,
  className,
  id
}) {
  const disableMotion = useReducedMotion();
  const isMobileViewport = useViewportMatch('medium', '<');
  // This is used to delay the exit animation to the next tick.
  // The reason this is done is to allow us to apply the right transition properties
  // When we switch from an open sidebar to another open sidebar.
  // we don't want to animate in this case.
  const previousActiveArea = usePrevious(activeArea);
  const previousIsActive = usePrevious(isActive);
  const [, setState] = useState({});
  useEffect(() => {
    setState({});
  }, [isActive]);
  const transition = {
    type: 'tween',
    duration: disableMotion || isMobileViewport || !!previousActiveArea && !!activeArea && activeArea !== previousActiveArea ? 0 : ANIMATION_DURATION,
    ease: [0.6, 0, 0.4, 1]
  };
  return /*#__PURE__*/_jsx(Fill, {
    name: `ComplementaryArea/${scope}`,
    children: /*#__PURE__*/_jsx(AnimatePresence, {
      initial: false,
      children: (previousIsActive || isActive) && /*#__PURE__*/_jsx(motion.div, {
        variants: variants,
        initial: "closed",
        animate: isMobileViewport ? 'mobileOpen' : 'open',
        exit: "closed",
        transition: transition,
        className: "interface-complementary-area__fill",
        children: /*#__PURE__*/_jsx("div", {
          id: id,
          className: className,
          style: {
            width: isMobileViewport ? '100vw' : SIDEBAR_WIDTH
          },
          children: children
        })
      })
    })
  });
}
function useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall) {
  const previousIsSmallRef = useRef(false);
  const shouldOpenWhenNotSmallRef = useRef(false);
  const {
    enableComplementaryArea,
    disableComplementaryArea
  } = useDispatch(interfaceStore);
  useEffect(() => {
    // If the complementary area is active and the editor is switching from
    // a big to a small window size.
    if (isActive && isSmall && !previousIsSmallRef.current) {
      disableComplementaryArea(scope);
      // Flag the complementary area to be reopened when the window size
      // goes from small to big.
      shouldOpenWhenNotSmallRef.current = true;
    } else if (
    // If there is a flag indicating the complementary area should be
    // enabled when we go from small to big window size and we are going
    // from a small to big window size.
    shouldOpenWhenNotSmallRef.current && !isSmall && previousIsSmallRef.current) {
      // Remove the flag indicating the complementary area should be
      // enabled.
      shouldOpenWhenNotSmallRef.current = false;
      enableComplementaryArea(scope, identifier);
    } else if (
    // If the flag is indicating the current complementary should be
    // reopened but another complementary area becomes active, remove
    // the flag.
    shouldOpenWhenNotSmallRef.current && activeArea && activeArea !== identifier) {
      shouldOpenWhenNotSmallRef.current = false;
    }
    if (isSmall !== previousIsSmallRef.current) {
      previousIsSmallRef.current = isSmall;
    }
  }, [isActive, isSmall, scope, identifier, activeArea, disableComplementaryArea, enableComplementaryArea]);
}
function ComplementaryArea({
  children,
  className,
  closeLabel = __('Close plugin'),
  identifier,
  header,
  headerClassName,
  icon,
  isPinnable = true,
  panelClassName,
  scope,
  name,
  smallScreenTitle,
  title,
  toggleShortcut,
  isActiveByDefault
}) {
  // This state is used to delay the rendering of the Fill
  // until the initial effect runs.
  // This prevents the animation from running on mount if
  // the complementary area is active by default.
  const [isReady, setIsReady] = useState(false);
  const {
    isLoading,
    isActive,
    isPinned,
    activeArea,
    isSmall,
    isLarge,
    showIconLabels
  } = useSelect(select => {
    const {
      getActiveComplementaryArea,
      isComplementaryAreaLoading,
      isItemPinned
    } = select(interfaceStore);
    const {
      get
    } = select(preferencesStore);
    const _activeArea = getActiveComplementaryArea(scope);
    return {
      isLoading: isComplementaryAreaLoading(scope),
      isActive: _activeArea === identifier,
      isPinned: isItemPinned(scope, identifier),
      activeArea: _activeArea,
      isSmall: select(viewportStore).isViewportMatch('< medium'),
      isLarge: select(viewportStore).isViewportMatch('large'),
      showIconLabels: get('core', 'showIconLabels')
    };
  }, [identifier, scope]);
  useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall);
  const {
    enableComplementaryArea,
    disableComplementaryArea,
    pinItem,
    unpinItem
  } = useDispatch(interfaceStore);
  useEffect(() => {
    // Set initial visibility: For large screens, enable if it's active by
    // default. For small screens, always initially disable.
    if (isActiveByDefault && activeArea === undefined && !isSmall) {
      enableComplementaryArea(scope, identifier);
    } else if (activeArea === undefined && isSmall) {
      disableComplementaryArea(scope, identifier);
    }
    setIsReady(true);
  }, [activeArea, isActiveByDefault, scope, identifier, isSmall, enableComplementaryArea, disableComplementaryArea]);
  if (!isReady) {
    return;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isPinnable && /*#__PURE__*/_jsx(PinnedItems, {
      scope: scope,
      children: isPinned && /*#__PURE__*/_jsx(ComplementaryAreaToggle, {
        scope: scope,
        identifier: identifier,
        isPressed: isActive && (!showIconLabels || isLarge),
        "aria-expanded": isActive,
        "aria-disabled": isLoading,
        label: title,
        icon: showIconLabels ? check : icon,
        showTooltip: !showIconLabels,
        variant: showIconLabels ? 'tertiary' : undefined,
        size: "compact"
      })
    }), name && isPinnable && /*#__PURE__*/_jsx(ComplementaryAreaMoreMenuItem, {
      target: name,
      scope: scope,
      icon: icon,
      children: title
    }), /*#__PURE__*/_jsxs(ComplementaryAreaFill, {
      activeArea: activeArea,
      isActive: isActive,
      className: clsx('interface-complementary-area', className),
      scope: scope,
      id: identifier.replace('/', ':'),
      children: [/*#__PURE__*/_jsx(ComplementaryAreaHeader, {
        className: headerClassName,
        closeLabel: closeLabel,
        onClose: () => disableComplementaryArea(scope),
        smallScreenTitle: smallScreenTitle,
        toggleButtonProps: {
          label: closeLabel,
          size: 'small',
          shortcut: toggleShortcut,
          scope,
          identifier
        },
        children: header || /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("h2", {
            className: "interface-complementary-area-header__title",
            children: title
          }), isPinnable && /*#__PURE__*/_jsx(Button, {
            className: "interface-complementary-area__pin-unpin-item",
            icon: isPinned ? starFilled : starEmpty,
            label: isPinned ? __('Unpin from toolbar') : __('Pin to toolbar'),
            onClick: () => (isPinned ? unpinItem : pinItem)(scope, identifier),
            isPressed: isPinned,
            "aria-expanded": isPinned,
            size: "compact"
          })]
        })
      }), /*#__PURE__*/_jsx(Panel, {
        className: panelClassName,
        children: children
      })]
    })]
  });
}
const ComplementaryAreaWrapped = withComplementaryAreaContext(ComplementaryArea);
ComplementaryAreaWrapped.Slot = ComplementaryAreaSlot;
export default ComplementaryAreaWrapped;
//# sourceMappingURL=index.js.map