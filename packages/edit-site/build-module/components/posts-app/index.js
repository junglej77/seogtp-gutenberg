/**
 * WordPress dependencies
 */
import { UnsavedChangesWarning, privateApis as editorPrivateApis } from '@wordpress/editor';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import useInitEditedEntityFromURL from '../sync-state-with-url/use-init-edited-entity-from-url';
import Layout from '../layout';
import useLayoutAreas from './router';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  RouterProvider
} = unlock(routerPrivateApis);
const {
  GlobalStylesProvider
} = unlock(editorPrivateApis);
function PostsLayout() {
  // This ensures the edited entity id and type are initialized properly.
  useInitEditedEntityFromURL();
  const route = useLayoutAreas();
  return /*#__PURE__*/_jsx(Layout, {
    route: route
  });
}
export default function PostsApp() {
  return /*#__PURE__*/_jsxs(GlobalStylesProvider, {
    children: [/*#__PURE__*/_jsx(UnsavedChangesWarning, {}), /*#__PURE__*/_jsx(RouterProvider, {
      children: /*#__PURE__*/_jsx(PostsLayout, {})
    })]
  });
}
//# sourceMappingURL=index.js.map