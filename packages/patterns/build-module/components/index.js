/**
 * WordPress dependencies
 */
import { BlockSettingsMenuControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import PatternConvertButton from './pattern-convert-button';
import PatternsManageButton from './patterns-manage-button';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PatternsMenuItems({
  rootClientId
}) {
  return /*#__PURE__*/_jsx(BlockSettingsMenuControls, {
    children: ({
      selectedClientIds,
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(PatternConvertButton, {
        clientIds: selectedClientIds,
        rootClientId: rootClientId,
        closeBlockSettingsMenu: onClose
      }), selectedClientIds.length === 1 && /*#__PURE__*/_jsx(PatternsManageButton, {
        clientId: selectedClientIds[0]
      })]
    })
  });
}
//# sourceMappingURL=index.js.map