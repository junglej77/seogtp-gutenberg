/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
function BlockInspectorButton({
  inspector,
  closeMenu,
  ...props
}) {
  const selectedBlockClientId = useSelect(select => select(blockEditorStore).getSelectedBlockClientId(), []);
  const selectedBlock = useMemo(() => document.getElementById(`block-${selectedBlockClientId}`), [selectedBlockClientId]);
  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: () => {
      // Open the inspector.
      inspector.open({
        returnFocusWhenClose: selectedBlock
      });
      // Then close the dropdown menu.
      closeMenu();
    },
    ...props,
    children: __('Show more settings')
  });
}
export default BlockInspectorButton;
//# sourceMappingURL=index.js.map