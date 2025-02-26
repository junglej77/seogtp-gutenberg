/**
 * External dependencies
 */

import clsx from 'clsx';
import { useFloating, flip as flipMiddleware, shift as shiftMiddleware, limitShift, autoUpdate, arrow, offset as offsetMiddleware, size } from '@floating-ui/react-dom';
import { motion } from 'framer-motion';

/**
 * WordPress dependencies
 */
import { useRef, useLayoutEffect, forwardRef, createContext, useContext, useMemo, useState, useCallback, createPortal } from '@wordpress/element';
import { useReducedMotion, useViewportMatch, useMergeRefs, __experimentalUseDialog as useDialog } from '@wordpress/compose';
import { close } from '@wordpress/icons';
import deprecated from '@wordpress/deprecated';
import { Path, SVG } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import Button from '../button';
import ScrollLock from '../scroll-lock';
import { Slot, Fill, useSlot } from '../slot-fill';
import { computePopoverPosition, positionToPlacement, placementToMotionAnimationProps, getReferenceElement } from './utils';
import { contextConnect, useContextSystem } from '../context';
import { overlayMiddlewares } from './overlay-middlewares';
import { StyleProvider } from '../style-provider';

/**
 * Name of slot in which popover should fill.
 *
 * @type {string}
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export const SLOT_NAME = 'Popover';

// An SVG displaying a triangle facing down, filled with a solid
// color and bordered in such a way to create an arrow-like effect.
// Keeping the SVG's viewbox squared simplify the arrow positioning
// calculations.
const ArrowTriangle = () => /*#__PURE__*/_jsxs(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  className: "components-popover__triangle",
  role: "presentation",
  children: [/*#__PURE__*/_jsx(Path, {
    className: "components-popover__triangle-bg",
    d: "M 0 0 L 50 50 L 100 0"
  }), /*#__PURE__*/_jsx(Path, {
    className: "components-popover__triangle-border",
    d: "M 0 0 L 50 50 L 100 0",
    vectorEffect: "non-scaling-stroke"
  })]
});
const slotNameContext = createContext(undefined);
const fallbackContainerClassname = 'components-popover__fallback-container';
const getPopoverFallbackContainer = () => {
  let container = document.body.querySelector('.' + fallbackContainerClassname);
  if (!container) {
    container = document.createElement('div');
    container.className = fallbackContainerClassname;
    document.body.append(container);
  }
  return container;
};
const UnforwardedPopover = (props, forwardedRef) => {
  const {
    animate = true,
    headerTitle,
    constrainTabbing,
    onClose,
    children,
    className,
    noArrow = true,
    position,
    placement: placementProp = 'bottom-start',
    offset: offsetProp = 0,
    focusOnMount = 'firstElement',
    anchor,
    expandOnMobile,
    onFocusOutside,
    __unstableSlotName = SLOT_NAME,
    flip = true,
    resize = true,
    shift = false,
    inline = false,
    variant,
    style: contentStyle,
    // Deprecated props
    __unstableForcePosition,
    anchorRef,
    anchorRect,
    getAnchorRect,
    isAlternate,
    // Rest
    ...contentProps
  } = useContextSystem(props, 'Popover');
  let computedFlipProp = flip;
  let computedResizeProp = resize;
  if (__unstableForcePosition !== undefined) {
    deprecated('`__unstableForcePosition` prop in wp.components.Popover', {
      since: '6.1',
      version: '6.3',
      alternative: '`flip={ false }` and  `resize={ false }`'
    });

    // Back-compat, set the `flip` and `resize` props
    // to `false` to replicate `__unstableForcePosition`.
    computedFlipProp = !__unstableForcePosition;
    computedResizeProp = !__unstableForcePosition;
  }
  if (anchorRef !== undefined) {
    deprecated('`anchorRef` prop in wp.components.Popover', {
      since: '6.1',
      alternative: '`anchor` prop'
    });
  }
  if (anchorRect !== undefined) {
    deprecated('`anchorRect` prop in wp.components.Popover', {
      since: '6.1',
      alternative: '`anchor` prop'
    });
  }
  if (getAnchorRect !== undefined) {
    deprecated('`getAnchorRect` prop in wp.components.Popover', {
      since: '6.1',
      alternative: '`anchor` prop'
    });
  }
  const computedVariant = isAlternate ? 'toolbar' : variant;
  if (isAlternate !== undefined) {
    deprecated('`isAlternate` prop in wp.components.Popover', {
      since: '6.2',
      alternative: "`variant` prop with the `'toolbar'` value"
    });
  }
  const arrowRef = useRef(null);
  const [fallbackReferenceElement, setFallbackReferenceElement] = useState(null);
  const anchorRefFallback = useCallback(node => {
    setFallbackReferenceElement(node);
  }, []);
  const isMobileViewport = useViewportMatch('medium', '<');
  const isExpanded = expandOnMobile && isMobileViewport;
  const hasArrow = !isExpanded && !noArrow;
  const normalizedPlacementFromProps = position ? positionToPlacement(position) : placementProp;
  const middleware = [...(placementProp === 'overlay' ? overlayMiddlewares() : []), offsetMiddleware(offsetProp), computedFlipProp && flipMiddleware(), computedResizeProp && size({
    apply(sizeProps) {
      var _refs$floating$curren;
      const {
        firstElementChild
      } = (_refs$floating$curren = refs.floating.current) !== null && _refs$floating$curren !== void 0 ? _refs$floating$curren : {};

      // Only HTMLElement instances have the `style` property.
      if (!(firstElementChild instanceof HTMLElement)) {
        return;
      }

      // Reduce the height of the popover to the available space.
      Object.assign(firstElementChild.style, {
        maxHeight: `${sizeProps.availableHeight}px`,
        overflow: 'auto'
      });
    }
  }), shift && shiftMiddleware({
    crossAxis: true,
    limiter: limitShift(),
    padding: 1 // Necessary to avoid flickering at the edge of the viewport.
  }), arrow({
    element: arrowRef
  })];
  const slotName = useContext(slotNameContext) || __unstableSlotName;
  const slot = useSlot(slotName);
  let onDialogClose;
  if (onClose || onFocusOutside) {
    onDialogClose = (type, event) => {
      // Ideally the popover should have just a single onClose prop and
      // not three props that potentially do the same thing.
      if (type === 'focus-outside' && onFocusOutside) {
        onFocusOutside(event);
      } else if (onClose) {
        onClose();
      }
    };
  }
  const [dialogRef, dialogProps] = useDialog({
    constrainTabbing,
    focusOnMount,
    __unstableOnClose: onDialogClose,
    // @ts-expect-error The __unstableOnClose property needs to be deprecated first (see https://github.com/WordPress/gutenberg/pull/27675)
    onClose: onDialogClose
  });
  const {
    // Positioning coordinates
    x,
    y,
    // Object with "regular" refs to both "reference" and "floating"
    refs,
    // Type of CSS position property to use (absolute or fixed)
    strategy,
    update,
    placement: computedPlacement,
    middlewareData: {
      arrow: arrowData
    }
  } = useFloating({
    placement: normalizedPlacementFromProps === 'overlay' ? undefined : normalizedPlacementFromProps,
    middleware,
    whileElementsMounted: (referenceParam, floatingParam, updateParam) => autoUpdate(referenceParam, floatingParam, updateParam, {
      layoutShift: false,
      animationFrame: true
    })
  });
  const arrowCallbackRef = useCallback(node => {
    arrowRef.current = node;
    update();
  }, [update]);

  // When any of the possible anchor "sources" change,
  // recompute the reference element (real or virtual) and its owner document.

  const anchorRefTop = anchorRef?.top;
  const anchorRefBottom = anchorRef?.bottom;
  const anchorRefStartContainer = anchorRef?.startContainer;
  const anchorRefCurrent = anchorRef?.current;
  useLayoutEffect(() => {
    const resultingReferenceElement = getReferenceElement({
      anchor,
      anchorRef,
      anchorRect,
      getAnchorRect,
      fallbackReferenceElement
    });
    refs.setReference(resultingReferenceElement);
  }, [anchor, anchorRef, anchorRefTop, anchorRefBottom, anchorRefStartContainer, anchorRefCurrent, anchorRect, getAnchorRect, fallbackReferenceElement, refs]);
  const mergedFloatingRef = useMergeRefs([refs.setFloating, dialogRef, forwardedRef]);
  const style = isExpanded ? undefined : {
    position: strategy,
    top: 0,
    left: 0,
    // `x` and `y` are framer-motion specific props and are shorthands
    // for `translateX` and `translateY`. Currently it is not possible
    // to use `translateX` and `translateY` because those values would
    // be overridden by the return value of the
    // `placementToMotionAnimationProps` function.
    x: computePopoverPosition(x),
    y: computePopoverPosition(y)
  };
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = animate && !isExpanded && !shouldReduceMotion;
  const [animationFinished, setAnimationFinished] = useState(false);
  const {
    style: motionInlineStyles,
    ...otherMotionProps
  } = useMemo(() => placementToMotionAnimationProps(computedPlacement), [computedPlacement]);
  const animationProps = shouldAnimate ? {
    style: {
      ...contentStyle,
      ...motionInlineStyles,
      ...style
    },
    onAnimationComplete: () => setAnimationFinished(true),
    ...otherMotionProps
  } : {
    animate: false,
    style: {
      ...contentStyle,
      ...style
    }
  };

  // When Floating UI has finished positioning and Framer Motion has finished animating
  // the popover, add the `is-positioned` class to signal that all transitions have finished.
  const isPositioned = (!shouldAnimate || animationFinished) && x !== null && y !== null;
  let content = /*#__PURE__*/_jsxs(motion.div, {
    className: clsx(className, {
      'is-expanded': isExpanded,
      'is-positioned': isPositioned,
      // Use the 'alternate' classname for 'toolbar' variant for back compat.
      [`is-${computedVariant === 'toolbar' ? 'alternate' : computedVariant}`]: computedVariant
    }),
    ...animationProps,
    ...contentProps,
    ref: mergedFloatingRef,
    ...dialogProps,
    tabIndex: -1,
    children: [isExpanded && /*#__PURE__*/_jsx(ScrollLock, {}), isExpanded && /*#__PURE__*/_jsxs("div", {
      className: "components-popover__header",
      children: [/*#__PURE__*/_jsx("span", {
        className: "components-popover__header-title",
        children: headerTitle
      }), /*#__PURE__*/_jsx(Button, {
        className: "components-popover__close",
        icon: close,
        onClick: onClose
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "components-popover__content",
      children: children
    }), hasArrow && /*#__PURE__*/_jsx("div", {
      ref: arrowCallbackRef,
      className: ['components-popover__arrow', `is-${computedPlacement.split('-')[0]}`].join(' '),
      style: {
        left: typeof arrowData?.x !== 'undefined' && Number.isFinite(arrowData.x) ? `${arrowData.x}px` : '',
        top: typeof arrowData?.y !== 'undefined' && Number.isFinite(arrowData.y) ? `${arrowData.y}px` : ''
      },
      children: /*#__PURE__*/_jsx(ArrowTriangle, {})
    })]
  });
  const shouldRenderWithinSlot = slot.ref && !inline;
  const hasAnchor = anchorRef || anchorRect || anchor;
  if (shouldRenderWithinSlot) {
    content = /*#__PURE__*/_jsx(Fill, {
      name: slotName,
      children: content
    });
  } else if (!inline) {
    content = createPortal( /*#__PURE__*/_jsx(StyleProvider, {
      document: document,
      children: content
    }), getPopoverFallbackContainer());
  }
  if (hasAnchor) {
    return content;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("span", {
      ref: anchorRefFallback
    }), content]
  });
};

/**
 * `Popover` renders its content in a floating modal. If no explicit anchor is passed via props, it anchors to its parent element by default.
 *
 * ```jsx
 * import { Button, Popover } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyPopover = () => {
 * 	const [ isVisible, setIsVisible ] = useState( false );
 * 	const toggleVisible = () => {
 * 		setIsVisible( ( state ) => ! state );
 * 	};
 *
 * 	return (
 * 		<Button variant="secondary" onClick={ toggleVisible }>
 * 			Toggle Popover!
 * 			{ isVisible && <Popover>Popover is toggled!</Popover> }
 * 		</Button>
 * 	);
 * };
 * ```
 *
 */
export const Popover = contextConnect(UnforwardedPopover, 'Popover');
function PopoverSlot({
  name = SLOT_NAME
}, ref) {
  return /*#__PURE__*/_jsx(Slot, {
    bubblesVirtually: true,
    name: name,
    className: "popover-slot",
    ref: ref
  });
}

// @ts-expect-error For Legacy Reasons
Popover.Slot = forwardRef(PopoverSlot);
// @ts-expect-error For Legacy Reasons
Popover.__unstableSlotNameProvider = slotNameContext.Provider;
export default Popover;
//# sourceMappingURL=index.js.map