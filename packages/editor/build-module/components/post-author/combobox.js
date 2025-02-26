/**
 * WordPress dependencies
 */
import { debounce } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { ComboboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { useAuthorsQuery } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
export default function PostAuthorCombobox() {
  const [fieldValue, setFieldValue] = useState();
  const {
    editPost
  } = useDispatch(editorStore);
  const {
    authorId,
    authorOptions
  } = useAuthorsQuery(fieldValue);

  /**
   * Handle author selection.
   *
   * @param {number} postAuthorId The selected Author.
   */
  const handleSelect = postAuthorId => {
    if (!postAuthorId) {
      return;
    }
    editPost({
      author: postAuthorId
    });
  };

  /**
   * Handle user input.
   *
   * @param {string} inputValue The current value of the input field.
   */
  const handleKeydown = inputValue => {
    setFieldValue(inputValue);
  };
  return /*#__PURE__*/_jsx(ComboboxControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: __('Author'),
    options: authorOptions,
    value: authorId,
    onFilterValueChange: debounce(handleKeydown, 300),
    onChange: handleSelect,
    allowReset: false,
    hideLabelFromVision: true
  });
}
//# sourceMappingURL=combobox.js.map