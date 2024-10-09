/**
 * WordPress dependencies
 */
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  ComplementaryArea,
  ComplementaryAreaMoreMenuItem
} = unlock(editorPrivateApis);
export default function DefaultSidebar({
  className,
  identifier,
  title,
  icon,
  children,
  closeLabel,
  header,
  headerClassName,
  panelClassName,
  isActiveByDefault
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ComplementaryArea, {
      className: className,
      scope: "core",
      identifier: identifier,
      title: title,
      smallScreenTitle: title,
      icon: icon,
      closeLabel: closeLabel,
      header: header,
      headerClassName: headerClassName,
      panelClassName: panelClassName,
      isActiveByDefault: isActiveByDefault,
      children: children
    }), /*#__PURE__*/_jsx(ComplementaryAreaMoreMenuItem, {
      scope: "core",
      identifier: identifier,
      icon: icon,
      children: title
    })]
  });
}
//# sourceMappingURL=default-sidebar.js.map