/**
 * WordPress dependencies
 */
import { useState, useRef } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
import { __, _x } from '@wordpress/i18n';
import { Button, Notice } from '@wordpress/components';

/**
 * Internal dependencies
 */
import importReusableBlock from '../../utils/import';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ImportForm({
  instanceId,
  onUpload
}) {
  const inputId = 'list-reusable-blocks-import-form-' + instanceId;
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const onChangeFile = event => {
    setFile(event.target.files[0]);
    setError(null);
  };
  const onSubmit = event => {
    event.preventDefault();
    if (!file) {
      return;
    }
    setIsLoading({
      isLoading: true
    });
    importReusableBlock(file).then(reusableBlock => {
      if (!formRef) {
        return;
      }
      setIsLoading(false);
      onUpload(reusableBlock);
    }).catch(errors => {
      if (!formRef) {
        return;
      }
      let uiMessage;
      switch (errors.message) {
        case 'Invalid JSON file':
          uiMessage = __('Invalid JSON file');
          break;
        case 'Invalid pattern JSON file':
          uiMessage = __('Invalid pattern JSON file');
          break;
        default:
          uiMessage = __('Unknown error');
      }
      setIsLoading(false);
      setError(uiMessage);
    });
  };
  const onDismissError = () => {
    setError(null);
  };
  return /*#__PURE__*/_jsxs("form", {
    className: "list-reusable-blocks-import-form",
    onSubmit: onSubmit,
    ref: formRef,
    children: [error && /*#__PURE__*/_jsx(Notice, {
      status: "error",
      onRemove: () => onDismissError(),
      children: error
    }), /*#__PURE__*/_jsx("label", {
      htmlFor: inputId,
      className: "list-reusable-blocks-import-form__label",
      children: __('File')
    }), /*#__PURE__*/_jsx("input", {
      id: inputId,
      type: "file",
      onChange: onChangeFile
    }), /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      type: "submit",
      isBusy: isLoading,
      accessibleWhenDisabled: true,
      disabled: !file || isLoading,
      variant: "secondary",
      className: "list-reusable-blocks-import-form__button",
      children: _x('Import', 'button label')
    })]
  });
}
export default withInstanceId(ImportForm);
//# sourceMappingURL=index.js.map