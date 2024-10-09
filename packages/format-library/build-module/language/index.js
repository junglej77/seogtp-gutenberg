/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { TextControl, SelectControl, Button, Popover, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { applyFormat, removeFormat, useAnchor } from '@wordpress/rich-text';
import { language as languageIcon } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/language';
const title = __('Language');
export const language = {
  name,
  tagName: 'bdo',
  className: null,
  edit: Edit,
  title
};
function Edit({
  isActive,
  value,
  onChange,
  contentRef
}) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const togglePopover = () => {
    setIsPopoverVisible(state => !state);
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(RichTextToolbarButton, {
      icon: languageIcon,
      label: title,
      title: title,
      onClick: () => {
        if (isActive) {
          onChange(removeFormat(value, name));
        } else {
          togglePopover();
        }
      },
      isActive: isActive,
      role: "menuitemcheckbox"
    }), isPopoverVisible && /*#__PURE__*/_jsx(InlineLanguageUI, {
      value: value,
      onChange: onChange,
      onClose: togglePopover,
      contentRef: contentRef
    })]
  });
}
function InlineLanguageUI({
  value,
  contentRef,
  onChange,
  onClose
}) {
  const popoverAnchor = useAnchor({
    editableContentElement: contentRef.current,
    settings: language
  });
  const [lang, setLang] = useState('');
  const [dir, setDir] = useState('ltr');
  return /*#__PURE__*/_jsx(Popover, {
    className: "block-editor-format-toolbar__language-popover",
    anchor: popoverAnchor,
    onClose: onClose,
    children: /*#__PURE__*/_jsxs(VStack, {
      as: "form",
      spacing: 4,
      className: "block-editor-format-toolbar__language-container-content",
      onSubmit: event => {
        event.preventDefault();
        onChange(applyFormat(value, {
          type: name,
          attributes: {
            lang,
            dir
          }
        }));
        onClose();
      },
      children: [/*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: title,
        value: lang,
        onChange: val => setLang(val),
        help: __('A valid language attribute, like "en" or "fr".')
      }), /*#__PURE__*/_jsx(SelectControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Text direction'),
        value: dir,
        options: [{
          label: __('Left to right'),
          value: 'ltr'
        }, {
          label: __('Right to left'),
          value: 'rtl'
        }],
        onChange: val => setDir(val)
      }), /*#__PURE__*/_jsx(HStack, {
        alignment: "right",
        children: /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          type: "submit",
          text: __('Apply')
        })
      })]
    })
  });
}
//# sourceMappingURL=index.js.map