/**
 * Defines as extensibility slot for the Summary panel.
 */

/**
 * WordPress dependencies
 */
import { createSlotFill, PanelRow } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('PluginPostStatusInfo');

/**
 * Renders a row in the Summary panel of the Document sidebar.
 * It should be noted that this is named and implemented around the function it serves
 * and not its location, which may change in future iterations.
 *
 * @param {Object}  props             Component properties.
 * @param {string}  [props.className] An optional class name added to the row.
 * @param {Element} props.children    Children to be rendered.
 *
 * @example
 * ```js
 * // Using ES5 syntax
 * var __ = wp.i18n.__;
 * var PluginPostStatusInfo = wp.editor.PluginPostStatusInfo;
 *
 * function MyPluginPostStatusInfo() {
 * 	return React.createElement(
 * 		PluginPostStatusInfo,
 * 		{
 * 			className: 'my-plugin-post-status-info',
 * 		},
 * 		__( 'My post status info' )
 * 	)
 * }
 * ```
 *
 * @example
 * ```jsx
 * // Using ESNext syntax
 * import { __ } from '@wordpress/i18n';
 * import { PluginPostStatusInfo } from '@wordpress/editor';
 *
 * const MyPluginPostStatusInfo = () => (
 * 	<PluginPostStatusInfo
 * 		className="my-plugin-post-status-info"
 * 	>
 * 		{ __( 'My post status info' ) }
 * 	</PluginPostStatusInfo>
 * );
 * ```
 *
 * @return {Component} The component to be rendered.
 */
const PluginPostStatusInfo = ({
  children,
  className
}) => /*#__PURE__*/_jsx(Fill, {
  children: /*#__PURE__*/_jsx(PanelRow, {
    className: className,
    children: children
  })
});
PluginPostStatusInfo.Slot = Slot;
export default PluginPostStatusInfo;
//# sourceMappingURL=index.js.map