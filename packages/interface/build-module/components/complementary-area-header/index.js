/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import ComplementaryAreaToggle from '../complementary-area-toggle';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const ComplementaryAreaHeader = ({
  smallScreenTitle,
  children,
  className,
  toggleButtonProps
}) => {
  const toggleButton = /*#__PURE__*/_jsx(ComplementaryAreaToggle, {
    icon: closeSmall,
    ...toggleButtonProps
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "components-panel__header interface-complementary-area-header__small",
      children: [smallScreenTitle && /*#__PURE__*/_jsx("h2", {
        className: "interface-complementary-area-header__small-title",
        children: smallScreenTitle
      }), toggleButton]
    }), /*#__PURE__*/_jsxs("div", {
      className: clsx('components-panel__header', 'interface-complementary-area-header', className),
      tabIndex: -1,
      children: [children, toggleButton]
    })]
  });
};
export default ComplementaryAreaHeader;
//# sourceMappingURL=index.js.map