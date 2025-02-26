/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useUnsupportedBlocks } from '../../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function EnhancedPaginationControl({
  enhancedPagination,
  setAttributes,
  clientId
}) {
  const {
    hasUnsupportedBlocks
  } = useUnsupportedBlocks(clientId);
  const fullPageClientSideNavigation = window.__experimentalFullPageClientSideNavigation;
  let help = __('Browsing between pages requires a full page reload.');
  if (fullPageClientSideNavigation) {
    help = __('Experimental full-page client-side navigation setting enabled.');
  } else if (enhancedPagination) {
    help = __('Reload the full page—instead of just the posts list—when visitors navigate between pages.');
  } else if (hasUnsupportedBlocks) {
    help = __('Enhancement disabled because there are non-compatible blocks inside the Query block.');
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Reload full page'),
      help: help,
      checked: !enhancedPagination && !fullPageClientSideNavigation,
      disabled: hasUnsupportedBlocks || fullPageClientSideNavigation,
      onChange: value => {
        setAttributes({
          enhancedPagination: !value
        });
      }
    })
  });
}
//# sourceMappingURL=enhanced-pagination-control.js.map