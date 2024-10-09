/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { DELETE, BACKSPACE } from '@wordpress/keycodes';
import { useDispatch } from '@wordpress/data';
import { InspectorControls, URLPopover, URLInput, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Button, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { keyboardReturn } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { getIconBySite, getNameBySite } from './social-list';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const SocialLinkURLPopover = ({
  url,
  setAttributes,
  setPopover,
  popoverAnchor,
  clientId
}) => {
  const {
    removeBlock
  } = useDispatch(blockEditorStore);
  return /*#__PURE__*/_jsx(URLPopover, {
    anchor: popoverAnchor,
    "aria-label": __('Edit social link'),
    onClose: () => {
      setPopover(false);
      popoverAnchor?.focus();
    },
    children: /*#__PURE__*/_jsxs("form", {
      className: "block-editor-url-popover__link-editor",
      onSubmit: event => {
        event.preventDefault();
        setPopover(false);
        popoverAnchor?.focus();
      },
      children: [/*#__PURE__*/_jsx("div", {
        className: "block-editor-url-input",
        children: /*#__PURE__*/_jsx(URLInput, {
          value: url,
          onChange: nextURL => setAttributes({
            url: nextURL
          }),
          placeholder: __('Enter social link'),
          label: __('Enter social link'),
          hideLabelFromVision: true,
          disableSuggestions: true,
          onKeyDown: event => {
            if (!!url || event.defaultPrevented || ![BACKSPACE, DELETE].includes(event.keyCode)) {
              return;
            }
            removeBlock(clientId);
          }
        })
      }), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible.
      , {
        __next40pxDefaultSize: false,
        icon: keyboardReturn,
        label: __('Apply'),
        type: "submit"
      })]
    })
  });
};
const SocialLinkEdit = ({
  attributes,
  context,
  isSelected,
  setAttributes,
  clientId
}) => {
  const {
    url,
    service,
    label = '',
    rel
  } = attributes;
  const {
    showLabels,
    iconColor,
    iconColorValue,
    iconBackgroundColor,
    iconBackgroundColorValue
  } = context;
  const [showURLPopover, setPopover] = useState(false);
  const classes = clsx('wp-social-link', 'wp-social-link-' + service, {
    'wp-social-link__is-incomplete': !url,
    [`has-${iconColor}-color`]: iconColor,
    [`has-${iconBackgroundColor}-background-color`]: iconBackgroundColor
  });

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const IconComponent = getIconBySite(service);
  const socialLinkName = getNameBySite(service);
  // The initial label (ie. the link text) is an empty string.
  // We want to prevent empty links so that the link text always fallbacks to
  // the social name, even when users enter and save an empty string or only
  // spaces. The PHP render callback fallbacks to the social name as well.
  const socialLinkText = label.trim() === '' ? socialLinkName : label;
  const blockProps = useBlockProps({
    className: classes,
    style: {
      color: iconColorValue,
      backgroundColor: iconBackgroundColorValue
    }
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/_jsx(PanelRow, {
          children: /*#__PURE__*/_jsx(TextControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            label: __('Text'),
            help: __('The text is visible when enabled from the parent Social Icons block.'),
            value: label,
            onChange: value => setAttributes({
              label: value
            }),
            placeholder: socialLinkName
          })
        })
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      group: "advanced",
      children: /*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Link rel'),
        value: rel || '',
        onChange: value => setAttributes({
          rel: value
        })
      })
    }), /*#__PURE__*/_jsxs("li", {
      ...blockProps,
      children: [/*#__PURE__*/_jsxs("button", {
        className: "wp-block-social-link-anchor",
        ref: setPopoverAnchor,
        onClick: () => setPopover(true),
        "aria-haspopup": "dialog",
        children: [/*#__PURE__*/_jsx(IconComponent, {}), /*#__PURE__*/_jsx("span", {
          className: clsx('wp-block-social-link-label', {
            'screen-reader-text': !showLabels
          }),
          children: socialLinkText
        })]
      }), isSelected && showURLPopover && /*#__PURE__*/_jsx(SocialLinkURLPopover, {
        url: url,
        setAttributes: setAttributes,
        setPopover: setPopover,
        popoverAnchor: popoverAnchor,
        clientId: clientId
      })]
    })]
  });
};
export default SocialLinkEdit;
//# sourceMappingURL=edit.js.map