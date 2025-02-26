/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { MIN_PREVIEW_HEIGHT, MAX_PREVIEW_HEIGHT } from './edit';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function FileBlockInspector({
  hrefs,
  openInNewWindow,
  showDownloadButton,
  changeLinkDestinationOption,
  changeOpenInNewWindow,
  changeShowDownloadButton,
  displayPreview,
  changeDisplayPreview,
  previewHeight,
  changePreviewHeight
}) {
  const {
    href,
    textLinkHref,
    attachmentPage
  } = hrefs;
  let linkDestinationOptions = [{
    value: href,
    label: __('URL')
  }];
  if (attachmentPage) {
    linkDestinationOptions = [{
      value: href,
      label: __('Media file')
    }, {
      value: attachmentPage,
      label: __('Attachment page')
    }];
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(InspectorControls, {
      children: [href.endsWith('.pdf') && /*#__PURE__*/_jsxs(PanelBody, {
        title: __('PDF settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show inline embed'),
          help: displayPreview ? __("Note: Most phone and tablet browsers won't display embedded PDFs.") : null,
          checked: !!displayPreview,
          onChange: changeDisplayPreview
        }), displayPreview && /*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Height in pixels'),
          min: MIN_PREVIEW_HEIGHT,
          max: Math.max(MAX_PREVIEW_HEIGHT, previewHeight),
          value: previewHeight,
          onChange: changePreviewHeight
        })]
      }), /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(SelectControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: __('Link to'),
          value: textLinkHref,
          options: linkDestinationOptions,
          onChange: changeLinkDestinationOption
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Open in new tab'),
          checked: openInNewWindow,
          onChange: changeOpenInNewWindow
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show download button'),
          checked: showDownloadButton,
          onChange: changeShowDownloadButton
        })]
      })]
    })
  });
}
//# sourceMappingURL=inspector.js.map