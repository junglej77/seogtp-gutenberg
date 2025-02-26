/**
 * WordPress dependencies
 */
import { Modal, Button, TextControl, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { useId, useRef, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import { CATEGORY_SLUG } from './category-selector';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function RenamePatternCategoryModal({
  category,
  existingCategories,
  onClose,
  onError,
  onSuccess,
  ...props
}) {
  const id = useId();
  const textControlRef = useRef();
  const [name, setName] = useState(decodeEntities(category.name));
  const [isSaving, setIsSaving] = useState(false);
  const [validationMessage, setValidationMessage] = useState(false);
  const validationMessageId = validationMessage ? `patterns-rename-pattern-category-modal__validation-message-${id}` : undefined;
  const {
    saveEntityRecord,
    invalidateResolution
  } = useDispatch(coreStore);
  const {
    createErrorNotice,
    createSuccessNotice
  } = useDispatch(noticesStore);
  const onChange = newName => {
    if (validationMessage) {
      setValidationMessage(undefined);
    }
    setName(newName);
  };
  const onSave = async event => {
    event.preventDefault();
    if (isSaving) {
      return;
    }
    if (!name || name === category.name) {
      const message = __('Please enter a new name for this category.');
      speak(message, 'assertive');
      setValidationMessage(message);
      textControlRef.current?.focus();
      return;
    }

    // Check existing categories to avoid creating duplicates.
    if (existingCategories.patternCategories.find(existingCategory => {
      // Compare the id so that the we don't disallow the user changing the case of their current category
      // (i.e. renaming 'test' to 'Test').
      return existingCategory.id !== category.id && existingCategory.label.toLowerCase() === name.toLowerCase();
    })) {
      const message = __('This category already exists. Please use a different name.');
      speak(message, 'assertive');
      setValidationMessage(message);
      textControlRef.current?.focus();
      return;
    }
    try {
      setIsSaving(true);

      // User pattern category properties may differ as they can be
      // normalized for use alongside template part areas, core pattern
      // categories etc. As a result we won't just destructure the passed
      // category object.
      const savedRecord = await saveEntityRecord('taxonomy', CATEGORY_SLUG, {
        id: category.id,
        slug: category.slug,
        name
      });
      invalidateResolution('getUserPatternCategories');
      onSuccess?.(savedRecord);
      onClose();
      createSuccessNotice(__('Pattern category renamed.'), {
        type: 'snackbar',
        id: 'pattern-category-update'
      });
    } catch (error) {
      onError?.();
      createErrorNotice(error.message, {
        type: 'snackbar',
        id: 'pattern-category-update'
      });
    } finally {
      setIsSaving(false);
      setName('');
    }
  };
  const onRequestClose = () => {
    onClose();
    setName('');
  };
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Rename'),
    onRequestClose: onRequestClose,
    ...props,
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: onSave,
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "5",
        children: [/*#__PURE__*/_jsxs(VStack, {
          spacing: "2",
          children: [/*#__PURE__*/_jsx(TextControl, {
            ref: textControlRef,
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: __('Name'),
            value: name,
            onChange: onChange,
            "aria-describedby": validationMessageId,
            required: true
          }), validationMessage && /*#__PURE__*/_jsx("span", {
            className: "patterns-rename-pattern-category-modal__validation-message",
            id: validationMessageId,
            children: validationMessage
          })]
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
            "aria-disabled": !name || name === category.name || isSaving,
            isBusy: isSaving,
            children: __('Save')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=rename-pattern-category-modal.js.map