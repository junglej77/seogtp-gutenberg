/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useMemo, useState } from '@wordpress/element';
import { dateI18n, humanTimeDiff, getSettings as getDateSettings } from '@wordpress/date';
import { AlignmentControl, BlockControls, InspectorControls, useBlockProps, __experimentalDateFormatPicker as DateFormatPicker, __experimentalPublishDateTimePicker as PublishDateTimePicker } from '@wordpress/block-editor';
import { Dropdown, ToolbarGroup, ToolbarButton, ToggleControl, PanelBody } from '@wordpress/components';
import { __, _x, sprintf } from '@wordpress/i18n';
import { edit } from '@wordpress/icons';
import { DOWN } from '@wordpress/keycodes';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function PostDateEdit({
  attributes: {
    textAlign,
    format,
    isLink,
    displayType
  },
  context: {
    postId,
    postType: postTypeSlug,
    queryId
  },
  setAttributes
}) {
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign,
      [`wp-block-post-date__modified-date`]: displayType === 'modified'
    })
  });

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = useMemo(() => ({
    anchor: popoverAnchor
  }), [popoverAnchor]);
  const isDescendentOfQueryLoop = Number.isFinite(queryId);
  const dateSettings = getDateSettings();
  const [siteFormat = dateSettings.formats.date] = useEntityProp('root', 'site', 'date_format');
  const [siteTimeFormat = dateSettings.formats.time] = useEntityProp('root', 'site', 'time_format');
  const [date, setDate] = useEntityProp('postType', postTypeSlug, displayType, postId);
  const postType = useSelect(select => postTypeSlug ? select(coreStore).getPostType(postTypeSlug) : null, [postTypeSlug]);
  const dateLabel = displayType === 'date' ? __('Post Date') : __('Post Modified Date');
  let postDate = date ? /*#__PURE__*/_jsx("time", {
    dateTime: dateI18n('c', date),
    ref: setPopoverAnchor,
    children: format === 'human-diff' ? humanTimeDiff(date) : dateI18n(format || siteFormat, date)
  }) : dateLabel;
  if (isLink && date) {
    postDate = /*#__PURE__*/_jsx("a", {
      href: "#post-date-pseudo-link",
      onClick: event => event.preventDefault(),
      children: postDate
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      children: [/*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      }), date && displayType === 'date' && !isDescendentOfQueryLoop && /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(Dropdown, {
          popoverProps: popoverProps,
          renderContent: ({
            onClose
          }) => /*#__PURE__*/_jsx(PublishDateTimePicker, {
            currentDate: date,
            onChange: setDate,
            is12Hour: is12HourFormat(siteTimeFormat),
            onClose: onClose,
            dateOrder: /* translators: Order of day, month, and year. Available formats are 'dmy', 'mdy', and 'ymd'. */
            _x('dmy', 'date order')
          }),
          renderToggle: ({
            isOpen,
            onToggle
          }) => {
            const openOnArrowDown = event => {
              if (!isOpen && event.keyCode === DOWN) {
                event.preventDefault();
                onToggle();
              }
            };
            return /*#__PURE__*/_jsx(ToolbarButton, {
              "aria-expanded": isOpen,
              icon: edit,
              title: __('Change Date'),
              onClick: onToggle,
              onKeyDown: openOnArrowDown
            });
          }
        })
      })]
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(DateFormatPicker, {
          format: format,
          defaultFormat: siteFormat,
          onChange: nextFormat => setAttributes({
            format: nextFormat
          })
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: postType?.labels.singular_name ? sprintf(
          // translators: %s: Name of the post type e.g: "post".
          __('Link to %s'), postType.labels.singular_name.toLowerCase()) : __('Link to post'),
          onChange: () => setAttributes({
            isLink: !isLink
          }),
          checked: isLink
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display last modified date'),
          onChange: value => setAttributes({
            displayType: value ? 'modified' : 'date'
          }),
          checked: displayType === 'modified',
          help: __('Only shows if the post has been modified')
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: postDate
    })]
  });
}
export function is12HourFormat(format) {
  // To know if the time format is a 12 hour time, look for any of the 12 hour
  // format characters: 'a', 'A', 'g', and 'h'. The character must be
  // unescaped, i.e. not preceded by a '\'. Coincidentally, 'aAgh' is how I
  // feel when working with regular expressions.
  // https://www.php.net/manual/en/datetime.format.php
  return /(?:^|[^\\])[aAgh]/.test(format);
}
//# sourceMappingURL=edit.js.map