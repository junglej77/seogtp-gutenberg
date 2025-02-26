/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PanelHeader from './header';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedPanel({
  header,
  className,
  children
}, ref) {
  const classNames = clsx(className, 'components-panel');
  return /*#__PURE__*/_jsxs("div", {
    className: classNames,
    ref: ref,
    children: [header && /*#__PURE__*/_jsx(PanelHeader, {
      label: header
    }), children]
  });
}

/**
 * `Panel` expands and collapses multiple sections of content.
 *
 * ```jsx
 * import { Panel, PanelBody, PanelRow } from '@wordpress/components';
 * import { more } from '@wordpress/icons';
 *
 * const MyPanel = () => (
 * 	<Panel header="My Panel">
 * 		<PanelBody title="My Block Settings" icon={ more } initialOpen={ true }>
 * 			<PanelRow>My Panel Inputs and Labels</PanelRow>
 * 		</PanelBody>
 * 	</Panel>
 * );
 * ```
 */
export const Panel = forwardRef(UnforwardedPanel);
export default Panel;
//# sourceMappingURL=index.js.map