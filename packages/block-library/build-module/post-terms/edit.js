/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentToolbar, InspectorControls, BlockControls, useBlockProps, useBlockDisplayInformation, RichText } from '@wordpress/block-editor';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { Spinner, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import usePostTerms from './use-post-terms';

// Allowed formats for the prefix and suffix fields.
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_FORMATS = ['core/bold', 'core/image', 'core/italic', 'core/link', 'core/strikethrough', 'core/text-color'];
export default function PostTermsEdit({
  attributes,
  clientId,
  context,
  isSelected,
  setAttributes,
  insertBlocksAfter
}) {
  const {
    term,
    textAlign,
    separator,
    prefix,
    suffix
  } = attributes;
  const {
    postId,
    postType
  } = context;
  const selectedTerm = useSelect(select => {
    if (!term) {
      return {};
    }
    const {
      getTaxonomy
    } = select(coreStore);
    const taxonomy = getTaxonomy(term);
    return taxonomy?.visibility?.publicly_queryable ? taxonomy : {};
  }, [term]);
  const {
    postTerms,
    hasPostTerms,
    isLoading
  } = usePostTerms({
    postId,
    term: selectedTerm
  });
  const hasPost = postId && postType;
  const blockInformation = useBlockDisplayInformation(clientId);
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign,
      [`taxonomy-${term}`]: term
    })
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(AlignmentToolbar, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      group: "advanced",
      children: /*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        autoComplete: "off",
        label: __('Separator'),
        value: separator || '',
        onChange: nextValue => {
          setAttributes({
            separator: nextValue
          });
        },
        help: __('Enter character(s) used to separate terms.')
      })
    }), /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [isLoading && hasPost && /*#__PURE__*/_jsx(Spinner, {}), !isLoading && (isSelected || prefix) && /*#__PURE__*/_jsx(RichText, {
        identifier: "prefix",
        allowedFormats: ALLOWED_FORMATS,
        className: "wp-block-post-terms__prefix",
        "aria-label": __('Prefix'),
        placeholder: __('Prefix') + ' ',
        value: prefix,
        onChange: value => setAttributes({
          prefix: value
        }),
        tagName: "span"
      }), (!hasPost || !term) && /*#__PURE__*/_jsx("span", {
        children: blockInformation.title
      }), hasPost && !isLoading && hasPostTerms && postTerms.map(postTerm => /*#__PURE__*/_jsx("a", {
        href: postTerm.link,
        onClick: event => event.preventDefault(),
        children: decodeEntities(postTerm.name)
      }, postTerm.id)).reduce((prev, curr) => /*#__PURE__*/_jsxs(_Fragment, {
        children: [prev, /*#__PURE__*/_jsx("span", {
          className: "wp-block-post-terms__separator",
          children: separator || ' '
        }), curr]
      })), hasPost && !isLoading && !hasPostTerms && (selectedTerm?.labels?.no_terms || __('Term items not found.')), !isLoading && (isSelected || suffix) && /*#__PURE__*/_jsx(RichText, {
        identifier: "suffix",
        allowedFormats: ALLOWED_FORMATS,
        className: "wp-block-post-terms__suffix",
        "aria-label": __('Suffix'),
        placeholder: ' ' + __('Suffix'),
        value: suffix,
        onChange: value => setAttributes({
          suffix: value
        }),
        tagName: "span",
        __unstableOnSplitAtEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName()))
      })]
    })]
  });
}
//# sourceMappingURL=edit.js.map