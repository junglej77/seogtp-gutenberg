/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { RichText, AlignmentControl, InspectorControls, BlockControls, useBlockProps, HeadingLevelDropdown } from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { decodeEntities } from '@wordpress/html-entities';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function SiteTitleEdit({
  attributes,
  setAttributes,
  insertBlocksAfter
}) {
  const {
    level,
    levelOptions,
    textAlign,
    isLink,
    linkTarget
  } = attributes;
  const {
    canUserEdit,
    title
  } = useSelect(select => {
    const {
      canUser,
      getEntityRecord,
      getEditedEntityRecord
    } = select(coreStore);
    const canEdit = canUser('update', {
      kind: 'root',
      name: 'site'
    });
    const settings = canEdit ? getEditedEntityRecord('root', 'site') : {};
    const readOnlySettings = getEntityRecord('root', '__unstableBase');
    return {
      canUserEdit: canEdit,
      title: canEdit ? settings?.title : readOnlySettings?.name
    };
  }, []);
  const {
    editEntityRecord
  } = useDispatch(coreStore);
  function setTitle(newTitle) {
    editEntityRecord('root', 'site', undefined, {
      title: newTitle
    });
  }
  const TagName = level === 0 ? 'p' : `h${level}`;
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign,
      'wp-block-site-title__placeholder': !canUserEdit && !title
    })
  });
  const siteTitleContent = canUserEdit ? /*#__PURE__*/_jsx(TagName, {
    ...blockProps,
    children: /*#__PURE__*/_jsx(RichText, {
      tagName: isLink ? 'a' : 'span',
      href: isLink ? '#site-title-pseudo-link' : undefined,
      "aria-label": __('Site title text'),
      placeholder: __('Write site title…'),
      value: title,
      onChange: setTitle,
      allowedFormats: [],
      disableLineBreaks: true,
      __unstableOnSplitAtEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName()))
    })
  }) : /*#__PURE__*/_jsx(TagName, {
    ...blockProps,
    children: isLink ? /*#__PURE__*/_jsx("a", {
      href: "#site-title-pseudo-link",
      onClick: event => event.preventDefault(),
      children: decodeEntities(title) || __('Site Title placeholder')
    }) : /*#__PURE__*/_jsx("span", {
      children: decodeEntities(title) || __('Site Title placeholder')
    })
  });
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
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Make title link to home'),
          onChange: () => setAttributes({
            isLink: !isLink
          }),
          checked: isLink
        }), isLink && /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Open in new tab'),
          onChange: value => setAttributes({
            linkTarget: value ? '_blank' : '_self'
          }),
          checked: linkTarget === '_blank'
        })]
      })
    }), siteTitleContent]
  });
}
//# sourceMappingURL=edit.js.map