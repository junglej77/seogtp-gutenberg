/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { humanTimeDiff } from '@wordpress/date';
import { createInterpolateElement } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { Icon, __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { backup } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { SidebarNavigationScreenDetailsPanelRow, SidebarNavigationScreenDetailsPanelLabel, SidebarNavigationScreenDetailsPanelValue } from '../sidebar-navigation-screen-details-panel';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function SidebarNavigationScreenDetailsFooter({
  record,
  ...otherProps
}) {
  var _record$_links$predec, _record$_links$versio;
  /*
   * There might be other items in the future,
   * but for now it's just modified date.
   * Later we might render a list of items and isolate
   * the following logic.
   */
  const hrefProps = {};
  const lastRevisionId = (_record$_links$predec = record?._links?.['predecessor-version']?.[0]?.id) !== null && _record$_links$predec !== void 0 ? _record$_links$predec : null;
  const revisionsCount = (_record$_links$versio = record?._links?.['version-history']?.[0]?.count) !== null && _record$_links$versio !== void 0 ? _record$_links$versio : 0;
  // Enable the revisions link if there is a last revision and there are more than one revisions.
  if (lastRevisionId && revisionsCount > 1) {
    hrefProps.href = addQueryArgs('revision.php', {
      revision: record?._links['predecessor-version'][0].id
    });
    hrefProps.as = 'a';
  }
  return /*#__PURE__*/_jsx(ItemGroup, {
    className: "edit-site-sidebar-navigation-screen-details-footer",
    children: /*#__PURE__*/_jsx(SidebarNavigationItem, {
      "aria-label": __('Revisions'),
      ...hrefProps,
      ...otherProps,
      children: /*#__PURE__*/_jsxs(SidebarNavigationScreenDetailsPanelRow, {
        justify: "space-between",
        children: [/*#__PURE__*/_jsx(SidebarNavigationScreenDetailsPanelLabel, {
          children: __('Last modified')
        }), /*#__PURE__*/_jsx(SidebarNavigationScreenDetailsPanelValue, {
          children: createInterpolateElement(sprintf( /* translators: %s: is the relative time when the post was last modified. */
          __('<time>%s</time>'), humanTimeDiff(record.modified)), {
            time: /*#__PURE__*/_jsx("time", {
              dateTime: record.modified
            })
          })
        }), /*#__PURE__*/_jsx(Icon, {
          className: "edit-site-sidebar-navigation-screen-details-footer__icon",
          icon: backup
        })]
      })
    })
  });
}
//# sourceMappingURL=index.js.map