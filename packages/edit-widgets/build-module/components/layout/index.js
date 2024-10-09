/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { PluginArea } from '@wordpress/plugins';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import ErrorBoundary from '../error-boundary';
import WidgetAreasBlockEditorProvider from '../widget-areas-block-editor-provider';
import Sidebar from '../sidebar';
import Interface from './interface';
import UnsavedChangesWarning from './unsaved-changes-warning';
import WelcomeGuide from '../welcome-guide';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Layout({
  blockEditorSettings
}) {
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  function onPluginAreaError(name) {
    createErrorNotice(sprintf( /* translators: %s: plugin name */
    __('The "%s" plugin has encountered an error and cannot be rendered.'), name));
  }
  return /*#__PURE__*/_jsx(ErrorBoundary, {
    children: /*#__PURE__*/_jsxs(WidgetAreasBlockEditorProvider, {
      blockEditorSettings: blockEditorSettings,
      children: [/*#__PURE__*/_jsx(Interface, {
        blockEditorSettings: blockEditorSettings
      }), /*#__PURE__*/_jsx(Sidebar, {}), /*#__PURE__*/_jsx(PluginArea, {
        onError: onPluginAreaError
      }), /*#__PURE__*/_jsx(UnsavedChangesWarning, {}), /*#__PURE__*/_jsx(WelcomeGuide, {})]
    })
  });
}
export default Layout;
//# sourceMappingURL=index.js.map