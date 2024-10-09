/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { privateApis as preferencesPrivateApis } from '@wordpress/preferences';
import { getPathAndQueryString } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  PreferenceBaseOption
} = unlock(preferencesPrivateApis);
function submitCustomFieldsForm() {
  const customFieldsForm = document.getElementById('toggle-custom-fields-form');

  // Ensure the referrer values is up to update with any
  customFieldsForm.querySelector('[name="_wp_http_referer"]').setAttribute('value', getPathAndQueryString(window.location.href));
  customFieldsForm.submit();
}
export function CustomFieldsConfirmation({
  willEnable
}) {
  const [isReloading, setIsReloading] = useState(false);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("p", {
      className: "edit-post-preferences-modal__custom-fields-confirmation-message",
      children: __('A page reload is required for this change. Make sure your content is saved before reloading.')
    }), /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "edit-post-preferences-modal__custom-fields-confirmation-button",
      variant: "secondary",
      isBusy: isReloading,
      accessibleWhenDisabled: true,
      disabled: isReloading,
      onClick: () => {
        setIsReloading(true);
        submitCustomFieldsForm();
      },
      children: willEnable ? __('Show & Reload Page') : __('Hide & Reload Page')
    })]
  });
}
export function EnableCustomFieldsOption({
  label,
  areCustomFieldsEnabled
}) {
  const [isChecked, setIsChecked] = useState(areCustomFieldsEnabled);
  return /*#__PURE__*/_jsx(PreferenceBaseOption, {
    label: label,
    isChecked: isChecked,
    onChange: setIsChecked,
    children: isChecked !== areCustomFieldsEnabled && /*#__PURE__*/_jsx(CustomFieldsConfirmation, {
      willEnable: isChecked
    })
  });
}
export default withSelect(select => ({
  areCustomFieldsEnabled: !!select(editorStore).getEditorSettings().enableCustomFields
}))(EnableCustomFieldsOption);
//# sourceMappingURL=enable-custom-fields.js.map