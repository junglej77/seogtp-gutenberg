/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { close, Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import OverlayMenuIcon from './overlay-menu-icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function ResponsiveWrapper({
  children,
  id,
  isOpen,
  isResponsive,
  onToggle,
  isHiddenByDefault,
  overlayBackgroundColor,
  overlayTextColor,
  hasIcon,
  icon
}) {
  if (!isResponsive) {
    return children;
  }
  const responsiveContainerClasses = clsx('wp-block-navigation__responsive-container', {
    'has-text-color': !!overlayTextColor.color || !!overlayTextColor?.class,
    [getColorClassName('color', overlayTextColor?.slug)]: !!overlayTextColor?.slug,
    'has-background': !!overlayBackgroundColor.color || overlayBackgroundColor?.class,
    [getColorClassName('background-color', overlayBackgroundColor?.slug)]: !!overlayBackgroundColor?.slug,
    'is-menu-open': isOpen,
    'hidden-by-default': isHiddenByDefault
  });
  const styles = {
    color: !overlayTextColor?.slug && overlayTextColor?.color,
    backgroundColor: !overlayBackgroundColor?.slug && overlayBackgroundColor?.color && overlayBackgroundColor.color
  };
  const openButtonClasses = clsx('wp-block-navigation__responsive-container-open', {
    'always-shown': isHiddenByDefault
  });
  const modalId = `${id}-modal`;
  const dialogProps = {
    className: 'wp-block-navigation__responsive-dialog',
    ...(isOpen && {
      role: 'dialog',
      'aria-modal': true,
      'aria-label': __('Menu')
    })
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!isOpen && /*#__PURE__*/_jsxs(Button, {
      __next40pxDefaultSize: true,
      "aria-haspopup": "true",
      "aria-label": hasIcon && __('Open menu'),
      className: openButtonClasses,
      onClick: () => onToggle(true),
      children: [hasIcon && /*#__PURE__*/_jsx(OverlayMenuIcon, {
        icon: icon
      }), !hasIcon && __('Menu')]
    }), /*#__PURE__*/_jsx("div", {
      className: responsiveContainerClasses,
      style: styles,
      id: modalId,
      children: /*#__PURE__*/_jsx("div", {
        className: "wp-block-navigation__responsive-close",
        tabIndex: "-1",
        children: /*#__PURE__*/_jsxs("div", {
          ...dialogProps,
          children: [/*#__PURE__*/_jsxs(Button, {
            __next40pxDefaultSize: true,
            className: "wp-block-navigation__responsive-container-close",
            "aria-label": hasIcon && __('Close menu'),
            onClick: () => onToggle(false),
            children: [hasIcon && /*#__PURE__*/_jsx(Icon, {
              icon: close
            }), !hasIcon && __('Close')]
          }), /*#__PURE__*/_jsx("div", {
            className: "wp-block-navigation__responsive-container-content",
            id: `${modalId}-content`,
            children: children
          })]
        })
      })
    })]
  });
}
//# sourceMappingURL=responsive-wrapper.js.map