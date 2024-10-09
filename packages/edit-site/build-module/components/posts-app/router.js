/**
 * WordPress dependencies
 */
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import Editor from '../editor';
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import SidebarNavigationScreenMain from '../sidebar-navigation-screen-main';
import DataViewsSidebarContent from '../sidebar-dataviews';
import PostList from '../post-list';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  useLocation
} = unlock(routerPrivateApis);
export default function useLayoutAreas() {
  const {
    params = {}
  } = useLocation();
  const {
    postType,
    layout,
    canvas
  } = params;
  const labels = useSelect(select => {
    return select(coreStore).getPostType(postType)?.labels;
  }, [postType]);

  // Posts list.
  if (['post'].includes(postType)) {
    const isListLayout = layout === 'list' || !layout;
    return {
      key: 'posts-list',
      areas: {
        sidebar: /*#__PURE__*/_jsx(SidebarNavigationScreen, {
          title: labels?.name,
          isRoot: true,
          content: /*#__PURE__*/_jsx(DataViewsSidebarContent, {})
        }),
        content: /*#__PURE__*/_jsx(PostList, {
          postType: postType
        }),
        preview: (isListLayout || canvas === 'edit') && /*#__PURE__*/_jsx(Editor, {
          isPostsList: true
        }),
        mobile: canvas === 'edit' ? /*#__PURE__*/_jsx(Editor, {
          isPostsList: true
        }) : /*#__PURE__*/_jsx(PostList, {
          postType: postType
        })
      },
      widths: {
        content: isListLayout ? 380 : undefined
      }
    };
  }

  // Fallback shows the home page preview
  return {
    key: 'default',
    areas: {
      sidebar: /*#__PURE__*/_jsx(SidebarNavigationScreenMain, {}),
      preview: /*#__PURE__*/_jsx(Editor, {
        isPostsList: true
      }),
      mobile: canvas === 'edit' && /*#__PURE__*/_jsx(Editor, {
        isPostsList: true
      })
    }
  };
}
//# sourceMappingURL=router.js.map