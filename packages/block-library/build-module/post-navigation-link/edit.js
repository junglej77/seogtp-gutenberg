/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption, ToggleControl, SelectControl, PanelBody } from '@wordpress/components';
import { InspectorControls, RichText, BlockControls, AlignmentToolbar, useBlockProps } from '@wordpress/block-editor';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function PostNavigationLinkEdit({
  context: {
    postType
  },
  attributes: {
    type,
    label,
    showTitle,
    textAlign,
    linkLabel,
    arrow,
    taxonomy
  },
  setAttributes
}) {
  const isNext = type === 'next';
  let placeholder = isNext ? __('Next') : __('Previous');
  const arrowMap = {
    none: '',
    arrow: isNext ? '→' : '←',
    chevron: isNext ? '»' : '«'
  };
  const displayArrow = arrowMap[arrow];
  if (showTitle) {
    placeholder = isNext ? /* translators: Label before for next and previous post. There is a space after the colon. */
    __('Next: ') // eslint-disable-line @wordpress/i18n-no-flanking-whitespace
    : /* translators: Label before for next and previous post. There is a space after the colon. */
    __('Previous: '); // eslint-disable-line @wordpress/i18n-no-flanking-whitespace
  }
  const ariaLabel = isNext ? __('Next post') : __('Previous post');
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const taxonomies = useSelect(select => {
    const {
      getTaxonomies
    } = select(coreStore);
    const filteredTaxonomies = getTaxonomies({
      type: postType,
      per_page: -1
    });
    return filteredTaxonomies;
  }, [postType]);
  const getTaxonomyOptions = () => {
    const selectOption = {
      label: __('Unfiltered'),
      value: ''
    };
    const taxonomyOptions = (taxonomies !== null && taxonomies !== void 0 ? taxonomies : []).filter(({
      visibility
    }) => !!visibility?.publicly_queryable).map(item => {
      return {
        value: item.slug,
        label: item.name
      };
    });
    return [selectOption, ...taxonomyOptions];
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display the title as a link'),
          help: __('If you have entered a custom label, it will be prepended before the title.'),
          checked: !!showTitle,
          onChange: () => setAttributes({
            showTitle: !showTitle
          })
        }), showTitle && /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Include the label as part of the link'),
          checked: !!linkLabel,
          onChange: () => setAttributes({
            linkLabel: !linkLabel
          })
        }), /*#__PURE__*/_jsxs(ToggleGroupControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: __('Arrow'),
          value: arrow,
          onChange: value => {
            setAttributes({
              arrow: value
            });
          },
          help: __('A decorative arrow for the next and previous link.'),
          isBlock: true,
          children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
            value: "none",
            label: _x('None', 'Arrow option for Next/Previous link')
          }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
            value: "arrow",
            label: _x('Arrow', 'Arrow option for Next/Previous link')
          }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
            value: "chevron",
            label: _x('Chevron', 'Arrow option for Next/Previous link')
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      group: "advanced",
      children: /*#__PURE__*/_jsx(SelectControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Filter by taxonomy'),
        value: taxonomy,
        options: getTaxonomyOptions(),
        onChange: value => setAttributes({
          taxonomy: value
        }),
        help: __('Only link to posts that have the same taxonomy terms as the current post. For example the same tags or categories.')
      })
    }), /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(AlignmentToolbar, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [!isNext && displayArrow && /*#__PURE__*/_jsx("span", {
        className: `wp-block-post-navigation-link__arrow-previous is-arrow-${arrow}`,
        children: displayArrow
      }), /*#__PURE__*/_jsx(RichText, {
        tagName: "a",
        identifier: "label",
        "aria-label": ariaLabel,
        placeholder: placeholder,
        value: label,
        allowedFormats: ['core/bold', 'core/italic'],
        onChange: newLabel => setAttributes({
          label: newLabel
        })
      }), showTitle && /*#__PURE__*/_jsx("a", {
        href: "#post-navigation-pseudo-link",
        onClick: event => event.preventDefault(),
        children: __('An example title')
      }), isNext && displayArrow && /*#__PURE__*/_jsx("span", {
        className: `wp-block-post-navigation-link__arrow-next is-arrow-${arrow}`,
        "aria-hidden": true,
        children: displayArrow
      })]
    })]
  });
}
//# sourceMappingURL=edit.js.map