/**
 * External dependencies
 */
import { paramCase as kebabCase } from 'change-case';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, TextControl, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function AddCustomGenericTemplateModalContent({
  onClose,
  createTemplate
}) {
  const [title, setTitle] = useState('');
  const defaultTitle = __('Custom Template');
  const [isBusy, setIsBusy] = useState(false);
  async function onCreateTemplate(event) {
    event.preventDefault();
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    try {
      await createTemplate({
        slug: 'wp-custom-template-' + kebabCase(title || defaultTitle),
        title: title || defaultTitle
      }, false);
    } finally {
      setIsBusy(false);
    }
  }
  return /*#__PURE__*/_jsx("form", {
    onSubmit: onCreateTemplate,
    children: /*#__PURE__*/_jsxs(VStack, {
      spacing: 6,
      children: [/*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Name'),
        value: title,
        onChange: setTitle,
        placeholder: defaultTitle,
        disabled: isBusy,
        help: __('Describe the template, e.g. "Post with sidebar". A custom template can be manually applied to any post or page.')
      }), /*#__PURE__*/_jsxs(HStack, {
        className: "edit-site-custom-generic-template__modal-actions",
        justify: "right",
        children: [/*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "tertiary",
          onClick: () => {
            onClose();
          },
          children: __('Cancel')
        }), /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          type: "submit",
          isBusy: isBusy,
          "aria-disabled": isBusy,
          children: __('Create')
        })]
      })]
    })
  });
}
export default AddCustomGenericTemplateModalContent;
//# sourceMappingURL=add-custom-generic-template-modal-content.js.map