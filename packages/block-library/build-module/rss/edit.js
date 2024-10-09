/**
 * WordPress dependencies
 */
import { BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, Disabled, PanelBody, Placeholder, RangeControl, ToggleControl, ToolbarGroup, __experimentalInputControl as InputControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { grid, list, edit, rss } from '@wordpress/icons';
import { __, _x } from '@wordpress/i18n';
import { prependHTTP } from '@wordpress/url';
import ServerSideRender from '@wordpress/server-side-render';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 20;
export default function RSSEdit({
  attributes,
  setAttributes
}) {
  const [isEditing, setIsEditing] = useState(!attributes.feedURL);
  const {
    blockLayout,
    columns,
    displayAuthor,
    displayDate,
    displayExcerpt,
    excerptLength,
    feedURL,
    itemsToShow
  } = attributes;
  function toggleAttribute(propName) {
    return () => {
      const value = attributes[propName];
      setAttributes({
        [propName]: !value
      });
    };
  }
  function onSubmitURL(event) {
    event.preventDefault();
    if (feedURL) {
      setAttributes({
        feedURL: prependHTTP(feedURL)
      });
      setIsEditing(false);
    }
  }
  const blockProps = useBlockProps();
  const label = __('RSS URL');
  if (isEditing) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Placeholder, {
        icon: rss,
        label: label,
        instructions: __('Display entries from any RSS or Atom feed.'),
        children: /*#__PURE__*/_jsxs("form", {
          onSubmit: onSubmitURL,
          className: "wp-block-rss__placeholder-form",
          children: [/*#__PURE__*/_jsx(InputControl, {
            __next40pxDefaultSize: true,
            label: label,
            hideLabelFromVision: true,
            placeholder: __('Enter URL here…'),
            value: feedURL,
            onChange: value => setAttributes({
              feedURL: value
            }),
            className: "wp-block-rss__placeholder-input"
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "primary",
            type: "submit",
            children: __('Apply')
          })]
        })
      })
    });
  }
  const toolbarControls = [{
    icon: edit,
    title: __('Edit RSS URL'),
    onClick: () => setIsEditing(true)
  }, {
    icon: list,
    title: _x('List view', 'RSS block display setting'),
    onClick: () => setAttributes({
      blockLayout: 'list'
    }),
    isActive: blockLayout === 'list'
  }, {
    icon: grid,
    title: _x('Grid view', 'RSS block display setting'),
    onClick: () => setAttributes({
      blockLayout: 'grid'
    }),
    isActive: blockLayout === 'grid'
  }];
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        controls: toolbarControls
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Number of items'),
          value: itemsToShow,
          onChange: value => setAttributes({
            itemsToShow: value
          }),
          min: DEFAULT_MIN_ITEMS,
          max: DEFAULT_MAX_ITEMS,
          required: true
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display author'),
          checked: displayAuthor,
          onChange: toggleAttribute('displayAuthor')
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display date'),
          checked: displayDate,
          onChange: toggleAttribute('displayDate')
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display excerpt'),
          checked: displayExcerpt,
          onChange: toggleAttribute('displayExcerpt')
        }), displayExcerpt && /*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Max number of words in excerpt'),
          value: excerptLength,
          onChange: value => setAttributes({
            excerptLength: value
          }),
          min: 10,
          max: 100,
          required: true
        }), blockLayout === 'grid' && /*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Columns'),
          value: columns,
          onChange: value => setAttributes({
            columns: value
          }),
          min: 2,
          max: 6,
          required: true
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Disabled, {
        children: /*#__PURE__*/_jsx(ServerSideRender, {
          block: "core/rss",
          attributes: attributes
        })
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map