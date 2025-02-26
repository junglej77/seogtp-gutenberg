/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { edit } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import LinkViewerURL from './link-viewer-url';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function LinkViewer({
  className,
  linkClassName,
  onEditLinkClick,
  url,
  urlLabel,
  ...props
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: clsx('block-editor-url-popover__link-viewer', className),
    ...props,
    children: [/*#__PURE__*/_jsx(LinkViewerURL, {
      url: url,
      urlLabel: urlLabel,
      className: linkClassName
    }), onEditLinkClick && /*#__PURE__*/_jsx(Button, {
      icon: edit,
      label: __('Edit'),
      onClick: onEditLinkClick,
      size: "compact"
    })]
  });
}
//# sourceMappingURL=link-viewer.js.map