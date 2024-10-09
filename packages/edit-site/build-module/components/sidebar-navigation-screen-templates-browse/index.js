/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import { unlock } from '../../lock-unlock';
import DataviewsTemplatesSidebarContent from './content';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  useLocation
} = unlock(routerPrivateApis);
export default function SidebarNavigationScreenTemplatesBrowse({
  backPath
}) {
  const {
    params: {
      activeView = 'all'
    }
  } = useLocation();
  return /*#__PURE__*/_jsx(SidebarNavigationScreen, {
    title: __('Templates'),
    description: __('Create new templates, or reset any customizations made to the templates supplied by your theme.'),
    backPath: backPath,
    content: /*#__PURE__*/_jsx(DataviewsTemplatesSidebarContent, {
      activeView: activeView,
      title: __('All templates')
    })
  });
}
//# sourceMappingURL=index.js.map