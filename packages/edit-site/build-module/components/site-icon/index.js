/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { wordpress } from '@wordpress/icons';
import { store as coreDataStore } from '@wordpress/core-data';
import { jsx as _jsx } from "react/jsx-runtime";
function SiteIcon({
  className
}) {
  const {
    isRequestingSite,
    siteIconUrl
  } = useSelect(select => {
    const {
      getEntityRecord
    } = select(coreDataStore);
    const siteData = getEntityRecord('root', '__unstableBase', undefined);
    return {
      isRequestingSite: !siteData,
      siteIconUrl: siteData?.site_icon_url
    };
  }, []);
  if (isRequestingSite && !siteIconUrl) {
    return /*#__PURE__*/_jsx("div", {
      className: "edit-site-site-icon__image"
    });
  }
  const icon = siteIconUrl ? /*#__PURE__*/_jsx("img", {
    className: "edit-site-site-icon__image",
    alt: __('Site Icon'),
    src: siteIconUrl
  }) : /*#__PURE__*/_jsx(Icon, {
    className: "edit-site-site-icon__icon",
    icon: wordpress,
    size: 48
  });
  return /*#__PURE__*/_jsx("div", {
    className: clsx(className, 'edit-site-site-icon'),
    children: icon
  });
}
export default SiteIcon;
//# sourceMappingURL=index.js.map