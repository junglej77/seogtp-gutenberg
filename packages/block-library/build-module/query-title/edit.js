/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, InspectorControls, useBlockProps, Warning, HeadingLevelDropdown } from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useArchiveLabel } from './use-archive-label';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SUPPORTED_TYPES = ['archive', 'search'];
export default function QueryTitleEdit({
  attributes: {
    type,
    level,
    levelOptions,
    textAlign,
    showPrefix,
    showSearchTerm
  },
  setAttributes
}) {
  const {
    archiveTypeLabel,
    archiveNameLabel
  } = useArchiveLabel();
  const TagName = `h${level}`;
  const blockProps = useBlockProps({
    className: clsx('wp-block-query-title__placeholder', {
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  if (!SUPPORTED_TYPES.includes(type)) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Warning, {
        children: __('Provided type is not supported.')
      })
    });
  }
  let titleElement;
  if (type === 'archive') {
    let title;
    if (archiveTypeLabel) {
      if (showPrefix) {
        if (archiveNameLabel) {
          title = sprintf( /* translators: 1: Archive type title e.g: "Category", 2: Label of the archive e.g: "Shoes" */
          __('%1$s: %2$s'), archiveTypeLabel, archiveNameLabel);
        } else {
          title = sprintf( /* translators: %s: Archive type title e.g: "Category", "Tag"... */
          __('%s: Name'), archiveTypeLabel);
        }
      } else if (archiveNameLabel) {
        title = archiveNameLabel;
      } else {
        title = sprintf( /* translators: %s: Archive type title e.g: "Category", "Tag"... */
        __('%s name'), archiveTypeLabel);
      }
    } else {
      title = showPrefix ? __('Archive type: Name') : __('Archive title');
    }
    titleElement = /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(InspectorControls, {
        children: /*#__PURE__*/_jsx(PanelBody, {
          title: __('Settings'),
          children: /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Show archive type in title'),
            onChange: () => setAttributes({
              showPrefix: !showPrefix
            }),
            checked: showPrefix
          })
        })
      }), /*#__PURE__*/_jsx(TagName, {
        ...blockProps,
        children: title
      })]
    });
  }
  if (type === 'search') {
    titleElement = /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(InspectorControls, {
        children: /*#__PURE__*/_jsx(PanelBody, {
          title: __('Settings'),
          children: /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Show search term in title'),
            onChange: () => setAttributes({
              showSearchTerm: !showSearchTerm
            }),
            checked: showSearchTerm
          })
        })
      }), /*#__PURE__*/_jsx(TagName, {
        ...blockProps,
        children: showSearchTerm ? __('Search results for: “search term”') : __('Search results')
      })]
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      children: [/*#__PURE__*/_jsx(HeadingLevelDropdown, {
        value: level,
        options: levelOptions,
        onChange: newLevel => setAttributes({
          level: newLevel
        })
      }), /*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })]
    }), titleElement]
  });
}
//# sourceMappingURL=edit.js.map