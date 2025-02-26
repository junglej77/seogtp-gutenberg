/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, ExternalLink, __experimentalTruncate as Truncate } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { filterURLForDisplay, safeDecodeURI } from '@wordpress/url';
import { Icon, globe, info, linkOff, edit, copySmall } from '@wordpress/icons';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { ViewerSlot } from './viewer-slot';
import useRichUrlData from './use-rich-url-data';

/**
 * Filters the title for display. Removes the protocol and www prefix.
 *
 * @param {string} title The title to be filtered.
 *
 * @return {string} The filtered title.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function filterTitleForDisplay(title) {
  // Derived from `filterURLForDisplay` in `@wordpress/url`.
  return title.replace(/^[a-z\-.\+]+[0-9]*:(\/\/)?/i, '').replace(/^www\./i, '');
}
export default function LinkPreview({
  value,
  onEditClick,
  hasRichPreviews = false,
  hasUnlinkControl = false,
  onRemove
}) {
  const showIconLabels = useSelect(select => select(preferencesStore).get('core', 'showIconLabels'), []);

  // Avoid fetching if rich previews are not desired.
  const showRichPreviews = hasRichPreviews ? value?.url : null;
  const {
    richData,
    isFetching
  } = useRichUrlData(showRichPreviews);

  // Rich data may be an empty object so test for that.
  const hasRichData = richData && Object.keys(richData).length;
  const displayURL = value && filterURLForDisplay(safeDecodeURI(value.url), 24) || '';

  // url can be undefined if the href attribute is unset
  const isEmptyURL = !value?.url?.length;
  const displayTitle = !isEmptyURL && stripHTML(richData?.title || value?.title || displayURL);
  const isUrlRedundant = !value?.url || filterTitleForDisplay(displayTitle) === displayURL;
  let icon;
  if (richData?.icon) {
    icon = /*#__PURE__*/_jsx("img", {
      src: richData?.icon,
      alt: ""
    });
  } else if (isEmptyURL) {
    icon = /*#__PURE__*/_jsx(Icon, {
      icon: info,
      size: 32
    });
  } else {
    icon = /*#__PURE__*/_jsx(Icon, {
      icon: globe
    });
  }
  const {
    createNotice
  } = useDispatch(noticesStore);
  const ref = useCopyToClipboard(value.url, () => {
    createNotice('info', __('Link copied to clipboard.'), {
      isDismissible: true,
      type: 'snackbar'
    });
  });
  return /*#__PURE__*/_jsx("div", {
    "aria-label": __('Currently selected'),
    className: clsx('block-editor-link-control__search-item', {
      'is-current': true,
      'is-rich': hasRichData,
      'is-fetching': !!isFetching,
      'is-preview': true,
      'is-error': isEmptyURL,
      'is-url-title': displayTitle === displayURL
    }),
    children: /*#__PURE__*/_jsxs("div", {
      className: "block-editor-link-control__search-item-top",
      children: [/*#__PURE__*/_jsxs("span", {
        className: "block-editor-link-control__search-item-header",
        children: [/*#__PURE__*/_jsx("span", {
          className: clsx('block-editor-link-control__search-item-icon', {
            'is-image': richData?.icon
          }),
          children: icon
        }), /*#__PURE__*/_jsx("span", {
          className: "block-editor-link-control__search-item-details",
          children: !isEmptyURL ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(ExternalLink, {
              className: "block-editor-link-control__search-item-title",
              href: value.url,
              children: /*#__PURE__*/_jsx(Truncate, {
                numberOfLines: 1,
                children: displayTitle
              })
            }), !isUrlRedundant && /*#__PURE__*/_jsx("span", {
              className: "block-editor-link-control__search-item-info",
              children: /*#__PURE__*/_jsx(Truncate, {
                numberOfLines: 1,
                children: displayURL
              })
            })]
          }) : /*#__PURE__*/_jsx("span", {
            className: "block-editor-link-control__search-item-error-notice",
            children: __('Link is empty')
          })
        })]
      }), /*#__PURE__*/_jsx(Button, {
        icon: edit,
        label: __('Edit link'),
        onClick: onEditClick,
        size: "compact"
      }), hasUnlinkControl && /*#__PURE__*/_jsx(Button, {
        icon: linkOff,
        label: __('Remove link'),
        onClick: onRemove,
        size: "compact"
      }), /*#__PURE__*/_jsx(Button, {
        icon: copySmall,
        label: sprintf(
        // Translators: %s is a placeholder for the link URL and an optional colon, (if a Link URL is present).
        __('Copy link%s'),
        // Ends up looking like "Copy link: https://example.com".
        isEmptyURL || showIconLabels ? '' : ': ' + value.url),
        ref: ref,
        accessibleWhenDisabled: true,
        disabled: isEmptyURL,
        size: "compact"
      }), /*#__PURE__*/_jsx(ViewerSlot, {
        fillProps: value
      })]
    })
  });
}
//# sourceMappingURL=link-preview.js.map