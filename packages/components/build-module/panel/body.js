/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useReducedMotion, useMergeRefs } from '@wordpress/compose';
import { forwardRef, useRef } from '@wordpress/element';
import { chevronUp, chevronDown } from '@wordpress/icons';

/**
 * Internal dependencies
 */

import Button from '../button';
import Icon from '../icon';
import { useControlledState, useUpdateEffect } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};
export function UnforwardedPanelBody(props, ref) {
  const {
    buttonProps = {},
    children,
    className,
    icon,
    initialOpen,
    onToggle = noop,
    opened,
    title,
    scrollAfterOpen = true
  } = props;
  const [isOpened, setIsOpened] = useControlledState(opened, {
    initial: initialOpen === undefined ? true : initialOpen,
    fallback: false
  });
  const nodeRef = useRef(null);

  // Defaults to 'smooth' scrolling
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  const scrollBehavior = useReducedMotion() ? 'auto' : 'smooth';
  const handleOnToggle = event => {
    event.preventDefault();
    const next = !isOpened;
    setIsOpened(next);
    onToggle(next);
  };

  // Ref is used so that the effect does not re-run upon scrollAfterOpen changing value.
  const scrollAfterOpenRef = useRef();
  scrollAfterOpenRef.current = scrollAfterOpen;
  // Runs after initial render.
  useUpdateEffect(() => {
    if (isOpened && scrollAfterOpenRef.current && nodeRef.current?.scrollIntoView) {
      /*
       * Scrolls the content into view when visible.
       * This improves the UX when there are multiple stacking <PanelBody />
       * components in a scrollable container.
       */
      nodeRef.current.scrollIntoView({
        inline: 'nearest',
        block: 'nearest',
        behavior: scrollBehavior
      });
    }
  }, [isOpened, scrollBehavior]);
  const classes = clsx('components-panel__body', className, {
    'is-opened': isOpened
  });
  return /*#__PURE__*/_jsxs("div", {
    className: classes,
    ref: useMergeRefs([nodeRef, ref]),
    children: [/*#__PURE__*/_jsx(PanelBodyTitle, {
      icon: icon,
      isOpened: Boolean(isOpened),
      onClick: handleOnToggle,
      title: title,
      ...buttonProps
    }), typeof children === 'function' ? children({
      opened: Boolean(isOpened)
    }) : isOpened && children]
  });
}
const PanelBodyTitle = forwardRef(({
  isOpened,
  icon,
  title,
  ...props
}, ref) => {
  if (!title) {
    return null;
  }
  return /*#__PURE__*/_jsx("h2", {
    className: "components-panel__body-title",
    children: /*#__PURE__*/_jsxs(Button, {
      className: "components-panel__body-toggle",
      "aria-expanded": isOpened,
      ref: ref,
      ...props,
      children: [/*#__PURE__*/_jsx("span", {
        "aria-hidden": "true",
        children: /*#__PURE__*/_jsx(Icon, {
          className: "components-panel__arrow",
          icon: isOpened ? chevronUp : chevronDown
        })
      }), title, icon && /*#__PURE__*/_jsx(Icon, {
        icon: icon,
        className: "components-panel__icon",
        size: 20
      })]
    })
  });
});
export const PanelBody = forwardRef(UnforwardedPanelBody);
export default PanelBody;
//# sourceMappingURL=body.js.map