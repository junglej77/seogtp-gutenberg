/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import ToolsPanelHeader from '../tools-panel-header';
import { ToolsPanelContext } from '../context';
import { useToolsPanel } from './hook';
import { Grid } from '../../grid';
import { contextConnect } from '../../context';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const UnconnectedToolsPanel = (props, forwardedRef) => {
  const {
    children,
    label,
    panelContext,
    resetAllItems,
    toggleItem,
    headingLevel,
    dropdownMenuProps,
    ...toolsPanelProps
  } = useToolsPanel(props);
  return /*#__PURE__*/_jsx(Grid, {
    ...toolsPanelProps,
    columns: 2,
    ref: forwardedRef,
    children: /*#__PURE__*/_jsxs(ToolsPanelContext.Provider, {
      value: panelContext,
      children: [/*#__PURE__*/_jsx(ToolsPanelHeader, {
        label: label,
        resetAll: resetAllItems,
        toggleItem: toggleItem,
        headingLevel: headingLevel,
        dropdownMenuProps: dropdownMenuProps
      }), children]
    })
  });
};

/**
 * The `ToolsPanel` is a container component that displays its children preceded
 * by a header. The header includes a dropdown menu which is automatically
 * generated from the panel's inner `ToolsPanelItems`.
 *
 * ```jsx
 * import { __ } from '@wordpress/i18n';
 * import {
 *   __experimentalToolsPanel as ToolsPanel,
 *   __experimentalToolsPanelItem as ToolsPanelItem,
 *   __experimentalUnitControl as UnitControl
 * } from '@wordpress/components';
 *
 * function Example() {
 *   const [ height, setHeight ] = useState();
 *   const [ width, setWidth ] = useState();
 *
 *   const resetAll = () => {
 *     setHeight();
 *     setWidth();
 *   }
 *
 *   return (
 *     <ToolsPanel label={ __( 'Dimensions' ) } resetAll={ resetAll }>
 *       <ToolsPanelItem
 *         hasValue={ () => !! height }
 *         label={ __( 'Height' ) }
 *         onDeselect={ () => setHeight() }
 *       >
 *         <UnitControl
 *           label={ __( 'Height' ) }
 *           onChange={ setHeight }
 *           value={ height }
 *         />
 *       </ToolsPanelItem>
 *       <ToolsPanelItem
 *         hasValue={ () => !! width }
 *         label={ __( 'Width' ) }
 *         onDeselect={ () => setWidth() }
 *       >
 *         <UnitControl
 *           label={ __( 'Width' ) }
 *           onChange={ setWidth }
 *           value={ width }
 *         />
 *       </ToolsPanelItem>
 *     </ToolsPanel>
 *   );
 * }
 * ```
 */
export const ToolsPanel = contextConnect(UnconnectedToolsPanel, 'ToolsPanel');
export default ToolsPanel;
//# sourceMappingURL=component.js.map