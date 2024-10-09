/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import { useDefaultViews } from './default-views';
import { unlock } from '../../lock-unlock';
import DataViewItem from './dataview-item';
import CustomDataViewsList from './custom-dataviews-list';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useLocation
} = unlock(routerPrivateApis);
export default function DataViewsSidebarContent() {
  const {
    params: {
      postType,
      activeView = 'all',
      isCustom = 'false'
    }
  } = useLocation();
  const defaultViews = useDefaultViews({
    postType
  });
  if (!postType) {
    return null;
  }
  const isCustomBoolean = isCustom === 'true';
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ItemGroup, {
      children: defaultViews.map(dataview => {
        return /*#__PURE__*/_jsx(DataViewItem, {
          slug: dataview.slug,
          title: dataview.title,
          icon: dataview.icon,
          type: dataview.view.type,
          isActive: !isCustomBoolean && dataview.slug === activeView,
          isCustom: false
        }, dataview.slug);
      })
    }), window?.__experimentalCustomViews && /*#__PURE__*/_jsx(CustomDataViewsList, {
      activeView: activeView,
      type: postType,
      isCustom: true
    })]
  });
}
//# sourceMappingURL=index.js.map