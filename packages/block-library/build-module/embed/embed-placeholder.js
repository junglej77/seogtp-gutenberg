/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Button, Placeholder, ExternalLink, __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalInputControl as InputControl } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EmbedPlaceholder = ({
  icon,
  label,
  value,
  onSubmit,
  onChange,
  cannotEmbed,
  fallback,
  tryAgain
}) => {
  return /*#__PURE__*/_jsxs(Placeholder, {
    icon: /*#__PURE__*/_jsx(BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: label,
    className: "wp-block-embed",
    instructions: __('Paste a link to the content you want to display on your site.'),
    children: [/*#__PURE__*/_jsxs("form", {
      onSubmit: onSubmit,
      children: [/*#__PURE__*/_jsx(InputControl, {
        __next40pxDefaultSize: true,
        type: "url",
        value: value || '',
        className: "wp-block-embed__placeholder-input",
        label: label,
        hideLabelFromVision: true,
        placeholder: __('Enter URL to embed here…'),
        onChange: onChange
      }), /*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        variant: "primary",
        type: "submit",
        children: _x('Embed', 'button label')
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "wp-block-embed__learn-more",
      children: /*#__PURE__*/_jsx(ExternalLink, {
        href: __('https://wordpress.org/documentation/article/embeds/'),
        children: __('Learn more about embeds')
      })
    }), cannotEmbed && /*#__PURE__*/_jsxs(VStack, {
      spacing: 3,
      className: "components-placeholder__error",
      children: [/*#__PURE__*/_jsx("div", {
        className: "components-placeholder__instructions",
        children: __('Sorry, this content could not be embedded.')
      }), /*#__PURE__*/_jsxs(HStack, {
        expanded: false,
        spacing: 3,
        justify: "flex-start",
        children: [/*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "secondary",
          onClick: tryAgain,
          children: _x('Try again', 'button label')
        }), ' ', /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "secondary",
          onClick: fallback,
          children: _x('Convert to link', 'button label')
        })]
      })]
    })]
  });
};
export default EmbedPlaceholder;
//# sourceMappingURL=embed-placeholder.js.map