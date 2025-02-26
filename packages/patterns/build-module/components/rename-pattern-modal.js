/**
 * WordPress dependencies
 */
import { Button, Modal, TextControl, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function RenamePatternModal({
  onClose,
  onError,
  onSuccess,
  pattern,
  ...props
}) {
  const originalName = decodeEntities(pattern.title);
  const [name, setName] = useState(originalName);
  const [isSaving, setIsSaving] = useState(false);
  const {
    editEntityRecord,
    __experimentalSaveSpecifiedEntityEdits: saveSpecifiedEntityEdits
  } = useDispatch(coreStore);
  const {
    createSuccessNotice,
    createErrorNotice
  } = useDispatch(noticesStore);
  const onRename = async event => {
    event.preventDefault();
    if (!name || name === pattern.title || isSaving) {
      return;
    }
    try {
      await editEntityRecord('postType', pattern.type, pattern.id, {
        title: name
      });
      setIsSaving(true);
      setName('');
      onClose?.();
      const savedRecord = await saveSpecifiedEntityEdits('postType', pattern.type, pattern.id, ['title'], {
        throwOnError: true
      });
      onSuccess?.(savedRecord);
      createSuccessNotice(__('Pattern renamed'), {
        type: 'snackbar',
        id: 'pattern-update'
      });
    } catch (error) {
      onError?.();
      const errorMessage = error.message && error.code !== 'unknown_error' ? error.message : __('An error occurred while renaming the pattern.');
      createErrorNotice(errorMessage, {
        type: 'snackbar',
        id: 'pattern-update'
      });
    } finally {
      setIsSaving(false);
      setName('');
    }
  };
  const onRequestClose = () => {
    onClose?.();
    setName('');
  };
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Rename'),
    ...props,
    onRequestClose: onClose,
    focusOnMount: "firstContentElement",
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: onRename,
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "5",
        children: [/*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Name'),
          value: name,
          onChange: setName,
          required: true
        }), /*#__PURE__*/_jsxs(HStack, {
          justify: "right",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onRequestClose,
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "primary",
            type: "submit",
            children: __('Save')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=rename-pattern-modal.js.map