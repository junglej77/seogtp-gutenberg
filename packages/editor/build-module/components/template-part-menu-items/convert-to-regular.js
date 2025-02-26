/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export default function ConvertToRegularBlocks({
  clientId,
  onClose
}) {
  const {
    getBlocks
  } = useSelect(blockEditorStore);
  const {
    replaceBlocks
  } = useDispatch(blockEditorStore);
  const canRemove = useSelect(select => select(blockEditorStore).canRemoveBlock(clientId), [clientId]);
  if (!canRemove) {
    return null;
  }
  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: () => {
      replaceBlocks(clientId, getBlocks(clientId));
      onClose();
    },
    children: __('Detach')
  });
}
//# sourceMappingURL=convert-to-regular.js.map