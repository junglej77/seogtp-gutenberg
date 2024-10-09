/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, __experimentalHStack as HStack, VisuallyHidden } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { memo, forwardRef, useContext } from '@wordpress/element';
import { search } from '@wordpress/icons';
import { store as commandsStore } from '@wordpress/commands';
import { displayShortcut } from '@wordpress/keycodes';
import { filterURLForDisplay } from '@wordpress/url';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import SiteIcon from '../site-icon';
import { unlock } from '../../lock-unlock';
const {
  useHistory
} = unlock(routerPrivateApis);
import { SidebarNavigationContext } from '../sidebar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SiteHub = memo(forwardRef(({
  isTransparent
}, ref) => {
  const {
    dashboardLink,
    homeUrl,
    siteTitle
  } = useSelect(select => {
    const {
      getSettings
    } = unlock(select(editSiteStore));
    const {
      getEntityRecord
    } = select(coreStore);
    const _site = getEntityRecord('root', 'site');
    return {
      dashboardLink: getSettings().__experimentalDashboardLink || 'index.php',
      homeUrl: getEntityRecord('root', '__unstableBase')?.home,
      siteTitle: !_site?.title && !!_site?.url ? filterURLForDisplay(_site?.url) : _site?.title
    };
  }, []);
  const {
    open: openCommandCenter
  } = useDispatch(commandsStore);
  return /*#__PURE__*/_jsx("div", {
    className: "edit-site-site-hub",
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      spacing: "0",
      children: [/*#__PURE__*/_jsx("div", {
        className: clsx('edit-site-site-hub__view-mode-toggle-container', {
          'has-transparent-background': isTransparent
        }),
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          ref: ref,
          href: dashboardLink,
          label: __('Go to the Dashboard'),
          className: "edit-site-layout__view-mode-toggle",
          style: {
            transform: 'scale(0.5)',
            borderRadius: 4
          },
          children: /*#__PURE__*/_jsx(SiteIcon, {
            className: "edit-site-layout__view-mode-toggle-icon"
          })
        })
      }), /*#__PURE__*/_jsxs(HStack, {
        children: [/*#__PURE__*/_jsx("div", {
          className: "edit-site-site-hub__title",
          children: /*#__PURE__*/_jsxs(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            variant: "link",
            href: homeUrl,
            target: "_blank",
            children: [decodeEntities(siteTitle), /*#__PURE__*/_jsx(VisuallyHidden, {
              as: "span",
              children: /* translators: accessibility text */
              __('(opens in a new tab)')
            })]
          })
        }), /*#__PURE__*/_jsx(HStack, {
          spacing: 0,
          expanded: false,
          className: "edit-site-site-hub__actions",
          children: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            className: "edit-site-site-hub_toggle-command-center",
            icon: search,
            onClick: () => openCommandCenter(),
            label: __('Open command palette'),
            shortcut: displayShortcut.primary('k')
          })
        })]
      })]
    })
  });
}));
export default SiteHub;
export const SiteHubMobile = memo(forwardRef(({
  isTransparent
}, ref) => {
  const history = useHistory();
  const {
    navigate
  } = useContext(SidebarNavigationContext);
  const {
    homeUrl,
    siteTitle
  } = useSelect(select => {
    const {
      getEntityRecord
    } = select(coreStore);
    const _site = getEntityRecord('root', 'site');
    return {
      homeUrl: getEntityRecord('root', '__unstableBase')?.home,
      siteTitle: !_site?.title && !!_site?.url ? filterURLForDisplay(_site?.url) : _site?.title
    };
  }, []);
  const {
    open: openCommandCenter
  } = useDispatch(commandsStore);
  return /*#__PURE__*/_jsx("div", {
    className: "edit-site-site-hub",
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      spacing: "0",
      children: [/*#__PURE__*/_jsx("div", {
        className: clsx('edit-site-site-hub__view-mode-toggle-container', {
          'has-transparent-background': isTransparent
        }),
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          ref: ref,
          label: __('Go to Site Editor'),
          className: "edit-site-layout__view-mode-toggle",
          style: {
            transform: 'scale(0.5)',
            borderRadius: 4
          },
          onClick: () => {
            history.push({});
            navigate('back');
          },
          children: /*#__PURE__*/_jsx(SiteIcon, {
            className: "edit-site-layout__view-mode-toggle-icon"
          })
        })
      }), /*#__PURE__*/_jsxs(HStack, {
        children: [/*#__PURE__*/_jsx("div", {
          className: "edit-site-site-hub__title",
          children: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            variant: "link",
            href: homeUrl,
            target: "_blank",
            label: __('View site (opens in a new tab)'),
            children: decodeEntities(siteTitle)
          })
        }), /*#__PURE__*/_jsx(HStack, {
          spacing: 0,
          expanded: false,
          className: "edit-site-site-hub__actions",
          children: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            className: "edit-site-site-hub_toggle-command-center",
            icon: search,
            onClick: () => openCommandCenter(),
            label: __('Open command palette'),
            shortcut: displayShortcut.primary('k')
          })
        })]
      })]
    })
  });
}));
//# sourceMappingURL=index.js.map