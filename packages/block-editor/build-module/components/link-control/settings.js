/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { CheckboxControl, VisuallyHidden } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};
const LinkControlSettings = ({
  value,
  onChange = noop,
  settings
}) => {
  if (!settings || !settings.length) {
    return null;
  }
  const handleSettingChange = setting => newValue => {
    onChange({
      ...value,
      [setting.id]: newValue
    });
  };
  const theSettings = settings.map(setting => /*#__PURE__*/_jsx(CheckboxControl, {
    __nextHasNoMarginBottom: true,
    className: "block-editor-link-control__setting",
    label: setting.title,
    onChange: handleSettingChange(setting),
    checked: value ? !!value[setting.id] : false,
    help: setting?.help
  }, setting.id));
  return /*#__PURE__*/_jsxs("fieldset", {
    className: "block-editor-link-control__settings",
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      as: "legend",
      children: __('Currently selected link settings')
    }), theSettings]
  });
};
export default LinkControlSettings;
//# sourceMappingURL=settings.js.map