/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { dateI18n, humanTimeDiff, getSettings as getDateSettings } from '@wordpress/date';
import { InspectorControls, useBlockProps, __experimentalDateFormatPicker as DateFormatPicker } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

/**
 * Renders the `core/comment-date` block on the editor.
 *
 * @param {Object} props                   React props.
 * @param {Object} props.setAttributes     Callback for updating block attributes.
 * @param {Object} props.attributes        Block attributes.
 * @param {string} props.attributes.format Format of the date.
 * @param {string} props.attributes.isLink Whether the author name should be linked.
 * @param {Object} props.context           Inherited context.
 * @param {string} props.context.commentId The comment ID.
 *
 * @return {JSX.Element} React element.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function Edit({
  attributes: {
    format,
    isLink
  },
  context: {
    commentId
  },
  setAttributes
}) {
  const blockProps = useBlockProps();
  let [date] = useEntityProp('root', 'comment', 'date', commentId);
  const [siteFormat = getDateSettings().formats.date] = useEntityProp('root', 'site', 'date_format');
  const inspectorControls = /*#__PURE__*/_jsx(InspectorControls, {
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
        label: __('Link to comment'),
        onChange: () => setAttributes({
          isLink: !isLink
        }),
        checked: isLink
      })]
    })
  });
  if (!commentId || !date) {
    date = _x('Comment Date', 'block title');
  }
  let commentDate = date instanceof Date ? /*#__PURE__*/_jsx("time", {
    dateTime: dateI18n('c', date),
    children: format === 'human-diff' ? humanTimeDiff(date) : dateI18n(format || siteFormat, date)
  }) : /*#__PURE__*/_jsx("time", {
    children: date
  });
  if (isLink) {
    commentDate = /*#__PURE__*/_jsx("a", {
      href: "#comment-date-pseudo-link",
      onClick: event => event.preventDefault(),
      children: commentDate
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [inspectorControls, /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: commentDate
    })]
  });
}
//# sourceMappingURL=edit.js.map