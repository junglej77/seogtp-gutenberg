/**
 * External dependencies
 */
import clsx from 'clsx';
import { Platform } from 'react-native';
/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@wordpress/compose';
import { menu } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Button from '../button';
import Dropdown from '../dropdown';
import BottomSheet from '../mobile/bottom-sheet';
import PanelBody from '../panel/body';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function mergeProps(defaultProps = {}, props = {}) {
  const mergedProps = {
    ...defaultProps,
    ...props
  };
  if (props.className && defaultProps.className) {
    mergedProps.className = clsx(props.className, defaultProps.className);
  }
  return mergedProps;
}

/**
 * Whether the argument is a function.
 *
 * @param {*} maybeFunc The argument to check.
 * @return {boolean} True if the argument is a function, false otherwise.
 */
function isFunction(maybeFunc) {
  return typeof maybeFunc === 'function';
}
function DropdownMenu({
  children,
  className,
  controls,
  icon = menu,
  label,
  popoverProps,
  toggleProps
}) {
  if (!controls?.length && !isFunction(children)) {
    return null;
  }

  // Normalize controls to nested array of objects (sets of controls)
  let controlSets;
  if (controls?.length) {
    controlSets = controls;
    if (!Array.isArray(controlSets[0])) {
      controlSets = [controlSets];
    }
  }
  const mergedPopoverProps = mergeProps({
    className: 'components-dropdown-menu__popover'
  }, popoverProps);
  return /*#__PURE__*/_jsx(Dropdown, {
    className: clsx('components-dropdown-menu', className),
    popoverProps: mergedPopoverProps,
    renderToggle: ({
      isOpen,
      onToggle
    }) => {
      const mergedToggleProps = mergeProps({
        className: clsx('components-dropdown-menu__toggle', {
          'is-opened': isOpen
        })
      }, toggleProps);
      return /*#__PURE__*/_jsx(Button, {
        ...mergedToggleProps,
        icon: icon,
        onClick: event => {
          onToggle(event);
          if (mergedToggleProps.onClick) {
            mergedToggleProps.onClick(event);
          }
        },
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        label: label,
        children: mergedToggleProps.children
      });
    },
    renderContent: ({
      isOpen,
      onClose,
      ...props
    }) => {
      return /*#__PURE__*/_jsxs(BottomSheet, {
        hideHeader: true,
        isVisible: isOpen,
        onClose: onClose,
        children: [isFunction(children) ? children(props) : null, /*#__PURE__*/_jsx(PanelBody, {
          title: label,
          style: {
            paddingLeft: 0,
            paddingRight: 0
          },
          children: controlSets?.flatMap((controlSet, indexOfSet) => controlSet.map((control, indexOfControl) => /*#__PURE__*/_jsx(BottomSheet.Cell, {
            label: control.title,
            onPress: () => {
              onClose();
              if (control.onClick) {
                control.onClick();
              }
            },
            editable: false,
            icon: control.icon,
            leftAlign: true,
            isSelected: control.isActive,
            separatorType: Platform.OS === 'android' ? 'none' : 'leftMargin'
          }, [indexOfSet, indexOfControl].join())))
        })]
      });
    }
  });
}
export default withPreferredColorScheme(DropdownMenu);
//# sourceMappingURL=index.native.js.map