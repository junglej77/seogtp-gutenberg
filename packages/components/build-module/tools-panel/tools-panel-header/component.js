/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { speak } from '@wordpress/a11y';
import { check, moreVertical, plus } from '@wordpress/icons';
import { __, _x, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DropdownMenu from '../../dropdown-menu';
import MenuGroup from '../../menu-group';
import MenuItem from '../../menu-item';
import { HStack } from '../../h-stack';
import { Heading } from '../../heading';
import { useToolsPanelHeader } from './hook';
import { contextConnect } from '../../context';
import { ResetLabel } from '../styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DefaultControlsGroup = ({
  itemClassName,
  items,
  toggleItem
}) => {
  if (!items.length) {
    return null;
  }
  const resetSuffix = /*#__PURE__*/_jsx(ResetLabel, {
    "aria-hidden": true,
    children: __('Reset')
  });
  return /*#__PURE__*/_jsx(_Fragment, {
    children: items.map(([label, hasValue]) => {
      if (hasValue) {
        return /*#__PURE__*/_jsx(MenuItem, {
          className: itemClassName,
          role: "menuitem",
          label: sprintf(
          // translators: %s: The name of the control being reset e.g. "Padding".
          __('Reset %s'), label),
          onClick: () => {
            toggleItem(label);
            speak(sprintf(
            // translators: %s: The name of the control being reset e.g. "Padding".
            __('%s reset to default'), label), 'assertive');
          },
          suffix: resetSuffix,
          children: label
        }, label);
      }
      return /*#__PURE__*/_jsx(MenuItem, {
        icon: check,
        className: itemClassName,
        role: "menuitemcheckbox",
        isSelected: true,
        "aria-disabled": true,
        children: label
      }, label);
    })
  });
};
const OptionalControlsGroup = ({
  items,
  toggleItem
}) => {
  if (!items.length) {
    return null;
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: items.map(([label, isSelected]) => {
      const itemLabel = isSelected ? sprintf(
      // translators: %s: The name of the control being hidden and reset e.g. "Padding".
      __('Hide and reset %s'), label) : sprintf(
      // translators: %s: The name of the control to display e.g. "Padding".
      __('Show %s'), label);
      return /*#__PURE__*/_jsx(MenuItem, {
        icon: isSelected ? check : null,
        isSelected: isSelected,
        label: itemLabel,
        onClick: () => {
          if (isSelected) {
            speak(sprintf(
            // translators: %s: The name of the control being reset e.g. "Padding".
            __('%s hidden and reset to default'), label), 'assertive');
          } else {
            speak(sprintf(
            // translators: %s: The name of the control being reset e.g. "Padding".
            __('%s is now visible'), label), 'assertive');
          }
          toggleItem(label);
        },
        role: "menuitemcheckbox",
        children: label
      }, label);
    })
  });
};
const ToolsPanelHeader = (props, forwardedRef) => {
  const {
    areAllOptionalControlsHidden,
    defaultControlsItemClassName,
    dropdownMenuClassName,
    hasMenuItems,
    headingClassName,
    headingLevel = 2,
    label: labelText,
    menuItems,
    resetAll,
    toggleItem,
    dropdownMenuProps,
    ...headerProps
  } = useToolsPanelHeader(props);
  if (!labelText) {
    return null;
  }
  const defaultItems = Object.entries(menuItems?.default || {});
  const optionalItems = Object.entries(menuItems?.optional || {});
  const dropDownMenuIcon = areAllOptionalControlsHidden ? plus : moreVertical;
  const dropDownMenuLabelText = sprintf(
  // translators: %s: The name of the tool e.g. "Color" or "Typography".
  _x('%s options', 'Button label to reveal tool panel options'), labelText);
  const dropdownMenuDescriptionText = areAllOptionalControlsHidden ? __('All options are currently hidden') : undefined;
  const canResetAll = [...defaultItems, ...optionalItems].some(([, isSelected]) => isSelected);
  return /*#__PURE__*/_jsxs(HStack, {
    ...headerProps,
    ref: forwardedRef,
    children: [/*#__PURE__*/_jsx(Heading, {
      level: headingLevel,
      className: headingClassName,
      children: labelText
    }), hasMenuItems && /*#__PURE__*/_jsx(DropdownMenu, {
      ...dropdownMenuProps,
      icon: dropDownMenuIcon,
      label: dropDownMenuLabelText,
      menuProps: {
        className: dropdownMenuClassName
      },
      toggleProps: {
        size: 'small',
        description: dropdownMenuDescriptionText
      },
      children: () => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(MenuGroup, {
          label: labelText,
          children: [/*#__PURE__*/_jsx(DefaultControlsGroup, {
            items: defaultItems,
            toggleItem: toggleItem,
            itemClassName: defaultControlsItemClassName
          }), /*#__PURE__*/_jsx(OptionalControlsGroup, {
            items: optionalItems,
            toggleItem: toggleItem
          })]
        }), /*#__PURE__*/_jsx(MenuGroup, {
          children: /*#__PURE__*/_jsx(MenuItem, {
            "aria-disabled": !canResetAll
            // @ts-expect-error - TODO: If this "tertiary" style is something we really want to allow on MenuItem,
            // we should rename it and explicitly allow it as an official API. All the other Button variants
            // don't make sense in a MenuItem context, and should be disallowed.
            ,
            variant: "tertiary",
            onClick: () => {
              if (canResetAll) {
                resetAll();
                speak(__('All options reset'), 'assertive');
              }
            },
            children: __('Reset all')
          })
        })]
      })
    })]
  });
};
const ConnectedToolsPanelHeader = contextConnect(ToolsPanelHeader, 'ToolsPanelHeader');
export default ConnectedToolsPanelHeader;
//# sourceMappingURL=component.js.map