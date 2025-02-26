/**
 * WordPress dependencies
 */
import { getBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import Warning from '../warning';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function MultipleUsageWarning({
  originalBlockClientId,
  name,
  onReplace
}) {
  const {
    selectBlock
  } = useDispatch(blockEditorStore);
  const blockType = getBlockType(name);
  return /*#__PURE__*/_jsxs(Warning, {
    actions: [/*#__PURE__*/_jsx(Button, {
      __next40pxDefaultSize: true,
      variant: "secondary",
      onClick: () => selectBlock(originalBlockClientId),
      children: __('Find original')
    }, "find-original"), /*#__PURE__*/_jsx(Button, {
      __next40pxDefaultSize: true,
      variant: "secondary",
      onClick: () => onReplace([]),
      children: __('Remove')
    }, "remove")],
    children: [/*#__PURE__*/_jsxs("strong", {
      children: [blockType?.title, ": "]
    }), __('This block can only be used once.')]
  });
}
//# sourceMappingURL=multiple-usage-warning.js.map