/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import Header from './header';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  NavigableRegion
} = unlock(editorPrivateApis);
export default function Page({
  title,
  subTitle,
  actions,
  children,
  className,
  hideTitleFromUI = false
}) {
  const classes = clsx('edit-site-page', className);
  return /*#__PURE__*/_jsx(NavigableRegion, {
    className: classes,
    ariaLabel: title,
    children: /*#__PURE__*/_jsxs("div", {
      className: "edit-site-page-content",
      children: [!hideTitleFromUI && title && /*#__PURE__*/_jsx(Header, {
        title: title,
        subTitle: subTitle,
        actions: actions
      }), children]
    })
  });
}
//# sourceMappingURL=index.js.map