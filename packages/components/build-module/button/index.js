/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';
import { forwardRef } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Tooltip from '../tooltip';
import Icon from '../icon';
import { VisuallyHidden } from '../visually-hidden';
import { positionToPlacement } from '../popover/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const disabledEventsOnDisabledButton = ['onMouseDown', 'onClick'];
function useDeprecatedProps({
  __experimentalIsFocusable,
  isDefault,
  isPrimary,
  isSecondary,
  isTertiary,
  isLink,
  isPressed,
  isSmall,
  size,
  variant,
  describedBy,
  ...otherProps
}) {
  let computedSize = size;
  let computedVariant = variant;
  const newProps = {
    accessibleWhenDisabled: __experimentalIsFocusable,
    // @todo Mark `isPressed` as deprecated
    'aria-pressed': isPressed,
    description: describedBy
  };
  if (isSmall) {
    var _computedSize;
    (_computedSize = computedSize) !== null && _computedSize !== void 0 ? _computedSize : computedSize = 'small';
  }
  if (isPrimary) {
    var _computedVariant;
    (_computedVariant = computedVariant) !== null && _computedVariant !== void 0 ? _computedVariant : computedVariant = 'primary';
  }
  if (isTertiary) {
    var _computedVariant2;
    (_computedVariant2 = computedVariant) !== null && _computedVariant2 !== void 0 ? _computedVariant2 : computedVariant = 'tertiary';
  }
  if (isSecondary) {
    var _computedVariant3;
    (_computedVariant3 = computedVariant) !== null && _computedVariant3 !== void 0 ? _computedVariant3 : computedVariant = 'secondary';
  }
  if (isDefault) {
    var _computedVariant4;
    deprecated('wp.components.Button `isDefault` prop', {
      since: '5.4',
      alternative: 'variant="secondary"'
    });
    (_computedVariant4 = computedVariant) !== null && _computedVariant4 !== void 0 ? _computedVariant4 : computedVariant = 'secondary';
  }
  if (isLink) {
    var _computedVariant5;
    (_computedVariant5 = computedVariant) !== null && _computedVariant5 !== void 0 ? _computedVariant5 : computedVariant = 'link';
  }
  return {
    ...newProps,
    ...otherProps,
    size: computedSize,
    variant: computedVariant
  };
}
export function UnforwardedButton(props, ref) {
  const {
    __next40pxDefaultSize,
    accessibleWhenDisabled,
    isBusy,
    isDestructive,
    className,
    disabled,
    icon,
    iconPosition = 'left',
    iconSize,
    showTooltip,
    tooltipPosition,
    shortcut,
    label,
    children,
    size = 'default',
    text,
    variant,
    description,
    ...buttonOrAnchorProps
  } = useDeprecatedProps(props);
  const {
    href,
    target,
    'aria-checked': ariaChecked,
    'aria-pressed': ariaPressed,
    'aria-selected': ariaSelected,
    ...additionalProps
  } = 'href' in buttonOrAnchorProps ? buttonOrAnchorProps : {
    href: undefined,
    target: undefined,
    ...buttonOrAnchorProps
  };
  const instanceId = useInstanceId(Button, 'components-button__description');
  const hasChildren = 'string' === typeof children && !!children || Array.isArray(children) && children?.[0] && children[0] !== null &&
  // Tooltip should not considered as a child
  children?.[0]?.props?.className !== 'components-tooltip';
  const truthyAriaPressedValues = [true, 'true', 'mixed'];
  const classes = clsx('components-button', className, {
    'is-next-40px-default-size': __next40pxDefaultSize,
    'is-secondary': variant === 'secondary',
    'is-primary': variant === 'primary',
    'is-small': size === 'small',
    'is-compact': size === 'compact',
    'is-tertiary': variant === 'tertiary',
    'is-pressed': truthyAriaPressedValues.includes(ariaPressed),
    'is-pressed-mixed': ariaPressed === 'mixed',
    'is-busy': isBusy,
    'is-link': variant === 'link',
    'is-destructive': isDestructive,
    'has-text': !!icon && (hasChildren || text),
    'has-icon': !!icon
  });
  const trulyDisabled = disabled && !accessibleWhenDisabled;
  const Tag = href !== undefined && !disabled ? 'a' : 'button';
  const buttonProps = Tag === 'button' ? {
    type: 'button',
    disabled: trulyDisabled,
    'aria-checked': ariaChecked,
    'aria-pressed': ariaPressed,
    'aria-selected': ariaSelected
  } : {};
  const anchorProps = Tag === 'a' ? {
    href,
    target
  } : {};
  const disableEventProps = {};
  if (disabled && accessibleWhenDisabled) {
    // In this case, the button will be disabled, but still focusable and
    // perceivable by screen reader users.
    buttonProps['aria-disabled'] = true;
    anchorProps['aria-disabled'] = true;
    for (const disabledEvent of disabledEventsOnDisabledButton) {
      disableEventProps[disabledEvent] = event => {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
      };
    }
  }

  // Should show the tooltip if...
  const shouldShowTooltip = !trulyDisabled && (
  // An explicit tooltip is passed or...
  showTooltip && !!label ||
  // There's a shortcut or...
  !!shortcut ||
  // There's a label and...
  !!label &&
  // The children are empty and...
  !children?.length &&
  // The tooltip is not explicitly disabled.
  false !== showTooltip);
  const descriptionId = description ? instanceId : undefined;
  const describedById = additionalProps['aria-describedby'] || descriptionId;
  const commonProps = {
    className: classes,
    'aria-label': additionalProps['aria-label'] || label,
    'aria-describedby': describedById,
    ref
  };
  const elementChildren = /*#__PURE__*/_jsxs(_Fragment, {
    children: [icon && iconPosition === 'left' && /*#__PURE__*/_jsx(Icon, {
      icon: icon,
      size: iconSize
    }), text && /*#__PURE__*/_jsx(_Fragment, {
      children: text
    }), children, icon && iconPosition === 'right' && /*#__PURE__*/_jsx(Icon, {
      icon: icon,
      size: iconSize
    })]
  });
  const element = Tag === 'a' ? /*#__PURE__*/_jsx("a", {
    ...anchorProps,
    ...additionalProps,
    ...disableEventProps,
    ...commonProps,
    children: elementChildren
  }) : /*#__PURE__*/_jsx("button", {
    ...buttonProps,
    ...additionalProps,
    ...disableEventProps,
    ...commonProps,
    children: elementChildren
  });

  // In order to avoid some React reconciliation issues, we are always rendering
  // the `Tooltip` component even when `shouldShowTooltip` is `false`.
  // In order to make sure that the tooltip doesn't show when it shouldn't,
  // we don't pass the props to the `Tooltip` component.
  const tooltipProps = shouldShowTooltip ? {
    text: children?.length && description ? description : label,
    shortcut,
    placement: tooltipPosition &&
    // Convert legacy `position` values to be used with the new `placement` prop
    positionToPlacement(tooltipPosition)
  } : {};
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Tooltip, {
      ...tooltipProps,
      children: element
    }), description && /*#__PURE__*/_jsx(VisuallyHidden, {
      children: /*#__PURE__*/_jsx("span", {
        id: descriptionId,
        children: description
      })
    })]
  });
}

/**
 * Lets users take actions and make choices with a single click or tap.
 *
 * ```jsx
 * import { Button } from '@wordpress/components';
 * const Mybutton = () => (
 *   <Button
 *     variant="primary"
 *     onClick={ handleClick }
 *   >
 *     Click here
 *   </Button>
 * );
 * ```
 */
export const Button = forwardRef(UnforwardedButton);
export default Button;
//# sourceMappingURL=index.js.map