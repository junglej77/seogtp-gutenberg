/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { Modal, Button, __experimentalHStack as HStack } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function BlockRemovalWarningModal({
  rules
}) {
  const {
    clientIds,
    selectPrevious,
    message
  } = useSelect(select => unlock(select(blockEditorStore)).getRemovalPromptData());
  const {
    clearBlockRemovalPrompt,
    setBlockRemovalRules,
    privateRemoveBlocks
  } = unlock(useDispatch(blockEditorStore));

  // Load block removal rules, simultaneously signalling that the block
  // removal prompt is in place.
  useEffect(() => {
    setBlockRemovalRules(rules);
    return () => {
      setBlockRemovalRules();
    };
  }, [rules, setBlockRemovalRules]);
  if (!message) {
    return;
  }
  const onConfirmRemoval = () => {
    privateRemoveBlocks(clientIds, selectPrevious, /* force */true);
    clearBlockRemovalPrompt();
  };
  return /*#__PURE__*/_jsxs(Modal, {
    title: __('Be careful!'),
    onRequestClose: clearBlockRemovalPrompt,
    size: "medium",
    children: [/*#__PURE__*/_jsx("p", {
      children: message
    }), /*#__PURE__*/_jsxs(HStack, {
      justify: "right",
      children: [/*#__PURE__*/_jsx(Button, {
        variant: "tertiary",
        onClick: clearBlockRemovalPrompt,
        __next40pxDefaultSize: true,
        children: __('Cancel')
      }), /*#__PURE__*/_jsx(Button, {
        variant: "primary",
        onClick: onConfirmRemoval,
        __next40pxDefaultSize: true,
        children: __('Delete')
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map