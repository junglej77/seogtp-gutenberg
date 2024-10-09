/**
 * WordPress dependencies
 */
import { Path, SVG, Popover, Button, ExternalLink, __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalNumberControl as NumberControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { insertObject, useAnchor } from '@wordpress/rich-text';
import { MediaUpload, RichTextToolbarButton, MediaUploadCheck } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['image'];
const name = 'core/image';
const title = __('Inline image');
export const image = {
  name,
  title,
  keywords: [__('photo'), __('media')],
  object: true,
  tagName: 'img',
  className: null,
  attributes: {
    className: 'class',
    style: 'style',
    url: 'src',
    alt: 'alt'
  },
  edit: Edit
};
function InlineUI({
  value,
  onChange,
  activeObjectAttributes,
  contentRef
}) {
  const {
    style,
    alt
  } = activeObjectAttributes;
  const width = style?.replace(/\D/g, '');
  const [editedWidth, setEditedWidth] = useState(width);
  const [editedAlt, setEditedAlt] = useState(alt);
  const hasChanged = editedWidth !== width || editedAlt !== alt;
  const popoverAnchor = useAnchor({
    editableContentElement: contentRef.current,
    settings: image
  });
  return /*#__PURE__*/_jsx(Popover, {
    placement: "bottom",
    focusOnMount: false,
    anchor: popoverAnchor,
    className: "block-editor-format-toolbar__image-popover",
    children: /*#__PURE__*/_jsx("form", {
      className: "block-editor-format-toolbar__image-container-content",
      onSubmit: event => {
        const newReplacements = value.replacements.slice();
        newReplacements[value.start] = {
          type: name,
          attributes: {
            ...activeObjectAttributes,
            style: width ? `width: ${editedWidth}px;` : '',
            alt: editedAlt
          }
        };
        onChange({
          ...value,
          replacements: newReplacements
        });
        event.preventDefault();
      },
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 4,
        children: [/*#__PURE__*/_jsx(NumberControl, {
          __next40pxDefaultSize: true,
          label: __('Width'),
          value: editedWidth,
          min: 1,
          onChange: newWidth => {
            setEditedWidth(newWidth);
          }
        }), /*#__PURE__*/_jsx(TextareaControl, {
          label: __('Alternative text'),
          __nextHasNoMarginBottom: true,
          value: editedAlt,
          onChange: newAlt => {
            setEditedAlt(newAlt);
          },
          help: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(ExternalLink, {
              href:
              // translators: Localized tutorial, if one exists. W3C Web Accessibility Initiative link has list of existing translations.
              __('https://www.w3.org/WAI/tutorials/images/decision-tree/'),
              children: __('Describe the purpose of the image.')
            }), /*#__PURE__*/_jsx("br", {}), __('Leave empty if decorative.')]
          })
        }), /*#__PURE__*/_jsx(HStack, {
          justify: "right",
          children: /*#__PURE__*/_jsx(Button, {
            disabled: !hasChanged,
            accessibleWhenDisabled: true,
            variant: "primary",
            type: "submit",
            size: "compact",
            children: __('Apply')
          })
        })]
      })
    })
  });
}
function Edit({
  value,
  onChange,
  onFocus,
  isObjectActive,
  activeObjectAttributes,
  contentRef
}) {
  return /*#__PURE__*/_jsxs(MediaUploadCheck, {
    children: [/*#__PURE__*/_jsx(MediaUpload, {
      allowedTypes: ALLOWED_MEDIA_TYPES,
      onSelect: ({
        id,
        url,
        alt,
        width: imgWidth
      }) => {
        onChange(insertObject(value, {
          type: name,
          attributes: {
            className: `wp-image-${id}`,
            style: `width: ${Math.min(imgWidth, 150)}px;`,
            url,
            alt
          }
        }));
        onFocus();
      },
      render: ({
        open
      }) => /*#__PURE__*/_jsx(RichTextToolbarButton, {
        icon: /*#__PURE__*/_jsx(SVG, {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          children: /*#__PURE__*/_jsx(Path, {
            d: "M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z"
          })
        }),
        title: title,
        onClick: open,
        isActive: isObjectActive
      })
    }), isObjectActive && /*#__PURE__*/_jsx(InlineUI, {
      value: value,
      onChange: onChange,
      activeObjectAttributes: activeObjectAttributes,
      contentRef: contentRef
    })]
  });
}
//# sourceMappingURL=index.js.map