/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { forwardRef, useContext, useEffect } from '@wordpress/element';
import { Icon, check } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { CircularOptionPickerContext } from './circular-option-picker-context';
import Button from '../button';
import { Composite } from '../composite';
import Tooltip from '../tooltip';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedOptionAsButton(props, forwardedRef) {
  const {
    isPressed,
    ...additionalProps
  } = props;
  return /*#__PURE__*/_jsx(Button, {
    ...additionalProps,
    "aria-pressed": isPressed,
    ref: forwardedRef
  });
}
const OptionAsButton = forwardRef(UnforwardedOptionAsButton);
function UnforwardedOptionAsOption(props, forwardedRef) {
  const {
    id,
    isSelected,
    ...additionalProps
  } = props;
  const {
    setActiveId,
    activeId
  } = useContext(CircularOptionPickerContext);
  useEffect(() => {
    if (isSelected && !activeId) {
      // The setTimeout call is necessary to make sure that this update
      // doesn't get overridden by `Composite`'s internal logic, which picks
      // an initial active item if one is not specifically set.
      window.setTimeout(() => setActiveId?.(id), 0);
    }
  }, [isSelected, setActiveId, activeId, id]);
  return /*#__PURE__*/_jsx(Composite.Item, {
    render: /*#__PURE__*/_jsx(Button, {
      ...additionalProps,
      role: "option",
      "aria-selected": !!isSelected,
      ref: forwardedRef
    }),
    id: id
  });
}
const OptionAsOption = forwardRef(UnforwardedOptionAsOption);
export function Option({
  className,
  isSelected,
  selectedIconProps = {},
  tooltipText,
  ...additionalProps
}) {
  const {
    baseId,
    setActiveId
  } = useContext(CircularOptionPickerContext);
  const id = useInstanceId(Option, baseId || 'components-circular-option-picker__option');
  const commonProps = {
    id,
    className: 'components-circular-option-picker__option',
    ...additionalProps
  };
  const isListbox = setActiveId !== undefined;
  const optionControl = isListbox ? /*#__PURE__*/_jsx(OptionAsOption, {
    ...commonProps,
    isSelected: isSelected
  }) : /*#__PURE__*/_jsx(OptionAsButton, {
    ...commonProps,
    isPressed: isSelected
  });
  return /*#__PURE__*/_jsxs("div", {
    className: clsx(className, 'components-circular-option-picker__option-wrapper'),
    children: [tooltipText ? /*#__PURE__*/_jsx(Tooltip, {
      text: tooltipText,
      children: optionControl
    }) : optionControl, isSelected && /*#__PURE__*/_jsx(Icon, {
      icon: check,
      ...selectedIconProps
    })]
  });
}
//# sourceMappingURL=circular-option-picker-option.js.map