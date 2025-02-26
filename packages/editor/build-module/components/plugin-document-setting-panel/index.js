/**
 * WordPress dependencies
 */
import { createSlotFill, PanelBody } from '@wordpress/components';
import { usePluginContext } from '@wordpress/plugins';
import { useDispatch, useSelect } from '@wordpress/data';
import warning from '@wordpress/warning';

/**
 * Internal dependencies
 */
import EnablePluginDocumentSettingPanelOption from '../preferences-modal/enable-plugin-document-setting-panel';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('PluginDocumentSettingPanel');

/**
 * Renders items below the Status & Availability panel in the Document Sidebar.
 *
 * @param {Object}                props                                 Component properties.
 * @param {string}                props.name                            Required. A machine-friendly name for the panel.
 * @param {string}                [props.className]                     An optional class name added to the row.
 * @param {string}                [props.title]                         The title of the panel
 * @param {WPBlockTypeIconRender} [props.icon=inherits from the plugin] The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.
 * @param {Element}               props.children                        Children to be rendered
 *
 * @example
 * ```js
 * // Using ES5 syntax
 * var el = React.createElement;
 * var __ = wp.i18n.__;
 * var registerPlugin = wp.plugins.registerPlugin;
 * var PluginDocumentSettingPanel = wp.editor.PluginDocumentSettingPanel;
 *
 * function MyDocumentSettingPlugin() {
 * 	return el(
 * 		PluginDocumentSettingPanel,
 * 		{
 * 			className: 'my-document-setting-plugin',
 * 			title: 'My Panel',
 * 			name: 'my-panel',
 * 		},
 * 		__( 'My Document Setting Panel' )
 * 	);
 * }
 *
 * registerPlugin( 'my-document-setting-plugin', {
 * 		render: MyDocumentSettingPlugin
 * } );
 * ```
 *
 * @example
 * ```jsx
 * // Using ESNext syntax
 * import { registerPlugin } from '@wordpress/plugins';
 * import { PluginDocumentSettingPanel } from '@wordpress/editor';
 *
 * const MyDocumentSettingTest = () => (
 * 		<PluginDocumentSettingPanel className="my-document-setting-plugin" title="My Panel" name="my-panel">
 *			<p>My Document Setting Panel</p>
 *		</PluginDocumentSettingPanel>
 *	);
 *
 *  registerPlugin( 'document-setting-test', { render: MyDocumentSettingTest } );
 * ```
 *
 * @return {Component} The component to be rendered.
 */
const PluginDocumentSettingPanel = ({
  name,
  className,
  title,
  icon,
  children
}) => {
  const {
    name: pluginName
  } = usePluginContext();
  const panelName = `${pluginName}/${name}`;
  const {
    opened,
    isEnabled
  } = useSelect(select => {
    const {
      isEditorPanelOpened,
      isEditorPanelEnabled
    } = select(editorStore);
    return {
      opened: isEditorPanelOpened(panelName),
      isEnabled: isEditorPanelEnabled(panelName)
    };
  }, [panelName]);
  const {
    toggleEditorPanelOpened
  } = useDispatch(editorStore);
  if (undefined === name) {
    globalThis.SCRIPT_DEBUG === true ? warning('PluginDocumentSettingPanel requires a name property.') : void 0;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(EnablePluginDocumentSettingPanelOption, {
      label: title,
      panelName: panelName
    }), /*#__PURE__*/_jsx(Fill, {
      children: isEnabled && /*#__PURE__*/_jsx(PanelBody, {
        className: className,
        title: title,
        icon: icon,
        opened: opened,
        onToggle: () => toggleEditorPanelOpened(panelName),
        children: children
      })
    })]
  });
};
PluginDocumentSettingPanel.Slot = Slot;
export default PluginDocumentSettingPanel;
//# sourceMappingURL=index.js.map