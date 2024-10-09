/**
 * WordPress dependencies
 */
import { PluginMoreMenuItem as EditorPluginMoreMenuItem, PluginSidebar as EditorPluginSidebar, PluginSidebarMoreMenuItem as EditorPluginSidebarMoreMenuItem } from '@wordpress/editor';
import { getPath } from '@wordpress/url';
import deprecated from '@wordpress/deprecated';
import { jsx as _jsx } from "react/jsx-runtime";
const isSiteEditor = getPath(window.location.href)?.includes('site-editor.php');
const deprecateSlot = name => {
  deprecated(`wp.editPost.${name}`, {
    since: '6.6',
    alternative: `wp.editor.${name}`
  });
};

/* eslint-disable jsdoc/require-param */
/**
 * @see PluginMoreMenuItem in @wordpress/editor package.
 */
export function PluginMoreMenuItem(props) {
  if (!isSiteEditor) {
    return null;
  }
  deprecateSlot('PluginMoreMenuItem');
  return /*#__PURE__*/_jsx(EditorPluginMoreMenuItem, {
    ...props
  });
}

/**
 * @see PluginSidebar in @wordpress/editor package.
 */
export function PluginSidebar(props) {
  if (!isSiteEditor) {
    return null;
  }
  deprecateSlot('PluginSidebar');
  return /*#__PURE__*/_jsx(EditorPluginSidebar, {
    ...props
  });
}

/**
 * @see PluginSidebarMoreMenuItem in @wordpress/editor package.
 */
export function PluginSidebarMoreMenuItem(props) {
  if (!isSiteEditor) {
    return null;
  }
  deprecateSlot('PluginSidebarMoreMenuItem');
  return /*#__PURE__*/_jsx(EditorPluginSidebarMoreMenuItem, {
    ...props
  });
}
/* eslint-enable jsdoc/require-param */
//# sourceMappingURL=deprecated.js.map